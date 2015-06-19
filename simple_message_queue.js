// Your first task is to implement a simple publish / subscribe (or "pub/sub") system.
// Use the code in this file as a blueprint, and modify / add to it as needed.

SimpleMessageQueue = (function () {
	var eventsMasterList = {}
	var proto = {
		/**
		 * Subscribe to a list of event "types" with the specified callback.
		 *
		 * @param {Array} An array of strings, or event "types" to subscribe to.
		 * @param {Function} A callback to execute when an event of the right type is published.
		 */
		subscribe: function (types, callback) {
			for (i in types) {
				eventsMasterList[types[i]] = callback //.concat( [callback] );
			}
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
			console.log("Publication has content")
			for (event in Object.keys(eventsMasterList)) {
				if (Object.keys(eventsMasterList)[event] == type) {
					//for (callback in eventsMasterList[type]) {
						eventsMasterList[type](data)
					//}
				}
			}
		},
	};

	return {
		prototype: proto,
		// Use this function to instantiate instances of SimpleMessageQueue. See tests.js for the
		// specification of how the instances should behave.
		create: function () {
			var ret = Object.create(proto);
			ret.subscrptions = {};
			return ret;
		},
	};

}());
