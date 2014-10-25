Operator.js
===========

## About

Operator.js is an event mapping object for use as a mediator.  

## Examples

### Create instances

```
var operator = new Operator(),
	appMsgr = operator.createMessenger('app'),
	module1 = operator.createMessenger('module1');

```

### Create connections

```
/*
* when message 'aMessage' is reported from module1
* operator routes the message to appMsgr
*/
var connection1 = {
	message:'aMessage',
	from:module1,
	to:[appMsgr]
};

operator.connect(connection1);

```

### Map listeners
##### (from the controller)

```
appMsgr.listen('aMessage', someCallback);

```

##### (meanwhile in the module...)

```
/*
* events is internal reference to module1Msgr which was
* passed into the module on instantiation
*
* report 'pipes' the event and data up to the operator
*/

events.report('aMessage', {data:'some important information'});

```

## Reference

##Public Methods

###Operator
#####connect
 - Registers a connection
 - @param: {object} connection - Object literal with "message", "from" and "to" properties to connect
 

#####disconnect
 - Unregisters a connection
 - @param: {object} disconnection - Object literal with "message", "from" and "to" properties to disconnect


#####createMessenger
 - Creates an instance of Messenger and registers it on the instance of Operater that called createMessenger
 - @param: {string} name - Name of messenger to create


###Messenger
#####listen
 - Maps a callback to an event route
 - @param: {string} message - Name of event route to map to callback
 - @param: {function} callback - Function to map to event route


#####ignore
 - Maps a callback to an event route
 - @param: {string} message - Name of event route to ignore
 - @param: {function} callback - Function connected to event route to ignore


#####notify
 - Maps a callback to an event route
 - @param: {string} message - Name of event route to notify
 - @param: {object} data - Data object to pass into callback of mapped event route


#####report
 - Maps a callback to an event route
 - @param: {string} message - Name of event route to report
 - @param: {object} data - Data object to send with report
