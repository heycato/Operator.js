Operator.js
===========

## About

Operator.js is an event mapping object for use as a mediator.  

## Examples

```
var operator = new Operator(),
	appMsgr = operator.createMessenger('app'),
	module1 = operator.createMessenger('module1'),
	module2 = operator.createMessenger('module2');

```
