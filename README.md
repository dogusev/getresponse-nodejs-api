# mailersoft-nodejs-api
Mailersoft API wrapper for node js
### Install
```sh
npm install mailersoft-nodejs-api
```
### Usage
```sh
var $apiKey = 'apikey';
var Mailerlite = require('/path/to/api/index');
var mailerlite = new Mailerlite($apiKey);

var $ML_Subscribers = mailerlite.subscribers;
var $ML_Campaigns = mailerlite.campaigns;
var $ML_lists = mailerlite.lists;
var $ML_Messages = mailersoft.messages;

```

### ML Messages API

```sh

var $subscriber = [
         {
         email: 'example1@email.com',
         name: 'First name'
         },
         {
         email: 'gexample2@email.com',
         name: 'jirst name'
         }
    ];

$ML_Messages.setId('ID').addRecipients($subscriber).send(function(r){
    console.log(r);
});
```

### ML Subscribers API

```sh
var $subscriber = [
        {
            'email': 'example1@email.com',
            'name': 'First name'
        },
        {
            'email': 'example2@email.com',
            'name': 'First name'
        }
    ];

$ML_Subscribers.setId('ID').addAll($subscriber, 1, function (r) {
    console.log(r);
});

$ML_Subscribers.unsubscribe('example1@email.com', function (r) {
    console.log(r);
});

$ML_Subscribers.setId('ID').remove('example1@email.com', function (r) {
    console.log(r);
});

$ML_Subscribers.get('example1@email.com', true, function (r) {
   console.log(r);
});

var $subscriber = {
    form: {
        'email': 'example1@email.com',
        'name': 'name'
    }
};
$ML_Subscribers.setId('ID').add($subscriber, 1 ,function(r){
    console.log(r);
});
```

### ML CAMPAINGNS API  
```sh
$ML_Campaigns.setId('ID').getJunk(false, function (r) {
    console.log(r);
});

$ML_Campaigns.setId('ID').getBounces(false, function (r) {
    console.log(r);
});

$ML_Campaigns.setId('ID').getUnsubscribes(false, function (r) {
    console.log(r);
});

$ML_Campaigns.setId('ID').getClicks(false, function (r) {
    console.log(r);
});

$ML_Campaigns.setId('ID').getOpens(false, function (r) {
    console.log(r);
});

$ML_Campaigns.setId('ID').getRecipients(false, function (r) {
    console.log(r);
});

$ML_Campaigns.setId('ID').get(false, function (r) {
    console.log(r);
});

$ML_Campaigns.getAll(false, function (r) {
    console.log('getAll', r);
});
```

### ML LISTS API  
```sh
$ML_lists.setId('ID').getBounced(false,function (r) {
    console.log('getBounced', r);
})

$ML_lists.setId('ID').getUnsubscribed(false,function (r) {
    console.log('getUnsubscribed', r);
});

$ML_lists.setId('ID').getActive(false,function (r) {
    console.log('getActive', r);
});

$ML_lists.getAll(false, function (r) {
    console.log('getAll', r);
});

$ML_lists.setId('ID').remove(false, function (r) {
    console.log('remove', r);
});

$ML_lists.setId('ID').put({name:"New name"}, function (r) {
    console.log('put', r);
});

$ML_lists.add({form:{"name": "new list name"}}, function (r) {
    console.log('add ', r);
});

$ML_lists.setId('ID').get(false, function (r) {
    console.log('get', r);
});
```
