var superflow = function (exports) {





	// Current version of the `superflow` library. Keep in sync with
	// `package.json`.
	var version = '0.0.1';

	// Save a reference to the global object (`window` in the browser,
	// `global` on the server).
	var root = this;

	// Save the previous value of the `superflow` variable, so that it can be,
	// restored later on, if `noConflict` is used.
	var previous_superflow = root.superflow;





	/**
	 * @function noConflict()
	 * @helper
	 * Runs superflow in *noConflict* mode, returning the `superflow` variable
	 * to its previous owner. Returns a reference to this superflow object.
	 */
	function noConflict() {
		root.superflow = previous_superflow;
		return this;
	}

	/**
	 * @function noop()
	 * @helper
	 *
	 * This is the `no callback` function that you wish to pass around as a
	 * function that will do nothing. Useful if `callback` is optional.
	 *
	 */
	function noop() {
	}

	/**
	 * @function isFunction(obj)
	 * @helper
	 * @param mixed
	 *
	 * Checks if incoming `mixed` is actually of type function.
	 *
	 */
	function isFunction(mixed) {
		return typeof(mixed) == 'function';
	}

	/**
	 * @function isArray(arr)
	 * @helper
	 * @param mixed
	 *
	 * Checks if incoming `mixed` is actually of type array (and not empty)
	 *
	 */
	function isArray(mixed) {
		return mixed instanceof Array && mixed.length > 0;
	}





	function Flow(name, callback, par) {

		this.last = null;
		this.idle = true;
		this.jobs = [];
		this.vars = {};
		this.done = null;
		this.dead = false;
		this.name = null;

		// ---

		if (par) {
			this.par(name, callback);
		} else {
			this.seq(name, callback);
		}

		// ---

		this.set = function (name, value) {
			if (name) this.vars[name] = value;
		};
		this.get = function (name) {
			if (name) return this.vars[name];
		};

		// ---

		this.context = this;

		// ---

		return this;

	}

	Flow.prototype.die = function (callback, value) {

		var that = this;

		if (this.idle) {

			this.jobs.push({
				name     : '__die__',
				callback : function () {
					return that.die.call(that, callback);
				}
			});

			return this;

		} else {

			if (callback || callback === false) {

				// If incoming `callback` is of type function, function
				// overwrites `.end()`, if not expects expression that
				// returns boolean, if true, `this.dead` is set to true,
				// otherwise nothing's happening, flow will go on.
				if (isFunction(callback)) {

					this.dead = true;
					this.done = callback;

				} else {

					if (callback === true) {

						this.dead = true;

						if (isFunction(value)) {
							if (value.length) {
								value(false); // async
							} else {
								this.done = value; // overwriting `.end()`
							}
						}

					} else {

						// async
						if (isFunction(value)) {
							if (value.length) {
								value(true); // async
							} else {
								this.done = value; // overwriting `.end()`
							}
						} else {
							return value || false;
						}
					}

				}

			} else {

				this.dead = true;

			}

		}

	};

	Flow.prototype.seq = function (name, callback) {

		if (isFunction(name)) {
			callback = name;
			name = null;
		}

		if (!callback) return this;

		this.last = 'seq';

		this.jobs.push({
			name     : name,
			callback : callback
		});

		return this;

	};

	Flow.prototype.par = function (name, callback) {

		if (isFunction(name)) {
			callback = name;
			name = null;
		}

		if (!callback) return this;

		// If last job was `par` add this job to last job
		// all `par` jobs that follow each other will be
		// handles as one `seq` job.
		// If this ist the first job in whole sequence,
		// open a new `par` job by pushing an array with
		// this job as first key.
		if (this.last === 'par') {

			// Add to existing `par` job.
			this.jobs[this.jobs.length - 1].push({
				name     : name,
				callback : callback
			});

		} else {

			// Create new `par` job.
			this.jobs.push([
				{
					name     : name,
					callback : callback
				}
			]);

			// Mark last add as `par` one.
			this.last = 'par';

		}

		return this;

	};

	Flow.prototype.next = function (arr) {

		var that = this;

		var go = function (arr, callback) {

			arr.shift();

			if (arr.length > 0) {

				if (!that.dead) return that.next(arr);
				if (callback) return callback();
				that.done.call(that.context, null, that.data);

			} else {

				if (callback) return callback();
				that.done.call(that.context, null, that.data);

			}

		};

		var io = function (arr, callback) {

			if (arr[0].callback.length) {

				// async
				arr[0].callback.call(that.context, function (err, data) {

					// skip!
					if (arr[0].name === '__die__') return go(arr, callback);

					// save
					// that.data.push(data);
					// if (arr[0].name) that.vars[arr[0].name] = data;
					// if (!that.get(arr[0].name)) that.set(arr[0].name, data || null);
					if (arr[0].name) that.set(arr[0].name, data || null);

					go(arr, callback);

				});

			} else {

				// sync
				var data = arr[0].callback.call(that.context);

				// skip!
				if (arr[0].name === '__die__') return go(arr, callback);

				// save
				// that.data.push(data);
				// if (arr[0].name) that.vars[arr[0].name] = data;
				// if (!that.get(arr[0].name)) that.set(arr[0].name, data || null);
				if (arr[0].name) that.set(arr[0].name, data || null);

				go(arr, callback);

			}

		};

		// skip all if someone died
		if (this.dead) return this.done.call(this.context, null, this.data);

		if (isArray(arr[0])) {

			if (arr[0].length > 0) {

				var m = arr[0].length
					, c = 0;

				// If first key of incoming array is also an array,
				// it indicates a `.par` block of functions. As those
				// functions need to be executed in paralel, loop
				// over them and return to main arr after all of those
				// functions have called there finish callbacks.
				for (var i = 0; i < m; i++) {

					// If all functions are executed, return back to
					// main jobs array.
					io([arr[0][i]], function () {
						c += 1;
						if (c >= m) {
							arr.shift();
							return that.next(arr);
						}
					});

				}

			} else {

				if (arr.length > 0) {
					io(arr);
				} else {
					this.done.call(this.context, null, this.data);
				}

			}

		} else {

			if (arr.length > 0) {
				io(arr);
			} else {
				this.done.call(this.context, null, this.data);
			}

		}

	};

	Flow.prototype.end = function (callback) {

		this.idle = false;
		this.done = callback || noop;

		// start rolling
		this.next(this.jobs);

	};





	function seq(name, callback) {
		return new Flow(name, callback);
	}

	function par(name, callback) {
		return new Flow(name, callback, true);
	}





	exports = {

		version : version,

		// ---

		seq : seq,
		par : par,

		// ---

		noConflict : noConflict

	};

	return exports;





}({});
