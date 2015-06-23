SimpleMessageQueue = (function () {
	var subscriptions = {} //Key: Event Types, Value: Callbacks for Event Subscribers 
	var proto = {
		/**
		 * Subscribe to a list of event "types" with the specified callback.
		 *
		 * @param {Array} An array of strings, or event "types" to subscribe to.
		 * @param {Function} A callback to execute when an event of the right type is published.
		 */
		subscribe: function (types, callback) {
			types.forEach( function(type) {
				if(subscriptions[type] == null) {
					subscriptions[type] = []
				}
				subscriptions[type] = subscriptions[type].concat( callback );
			});
		},

		/**
		 * Publish an event with the specified event "type" and data. Calls any event-specific callbacks
		 * that were attached via 'subscribe'.
		 *
		 * @param {String}
		 * @param {*} Data to be passed to any subscription callbacks upon publication.
		 */
		publish: function (type, data) {
			if (data == null) {
				throw "Publication has no content"
			}
			Object.keys(subscriptions).forEach( function(event) {
				if (event == type) {
					subscriptions[type].forEach( function (callback) {
						try {
							callback(data)
						}
						catch(err) {
							console.log(err)
						}
					})
				}
			})
		},
	};

	return {
		prototype: proto,
		// Use this function to instantiate instances of SimpleMessageQueue. See tests.js for the
		// specification of how the instances should behave.
		create: function () {
			var ret = Object.create(proto)
			ret.subscriptions = {}
			return ret;
		},
	};

}());
