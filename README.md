# Module: MMM-M1-Pimatic
This [MagicMirror](https://github.com/MichMich/MagicMirror) module, connects to a [pimatic](https://pimatic.org/) home automation server to listen on important notifications.

![Magic-Mirror Module MMM-M1-Pimatic - Notification Board](https://github.com/mrdago/MMM-M1-Pimatic/blob/master/NotificationBoard.PNG?raw=true)


## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client)
- A active pimatic home automation server (see also [pimatic websocket-API](https://pimatic.org/guide/api/))


## Installation

Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/mrdago/MMM-M1-Pimatic.git
```

Navigate to the new `MMM-M1-Pimatic` folder and install the node dependencies.
```
npm install
```

Configure the module in your `config.js` . You can find an example configuration in file `config.js-Pimatic`.

## Using the module

Pimatic devices of interest for the notification board need to be defined in file`config/config.js`. The following example include three devices.
```javascript
	modules: [      
        {
            module: 'MMM-M1-Pimatic',
            position: 'top_center',
            header: 'Notification Board',
            host :'pimatic',
            port : 80,
            user : 'XXXXXX',
            passwd : 'YYYYYY',
            config: {
                device: [
                    { 
                        name: 'Alarmanlage',
                        icon: 'icon-Alarmanlage',
                        attributeName: 'Alarmanlage.contact',
                        defaultValue: false,
                        notification : 'Eingeschaltet'
                    },
                    {
                        name: 'Termine',
                        icon: 'icon-Termine',
                        attributeName: 'dTermine.Termine',
                        defaultValue: 'keine',
                        notification: '@'
                    },
                    {
                        name: 'Wohnzimmer Steckdose 15 (Test)',
                        icon: 'icon-Default',
                        attributeName: 'wallplug15.state',
                        defaultValue: false,
                        notification: 'eingeschaltet'
                    },                    
                ],
            },
        },
```

## Configuration options

The following properties needs to be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>

		<tr>
			<td><code>host</code></td>
			<td>Hostname/IP of the pimatic home automation server.  

        <br>
				<br>
        <b>Possible values:</b> <code>localhost</code> or a Hostname/IP of a remote pimatic server.
        <br>
			        <br>
        <b>Required</b>
        <br>	
			</td>
		</tr>

		<tr>
			<td><code>port</code></td>
			<td>the port to connect to the pimatic server
        <br>
        <br>
        <b>Possible values:</b> number configured in <code>config.json</code> of pimatic installation
        <br>
							        <br>
        <b>Required</b>
        <br>
			</td>
		</tr>
		<tr>
			<td><code>user</code></td>
			<td>user name of an existing pimatic account configured in <code>config.json</code> of pimatic installation
  
			        <br><br>
        <b>Required</b>
        <br>	
			</td>
		</tr>
    		<tr>
			<td><code>passwd</code></td>
			<td>passwd of specified pimatic user account
        <br>
			        <br>
        <b>Required</b>
        <br>	
			</td>
		</tr>
    <tr>
			<td><code>device</code></td>
			<td>array of pimatic devices
        <br><br>
        <b>name:</b> string to display as first line in the notification board. You can choose a name independent from the pimatic device definition. 
         <br><br>
<b>icon:</b> icon name defined in style sheet file <code>MMM-M1-Pimatc.css</code>. You can design your own icons by editing the <code>icon-pimatic.png</code> file under directory icons.
<br><br>
<b>attributeName:</b> pimatic <code>attributeName</code> .  The <code>attributeName</code> consist of a pimatic deviceId and a related attribute : <code>deviceId.attribute</code>. Go to the pimatic GUI and find valid device attribute names under <code>Menu - Variables - Device Attributes</code>.
<br><br>
<b>defaultValue:</b> default device attribute value. A new received device attribute value is compared to the <code>defaultValue</code>. In case that the new value differ from the default value, the message defined in <code>notification</code> is shown in the notification board.
<br><br>
<b>notification:</b> message to show on the notification board.
	<br>
       Possible values: <code>string</code> or <code>@</code>. In case of <code>@</code> the received value of the device attribute is shown as the status information in the notification board.

        <br>
        <br>
        <b>Required</b>
        <br>

			</td>
		</tr>
	</tbody>
</table>

