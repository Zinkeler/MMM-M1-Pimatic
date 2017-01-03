/* global Module */

/* Magic Mirror
 * Module: MMM-M1-Pimatic
 *
 * By Mr.Sponti
 *      based on Luke Scheffler https://github.com/LukeSkywalker92
 * MIT Licensed.
 */

Module.register("MMM-M1-Pimatic", {
	// Default module config.
	defaults: {		
		noNotification: 'Connecting to pimatic ...',
	},

	// Required styles
	getStyles: function () {
		return ["MMM-M1-Pimatic.css"]
	},
	// Define parameters at start
	start: function () {
		this.config.user   = encodeURIComponent(this.config.user),
        this.config.passwd = encodeURIComponent(this.config.passwd),		
        this.loaded = false;
        this.connected = false;
        this.notifications = [];
	},
 
    // notifications from other modules
    
    notificationReceived: function (notification, payload) {
        if ( notification === 'ALL_MODULES_STARTED' ) {
            this.loaded = true;
            this.sendSocketNotification('PIMATIC_CONNECT', this.config);
        }
    },

    // notifications from own node helper  --> update display 
    
	socketNotificationReceived: function (notification, payload) {   
        console.log(notification);
        if ( notification === 'PIMATIC_NOTIFICATION' ) {
            this.notifications = payload;
            this.loaded = true;
            this.connected = true;
            this.updateDom(1000);
        }
        if ( notification === 'PIMATIC_ATTRIBUTE_CHANGED' || notification === 'PIMATIC_VARIABLES') {
            if ( this.loaded ){ 
                this.sendNotification(notification, payload);
            }
        }        
	},

	// Override dom generator.
	getDom: function () {
        var self = this;
        
        var wrapper = document.createElement("div");
		wrapper.className = 'wrapper';

        if (self.connected) {
            // new notification message received
            self.config.device.forEach(function(element, index, array) {
                if ( element.defaultValue != self.notifications[index]) {
                    var eventHeader = element.name;
                    if ( element.notification == '@') {
                        var eventText = self.notifications[index];
                    }
                    else {
                        var eventText = element.notification;
                    }
                    var wpiWrapper = document.createElement("div");                   
                    var icon = document.createElement("div");
                    var iconName = element.icon;
                    icon.classList.add('pimatic', iconName, 'icon-small');
                    var description = document.createElement("div");
                    description.className = 'event';
                    var headline = document.createElement("div");
                    headline.innerHTML = eventHeader;
                    var infoline = document.createElement("div");
                    infoline.className = 'eventinfo';
                    infoline.innerHTML = eventText;
                    
                    var newLine = document.createElement("br");
                    description.appendChild(headline);
                    description.appendChild(infoline);
                    wpiWrapper.appendChild(icon);
                    wpiWrapper.appendChild(description);
                    wrapper.appendChild(wpiWrapper);
                    wrapper.appendChild(newLine);
                }
            });
        }
        else {
            var noNotificationWrapper = document.createElement("p");
            noNotificationWrapper.className = 'status';
            noNotificationWrapper.innerHTML = this.config.noNotification;
            wrapper.appendChild(noNotificationWrapper); 
        }
		return wrapper;
	},
});
