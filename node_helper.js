/* Magic Mirror
 * Module: MMM-Pimatic
 *
 * By Mr.Sponti
 *      based on Luke Scheffler https://github.com/LukeSkywalker92
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var io = require('socket.io-client');

module.exports = NodeHelper.create({
	start: function () {
        console.log('MMM-M1-Pimatic helper started...');
	},

    // check received data on relevance and transfer values of monitoring devices into data array
	
    connectToPimatic: function (config) {
        var self = this;
        var deviceValues = [];

        // connect to Pimatic server

		var url = 'http://' + config.host + ':' + config.port + '/?username=' + config.user + '&password=' + config.passwd;
        var socket = io(url, {
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 3000,
          timeout: 20000,
          forceNew: true
        });

        socket.on('connect', function() {
          console.log('Connected to Pimatic');
        });
        
        socket.on('variables', function(variables){         
            variables.forEach(function(entry) {
                config.device.forEach(function(element, index, array) {
                    if (element.attributeName === entry.name) {
                        deviceValues[index] = entry.value;
                    }
                });
            });
            self.sendSocketNotification('PIMATIC_NOTIFICATION', deviceValues);
        });

        // receive and process pimatic device attribute changes 
        
        socket.on('deviceAttributeChanged', function(attrEvent) { 
            var receivedDeviceAttribute = attrEvent.deviceId + '.' + attrEvent.attributeName
            config.device.forEach(function(element, index, array) {
                if (element.attributeName === receivedDeviceAttribute){
                    deviceValues[index] = attrEvent.value
                }
            });

            // send notification to main moduls ...
            
            self.sendSocketNotification('PIMATIC_NOTIFICATION', deviceValues);
            self.sendSocketNotification('PIMATIC_ATTRIBUTE_CHANGED', attrEvent);
        })              
	},
    
    // Connect and listen to pimatic host
    
	socketNotificationReceived: function (notification, payload) {
        console.log(notification)
        if (notification == 'PIMATIC_CONNECT') {
            this.connectToPimatic(payload);
		}
	},

})
