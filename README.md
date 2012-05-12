# Superflow.js
a asynchronous flow controller

## Motivation
I needed something to handle my asynchronous flows in client applications. I
like [substack's sequencer for Node.js](https://github.com/substack/node-seq) a
lot, so this is where the inspiration came from and therefore it basically
follows the same syntax.

## Quickstart

```js


    // sequential

    superflow
        .seq('a', function() {

            // sync
            return 'a';

        })
        .seq('b', function(cb) {

            // async
            setTimeout(function() {
                cb(null, 'b');
            }, 1000);

        })
        .end(function() {
            log('a,b', seq.vars);
        });

```

```js


    // parallel actions

    superflow
        .par('a', function() {

            // sync
            return 'a';

        })
        .par('b', function(cb) {

            // async
            setTimeout(function() {
                cb(null, 'b');
            }, 1000);

        })
        .end(function() {
            log('a,b', seq.vars);
        });

```

```js


    // sequential & parallel actions

    superflow
        .seq('a', function() {

            // sync
            return 'a';

        })
        .par('b', function(cb) {

            // async
            setTimeout(function() {
                cb(null, 'b');
            }, 1000);

        })
        .par('c', function() {

            // sync
            return 'c';

        })
        .seq('d', function(cb) {

            // async
            setTimeout(function() {
                cb(null, 'd');
            }, 1000);

        })
        .end(function() {
            log('a,b,c,d', seq.vars);
        });

```

```js


    // use set/get to return values

    superflow
        .seq(function() {

            // sync
            this.set('a', 'a');

        })
        .seq(function(cb) {

            var that = this;

            // async
            setTimeout(function() {
                that.set('b', 'b');
                cb();
            }, 1000);

        })
        .end(function() {

            log('a', this.get('a'));
            log('b', this.get('b'));

        });

```

```js


    // use .die() to kill a flow

    superflow
        .seq(function() {

            this.set('a', 'a');

        })
        .seq(function() {

            if (this.get('a') === 'a') {

                // kill flow
                this.die();

            } else {

                this.set('c', 'c');

            }

        })
        .seq(function() {

            this.set('c', 'c');

        })
        .end(function() {

            log('a', this.get('a')); // will be 'a'
            log('b', this.get('b')); // will be undefined
            log('c', this.get('c')); // will be undefined

        });

```

```js


    // use conditional .die() to kill a flow, based on expression returning
    // true or false

    superflow
        .seq(function() {

            this.set('a', 'a');

        })
        .seq(function() {

            // kill flow if expression (1st param) is `true`,
            // otherwise return 2nd param
            this.die(this.get('a') === 'a', 'c');

        })
        .seq(function() {

            this.set('c', 'c');

        })
        .end(function() {

            log('a', this.get('a')); // will be 'a'
            log('b', this.get('b')); // will be undefined
            log('c', this.get('c')); // will be undefined

        });

```

```js


    // use .die() as a chainable function

    superflow
        .seq(function() {

            this.set('a', 'a');

        })
        .die(this.get('a') === 'a')
        .seq(function() {

            this.set('c', 'c');

        })
        .end(function() {

            log('a', this.get('a')); // will be 'a'
            log('b', this.get('b')); // will be undefined
            log('c', this.get('c')); // will be undefined

        });

```

```js


    // use .die() with function as 2nd param to overwrite .end() function

    superflow
        .seq(function() {

            this.set('a', 'a');

        })
        .die(this.get('a') === 'a', function() {

            log('new .end()');
            log('a', this.get('a')); // will be 'a'
            log('b', this.get('b')); // will be undefined
            log('c', this.get('c')); // will be undefined


        })
        .seq(function() {

            this.set('c', 'c');

        })
        .end(function() {

            log('a', this.get('a')); // will be 'a'
            log('b', this.get('b')); // will be undefined
            log('c', this.get('c')); // will be undefined

        });

```
