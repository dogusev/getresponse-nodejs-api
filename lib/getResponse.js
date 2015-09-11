var request = require('request');

var getAsUriParameters = function (data) {
    return Object.keys(data).map(function (k) {
        if (_.isArray(data[k])) {
            var keyE = encodeURIComponent(k + '[]');
            //return keyE + '=' + encodeURIComponent(JSON.stringify(data[k]))
            return data[k].map(function (subData) {
                return keyE + '=' + encodeURIComponent(subData);
            }).join('&');
        } else {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        }
    }).join('&');
};

function GetResponse(apiKey,apiUrl, print_errors) {
    var apiURL = apiUrl || 'https://api2.getresponse.com';
    this.textOperators = ['EQUALS', 'NOT_EQUALS', 'CONTAINS', 'NOT_CONTAINS', 'MATCHES'];
    var $this = this;

    if (!apiKey) {
        throw new Error('API key must be supplied');
        return;
    }

    $this.apiKey = apiKey;
    $this.errorsOn = !!print_errors;


    var send = function (data, cb) {

        console.log('send data', (JSON.stringify(data)));
        var headers = {
            'content-Type':'application/json'
        };
        var options = {
            headers: headers,
            body: JSON.stringify((data || {}))
        };
        request.post(apiURL,options, function (error, response, body) {
                if (!error && (response.statusCode == 200 || response.statusCode == 204)) {
                    cb && cb({success: true, data: JSON.parse(body || '{}')});
                } else {
                    cb && cb({success: false, message: body});
                }
            });





    };


    this.prepRequest = function (method, params, id) {
        var data = [$this.apiKey];
        if (params) {
            data.push(params);
        }
        var request = {
            method: method,
            params: data
        };
        request.id =id || 1;
        return request;
    };

    /*+*/
    this.ping = function (cb) {
        var request = $this.prepRequest('ping');
        send(request, cb);

    };
    /*+*/
    this.getAccountInfo = function (cb) {
        var request = $this.prepRequest('get_account_info');
        send(request, cb);
    };
    /*+*/
    this.getAccountFromFields = function (cb) {
        var request = $this.prepRequest('get_account_from_fields');
        send(request, cb);
    };
    /*+*/
    this.getAccountFromFieldByID = function (id,cb) {
        var request = $this.prepRequest('get_account_from_field', {'account_from_field': id});
        send(request, cb);
    };
    /*+*/
    this.getAccountFromFieldsByEmail = function (email,cb) {
        var request = $this.prepRequest('get_account_from_fields');
        send(request, function (response) {
            if (!response.success) {
                cb && cb(response);
            }
            var resultData = {};
            var success=false;
            for(var acId in response.data.result) {
                var ac = response.data.result[acId];
                if(ac.email==email) {
                    resultData[acId]=ac;
                    success=true;
                }
            }
            response.success = success;
            response.data.result = resultData;
            cb && cb(response);
        });

    };
    /*+*/
    this.getCampaigns = function (operator, comparison,cb) {
        var params = {};
        if (!operator) {
            operator = 'CONTAINS';
        }
        if (!comparison) {
            comparison = '%';
        }

        if ($this.textOperators.indexOf(operator)>=0) {
            params = {name: {}};
            params.name[operator] = comparison;
        }
        var request = $this.prepRequest('get_campaigns', params);
        send(request, cb);
    };
    /*+*/
    this.getCampaignByID = function (id,cb) {
        var request = $this.prepRequest('get_campaign', {'campaign': id});
        send(request, cb);
    };
    /*+*/
    this.getCampaignByName = function (name,cb) {
        var request = $this.prepRequest('get_campaigns', {name: {'EQUALS': name}});
        send(request, cb);
    };

    /*+*/
    this.getMessages = function ($campaigns, $type,cb) {
        var params = null;
        if ($campaigns) {
            !params && (params = {});
            params['campaigns'] = $campaigns;
        }
        if ($type) {
            !params && (params = {});
            params['type'] = $type;
        }
        var request = $this.prepRequest('get_messages', params);
        send(request, cb);
    };
    /*+*/
    this.sendNewsletter = function ($campaign,$from_field,$reply_to_field,$subject,$name,$plain,$html,$flags,
                                    $contacts,$get_contacts,cb) {
        var params = {};
        if(!$campaign || !$subject || (!$plain && !$html) || (!$contacts && !$get_contacts)) {
            throw new Error('Argument missing');
            return;
        }
        params['campaign'] = $campaign;

        if ($from_field) {
            params['from_field'] = $from_field;
        }

        if ($reply_to_field) {
            params['reply_to_field'] = $reply_to_field;
        }

        if ($subject) {
            params['subject'] = $subject;
        }
        if ($name) {
            params['name'] = $name;
        }

        ($plain || $html) && (params['contents']={});
        $html && (params['contents']['html']= $html);
        $plain && (params['contents']['plain'] =$plain);

        if ($flags) {
            params['flags'] = $flags;
        }


        if ($contacts) {
            params['contacts'] = $contacts;
        }
        if ($get_contacts) {
            params['get_contacts']= {};
            params['get_contacts']['email']= $this.prepTextOp('CONTAINS', $get_contacts || '%');
        }

        var request = $this.prepRequest('send_newsletter', params);
        send(request, cb);
    };

    /**
     * Return a message by ID
     * @param string $id Message ID
     * @return object
     */
    /*+*/
    this.getMessageByID = function ($id,cb) {
        var request = $this.prepRequest('get_message', {'message': $id});
        send(request, cb);
    };
    /**
     * Return an autoresponder message from a campaign by Cycle Day
     * @param string $campaign Campaign ID
     * @param string $cycle_day Cycle Day
     * @return object
     */
    /*+*/
    this.getMessageByCycleDay = function ($campaign, $cycle_day,cb) {
        var params = {};
        params['campaigns'] = $campaign;
        params['type'] = "autoresponder";


        var request = $this.prepRequest('get_messages', params);
        send(request, function(response){
            var resultData = {};
            var success=false;
            for(var acId in response.data.result) {
                var ac = response.data.result[acId];
                if(ac.day_of_cycle==$cycle_day) {
                    resultData[acId]=ac;
                    success=true;
                }
            }
            response.success = success;
            response.data.result = resultData;
            cb && cb(response);
        });
    };

    /**
     * Return message contents by ID
     * @param string $id Message ID
     * @return object
     */
    /*+*/
    this.getMessageContents = function ($id,cb) {
        var request = $this.prepRequest('get_message_contents', {'message': $id});
        send(request, cb);
    };
    /**
     * Return message statistics
     * @param string $message Message ID
     * @param string $grouping grouping
     * @return object|null
     */
    /*+*/
    this.getMessageStats = function ($message, $grouping,cb) {
        var params = {};
        params['message'] = $message;
        params['grouping'] = $grouping || "yearly";
        var request = $this.prepRequest('get_message_stats', params);
        send(request, cb);
    };
    /**
     * Return autoresponder message contents by Cycle Day
     * @param string $campaign Campaign ID
     * @param string $cycle_day Cycle Day
     * @return object|null
     */
    /*+*/
    this.getMessageContentsByCycleDay = function ($campaign, $cycle_day,cb) {
        var params = {};
        params['campaigns'] = $campaign;
        params['type'] = "autoresponder";
        var request = $this.prepRequest('get_messages', params);
        send(request, cb);
        //foreach($response as $key => $message) if($message->day_of_cycle==$cycle_day) return $this->getMessageContents($key);
        //return null;
    };

    /**
     * Add autoresponder to a campaign at a specific day of cycle
     * @param string $campaign Campaign ID
     * @param string $subject Subject of message
     * @param array $contents Allowed keys are "plain" and "html", at least one is mandatory
     * @param int $cycle_day
     * @param string $from_field From Field ID obtained through getAccountFromFields()
     * @param array $flags Enables extra functionality for a message: "clicktrack", "subscription_reminder", "openrate", "google_analytics"
     * @return object
     */
    /*+*/
    this.addAutoresponder = function ($campaign, $subject, $cycle_day, $html, $plain, $from_field, $flags,cb) {
        if(!$campaign) {
            throw new Error('Campaign can not be null');
            return;
        }
        if(!$subject) {
            throw new Error('Subject can not be null');
            return;
        }

        var params = {
            'campaign': $campaign,
            'subject': $subject,
            'day_of_cycle': $cycle_day
        };
        params['contents']= {};
        $html && (params['contents']['html']= $html);
        $plain && (params['contents']['plain'] =$plain);
        $from_field && (params['from_field']=$from_field);
        $flags && (params['flags']=$flags);

        var request = $this.prepRequest('add_autoresponder', params);
        send(request, cb);
    };

    /**
     * Delete an autoresponder
     * @param string $id
     * @return object
     */
    /*+*/
    this.deleteAutoresponder = function ($id,cb) {
        var request = $this.prepRequest('delete_autoresponder', {'message': $id});
        send(request, cb);
    };

    /**
     * Return a list of contacts, optionally filtered by multiple conditions
     * @todo Implement all conditions, this is unfinished
     * @param array|null $campaigns Optional argument to narrow results by campaign ID
     * @param string $operator Optional argument to change operator (default is 'CONTAINS')
     *        See https://github.com/GetResponse/DevZone/tree/master/API#operators for additional operator options
     * @param string $comparison
     * @param array $fields (an associative array, the keys of which should enable/disable comparing name or email)
     * @return object
     */
    /*+*/
    this.getContacts = function ($campaigns, $operator, $comparison, $fields,cb) {
        var params = {};

        if(!$campaigns) {
            throw new Error('Campaigns can not be null');
            return;
        }
        params['campaigns'] = $campaigns || null;
        $fields && $fields.name && (params['name'] = $this.prepTextOp($operator || 'CONTAINS', $comparison || '%'));
        $fields && $fields.email && (params['email'] = $this.prepTextOp($operator || 'CONTAINS', $comparison || '%'));
        var request = $this.prepRequest('get_contacts', params);
        send(request, cb);
    };
    /**
     * Return a list of contacts by email address (optionally narrowed by campaign)
     * @param string $email Email Address of Contact (or a string contained in the email address)
     * @param array|null $campaigns Optional argument to narrow results by campaign ID
     * @param string $operator Optional argument to change operator (default is 'CONTAINS')
     *        See https://github.com/GetResponse/DevZone/tree/master/API#operators for additional operator options
     * @return object
     */
    /*+*/
    this.getContactsByEmail = function ($email, $campaigns, $operator,cb) {
        var params = {};
        params['email'] = $this.prepTextOp($operator || 'CONTAINS', $email);
        $campaigns && (params['campaigns'] = $campaigns);
        var request = $this.prepRequest('get_contacts', params);
        send(request, cb);
    };

    /**
     * Return a list of contacts filtered by custom contact information
     * $customs is an associative arrays, the keys of which should correspond to the
     * custom field names of the customers you wish to retrieve.
     * @param array|null $campaigns Optional argument to narrow results by campaign ID
     * @param string $operator
     * @param array $customs
     * @param string $comparison
     * @return object
     */
    /*+*/
    this.getContactsByCustoms = function ($campaigns, $customs, $operator,cb) {
        var params = {};
        $campaigns && (params['campaigns'] = $campaigns);
        if (!$customs) {
            throw new Error('Customs can not be null');
            return;
        }
        params['customs'] = [];
        for (var $key in $customs) {
            var $val = $customs[$key];
            params['customs'].push({
                'name': $key,
                'content': $this.prepTextOp(($operator || 'EQUALS'), $val)
            });
        }

        var request = $this.prepRequest('get_contacts', params);
        send(request, cb);
    };

    /**
     * Return a contact by ID
     * @param string $id User ID
     * @return object
     */
    /*+*/
    this.getContactByID = function ($id,cb) {
        var request = $this.prepRequest('get_contact', {'contact': $id});
        send(request, cb);
    };

    /**
     * Set a contact name
     * @param string $id User ID
     * @return object
     */
    /*+*/
    this.setContactName = function ($id, $name,cb) {
        var request = $this.prepRequest('set_contact_name', {'contact': $id, 'name': $name});
        send(request, cb);
    };

    /**
     * Set a contact cycle
     * @param string $id User ID
     * @param int $cycle_day Cycle Day
     * @return object
     */
    /*+*/
    this.setContactCycle = function ($id, $cycle_day,cb) {
        var request = $this.prepRequest('set_contact_cycle', {'contact': $id, 'cycle_day': $cycle_day});
        send(request, cb);
    };

    /**
     * Set a contact campaign
     * @param string $id User ID
     * @param string $campaign Campaign ID
     * @return object
     */
    /*+*/
    this.setContactCampaign = function ($id, $campaign,cb) {
        var request = $this.prepRequest('move_contact', {'contact': $id, 'campaign': $campaign});
        send(request, cb);
    };

    /**
     * Return a contacts custom information
     * @param string $id User ID
     * @return object
     */
    /*+*/
    this.getContactCustoms = function ($id,cb) {
        var request = $this.prepRequest('get_contact_customs', {'contact': $id});
        send(request, cb);
    };

    /**
     * Set custom contact information
     * $customs is an associative array, the keys of which should correspond to the
     * custom field name you wish to add/modify/remove.
     * Actions: added if not present, updated if present, removed if value is null
     * @todo Implement multivalue customs.
     * @param string $id User ID
     * @param array $customs
     * @return object
     */
    /*+*/
    this.setContactCustoms = function ($id, $customs,cb) {
        if (!$customs) {
            throw new Error('Second argument can not be null');
        }

        var params = [];
        for (var $key in $customs) {
            var $val = $customs[$key];
            params.push({
                'name': $key,
                'content': $val
            });
        }

        var request = $this.prepRequest('set_contact_customs', {'contact': $id, 'customs': params});
        send(request, cb);
    };

    /**
     * Return a contacts GeoIP
     * @param string $id User ID
     * @return object
     */
    /*+*/
    this.getContactGeoIP = function ($id,cb) {
        var request = $this.prepRequest('get_contact_geoip', {'contact': $id});
        send(request, cb);
    };

    /**
     * List dates when the messages were opened by contacts
     * @param string $id User ID
     * @return object
     */
    /*+*/
    this.getContactOpens = function ($id,cb) {
        var request = $this.prepRequest('get_contact_opens', {'contact': $id});
        send(request, cb);
    };

    /**
     * List dates when the links in messages were clicked by contacts
     * @param string $id User ID
     * @return object
     */
    /*+*/
    this.getContactClicks = function ($id,cb) {
        var request = $this.prepRequest('get_contact_clicks', {'contact': $id});
        send(request, cb);
    };

    /**
     * Add contact to the specified list (Requires email verification by contact)
     * The return value of this function will be "queued", and on subsequent
     * submission of the same email address will be "duplicated".
     * @param string $campaign Campaign ID
     * @param string $name Name of contact
     * @param string $email Email address of contact
     * @param string $action Standard, insert or update
     * @param int $cycle_day
     * @param array $customs
     * @return object
     */
    /*+*/
    this.addContact = function ($campaign, $name, $email, $action, $cycle_day, $customs,cb) {
        var params = {
            'campaign': $campaign,
            'action': $action || 'standard',
            'email': $email,
            'cycle_day': $cycle_day || 0
        };


        params['name'] = $name || '';

        params['customs'] = [];
        for (var $key in $customs || {}) {
            var $val = $customs[$key];
            params['customs'].push({
                'name': $key,
                'content': $val
            });
        }

        var request = $this.prepRequest('add_contact', params);
        send(request, cb);
    };

    /**
     * Delete a contact
     * @param string $id
     * @return object
     */
    /*+*/
    this.deleteContact = function ($id,cb) {
        var request = $this.prepRequest('delete_contact', {'contact': $id});
        send(request, cb);
    };

    /**
     * Get blacklist masks on account level
     * Account is determined by API key
     * @return object
     */
    /*+*/
    this.getAccountBlacklist = function (cb) {
        var request = $this.prepRequest('get_account_blacklist');
        send(request, cb);
    };

    /**
     * Adds blacklist mask on account level
     * @param string $mask
     * @return object
     */
    /*+*/
    this.addAccountBlacklist = function ($mask,cb) {
        var request = $this.prepRequest('add_account_blacklist', {mask: $mask});
        send(request, cb);
    };

    /**
     * Delete blacklist mask on account level
     * @param string $mask
     * @return object
     */
    /*+*/
    this.deleteAccountBlacklist = function ($mask,cb) {
        var request = $this.prepRequest('delete_account_blacklist', {mask: $mask});
        send(request, cb);
    };

    /**
     * Return a key => value array for text comparison
     * @param string $operator
     * @param mixed $comparison
     * @return array
     * @access private
     */
    this.prepTextOp = function ($operator, $comparison) {

        if ($this.textOperators.indexOf($operator)<0) {
            throw new Error('Invalid text operator');
        }
        if ($operator === 'CONTAINS') $comparison = '%' + $comparison + '%';
        var retVal = {};
        retVal[$operator] = $comparison;
        return retVal;
    };
return this;
}

module.exports = GetResponse;
