var $apiKey = '';

var $api = new require('./index')($apiKey);

// Connection Testing
$ping = $api.ping(function(r){console.log(r);});
// Account
$details = $api.getAccountInfo(function(r){console.log(r);});
/*// Campaigns
$campaigns 	 = $api.getCampaigns(function(r){console.log(r);});


$campaignIDs = array_keys($campaigns);
$campaign 	 = $api.getCampaignByID($campaignIDs[0]);
var_dump($campaigns, $campaign);
// Contacts
$contacts 	= (array)$api.getContacts(null);
$contactIDs	= array_keys($contacts);
$setName 	= $api.setContactName($contactIDs[0], 'John Smith');
$setCustoms	= $api.setContactCustoms($contactIDs[0], array('title' => 'Mr', 'middle_name' => 'Fred'));
$customs 	= $api.getContactCustoms($contactIDs[0]);
$contact 	= $api.getContactByID($contactIDs[0]);
$geoIP 		= $api.getContactGeoIP($contactIDs[0]);
$opens 		= $api.getContactOpens($contactIDs[0]);
$clicks 	= $api.getContactClicks($contactIDs[0]);
// Find the contact ID by using email ID and delete the contact
$contactEmail	= (array)$api.getContactsByEmail('EMAIL_ID');
$contactEmailID	= array_keys($contactEmail);
$deleteResponse	= $api.deleteContact($contactEmailID[0]);
var_dump($contacts, $setName, $setCustoms, $customs, $contact, $geoIP, $opens, $clicks);
// Blacklists
$addBlacklist = $api.addAccountBlacklist('someone@domain.co.uk');
$getBlacklist = $api.getAccountBlacklist();
$delBlacklist = $api.deleteAccountBlacklist('someone@domain.co.uk');
var_dump($addBlacklist, $getBlacklist, $delBlacklist);*/
