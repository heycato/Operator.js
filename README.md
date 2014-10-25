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
