var $apiKey = '';
var $apiUrl ='';
var $api = new require('./index')($apiKey,$apiUrl);

// Connection Testing
//$ping = $api.ping(function(r){console.log(r);});
// Account
//$details = $api.getAccountInfo(function(r){console.log(r);});
//$details = $api.getAccountFromFields(function(r){console.log(JSON.stringify(r));});
//$details = $api.getAccountFromFieldByID('z',function(r){console.log(JSON.stringify(r));});
//$details = $api.getAccountFromFieldsByEmail('vpolonik@q-page.ru',function(r){console.log(JSON.stringify(r));});
// Campaigns
//$campaigns 	 = $api.getCampaigns(null,null,function(r){console.log(JSON.stringify(r));});

//$campaignIDs = array_keys($campaigns);
//$campaign 	 = $api.getCampaignByID('l',function(r){console.log(JSON.stringify(r));});
//$campaign 	 = $api.getCampaignByName('qpage_1actual',function(r){console.log(JSON.stringify(r));});

// //Messages
$messages = $api.getMessages(null,null,function(r){console.log(JSON.stringify(r));});

/// / Contacts
//$contacts 	= $api.getContacts(['l'],null,null,null,function(r){console.log(r);});
//$contactIDs	= array_keys($contacts);

//$setName 	= $api.setContactName('nk', 'Дениска');
//$setCustoms	= $api.setContactCustoms('nk', {'title' : 'Mr', 'middle_name' : 'Fred'},function(r){console.log(r);});

//$customs 	= $api.getContactCustoms('nk',function(r){console.log(r);});
//$contact 	= $api.getContactByID('nk',function(r){console.log(r);});
//$geoIP 		= $api.getContactGeoIP('nk',function(r){console.log(r);});
//$opens 		= $api.getContactOpens('nk',function(r){console.log(r);});
//$clicks 	= $api.getContactClicks('nk',function(r){console.log(r);});

//// Find the contact ID by using email ID and delete the contact

//$contactEmail	= $api.getContactsByEmail(['denial5553@gmail.com'],function(r){console.log(r);});

//----------------------------------------------------$deleteResponse	= $api.deleteContact($contactEmailID[0]);
//var_dump($contacts, $setName, $setCustoms, $customs, $contact, $geoIP, $opens, $clicks);
//// Blacklists
//$addBlacklist = $api.addAccountBlacklist('denial5553@gmail.com',function(r){console.log(r);});
//$getBlacklist = $api.getAccountBlacklist(function(r){console.log(r);});
//$delBlacklist = $api.deleteAccountBlacklist('denial5553@gmail.com',function(r){console.log(r);});
