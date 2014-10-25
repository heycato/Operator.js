(function(name, global, definition){
	if (typeof module !== "undefined" && module.exports) { 
		module.exports = definition();
	} else if (typeof define === "function" && define.amd) {
		define(definition);
	} else { 
		global[name] = definition();
	}
})("Operator", this, function(){
	"use strict";

	function Operator() {
		this.registry = {};
		this.connections = {};
	}

	Operator.prototype = {
		connect: function(connection) {
			var from = connection.from.name,
				to = connection.to,
				message = connection.message;

			if(!this.connections[from]) this.connections[from] = {};
			if(!this.connections[from][message]) this.connections[from][message] = [];

			var i = to.length;
			while(i--) {
				this.connections[from][message].push(to[i]);
			}
		},
		disconnect: function(disconnection) {
			var from = disconnection.from,
				to = disconnection.to,
				message = disconnection.message;

			if(_connectionExists.apply(this, [from, message])) {
				var i = to.length;
				while(i--) {
					var j = this.connections[from.name][message].indexOf(to[i]);
					if(j > -1) this.connections[from.name][message].splice(j, 1);
				}
			}
		},
		dispatch: function(message, data, from) {
			if(_connectionExists.apply(this, [from, message])) {
				var i = this.connections[from.name][message].length;
				while(i--) {
					this.connections[from.name][message][i].notify(message, data);
				}
			}
		},
		createMessenger: function(name) {
			if(!this.registry[name]) {
				this.registry[name] = new Messenger(name, this);
			}
			return this.registry[name];
		}
	};

	function Messenger(name, operator) {
		this.operator = operator;
		this.name = name;
		this.messages = {};
	}

	Messenger.prototype = {
		listen: function(message, callback) {
			if(!this.messages[message]) this.messages[message] = [];
			this.messages[message].push(callback);
		},
		ignore: function(message, callback) {
			var i = this.messages[message].indexOf(callback);
			if(i > -1) this.messages[message].splice(i, 1);
		},
		notify: function(message, data) {
			if(this.messages[message]) {
				var i = this.messages[message].length;
				while(i--) {
					var cb = this.messages[message][i];
					cb.apply(this, [data]);
				}
			}
		},
		report: function(message, data) {
			this.operator.dispatch(message, data, this);
		}
	};

	function _connectionExists(from, message) {
		return !!(this.connections[from.name] && this.connections[from.name][message]);
	}

	return Operator;

});