var cfg = require('../../config');
var $apiKey = cfg.getresponse.apiKey;
var $apiUrl =cfg.getresponse.apiUrl;
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

//$campaign 	 = $api.getCampaignByID('l',function(r){console.log(JSON.stringify(r));});
//$campaign 	 = $api.getCampaignByName('qpage_1actual',function(r){console.log(JSON.stringify(r));});

// //Messages
//$messages = $api.getMessages(null,null,function(r){console.log(JSON.stringify(r));});
//$messages = $api.getMessageByID('XW',function(r){console.log(JSON.stringify(r));});
//$messages = $api.getMessageByCycleDay(['l'],0,function(r){console.log(JSON.stringify(r));});
//$messages = $api.getMessageContents('XW',function(r){console.log(JSON.stringify(r));});
//$messages = $api.getMessageStats('XW',null,function(r){console.log(JSON.stringify(r));});
//$messages = $api.getMessageContentsByCycleDay(['l'],1,function(r){console.log(JSON.stringify(r));});

//$messages = $api.sendNewsletter('l',null,null,'Hello','Hello world!','this is plain','<h1>This is html</h1>',
//    ['openrate'], null,'d.o.gusev+5@gmail.com',function(r){console.log(JSON.stringify(r));});



// //Autoresponder
//$autoresponder = $api.addAutoresponder('l','autoresponder subject',1,'<h1>Hello</h1>','hello',null,null,function(r){console.log(JSON.stringify(r));});
//$autoresponder = $api.deleteAutoresponder('XT',function(r){console.log(JSON.stringify(r));});



/// / Contacts

//$contacts 	= $api.getContacts(['l'],null,null,null,function(r){console.log(r);});
//$contacts 	= $api.getContactsByEmail('d.o.gusev+4@gmail.com',null,null,function(r){console.log(JSON.stringify(r));});
//$contacts 	= $api.getContactsByCustoms(null,{title:'Mr'},null,function(r){console.log(JSON.stringify(r));});

//$setName 	= $api.setContactName('nk', 'Дениска',function(r){console.log(JSON.stringify(r));});
//$setContactCycle 	= $api.setContactCycle('nk', 5,function(r){console.log(JSON.stringify(r));});
//$setContactCampaign 	= $api.setContactCampaign('nk', 'l',function(r){console.log(JSON.stringify(r));});
//$setCustoms	= $api.setContactCustoms('nk', {'title' : 'Mr', 'middle_name' : 'Fred'},function(r){console.log(r);});

//$addContact	= $api.addContact('l', 'Дмитрий', 'd.o.gusev+5@gmail.com', null, 1, {prop:"custom"},function(r){console.log(r);});
//$deleteContact	= $api.deleteContact('vzm',function(r){console.log(r);});

//$customs 	= $api.getContactCustoms('nk',function(r){console.log(r);});
//$contact 	= $api.getContactByID('nk',function(r){console.log(r);});
//$geoIP 		= $api.getContactGeoIP('nk',function(r){console.log(r);});
//$opens 		= $api.getContactOpens('nk',function(r){console.log(r);});
//$clicks 	= $api.getContactClicks('nk',function(r){console.log(r);});

// BLACKLISTS

//$bl 	= $api.getAccountBlacklist(function(r){console.log(r);});
//$bl 	= $api.addAccountBlacklist('denial5553@gmail.com',function(r){console.log(r);});
//$bl 	= $api.deleteAccountBlacklist('denial5553@gmail.com',function(r){console.log(r);});

//$contactEmail	= $api.getContactsByEmail(['denial5553@gmail.com'],function(r){console.log(r);});

//----------------------------------------------------$deleteResponse	= $api.deleteContact($contactEmailID[0]);
