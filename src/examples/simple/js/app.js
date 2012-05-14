console.log('Superflow.js', superflow.version);

// #1 - 1st param is results object's key

superflow
    .seq('res1', function() {

        // sync
        return 1;

    })
    .par('res2', function() {

        // sync
        return 2;

    })
    .par('res3', function(cb) {

        // async
        setTimeout(function() {
            cb(null, 3);
        }, 1000);

    })
    .seq('res4', function(cb) {

        // async
        setTimeout(function() {
            cb(null, 4);
        }, 1000);

    })
    .end(function() {
        console.log('[sample1] res1, res2, res3, res4', this.vars);
    });

// #2 - use set/get to handle results

superflow
    .seq(function() {

        // sync
        this.set('res1', 1);

    })
    .par(function() {

        // sync
        this.set('res2', 2)

    })
    .par(function(cb) {

        var that = this;

        // async
        setTimeout(function() {
            that.set('res3', 3);
            cb();
        }, 1000);

    })
    .seq(function(cb) {

        var that = this;

        // async
        setTimeout(function() {
            that.set('res4', 4);
            cb();
        }, 1000);

    })
    .end(function() {
        console.log('[sample2] res1', this.get('res1'));
        console.log('[sample2] res2', this.get('res2'));
        console.log('[sample2] res3', this.get('res3'));
        console.log('[sample2] res4', this.get('res4'));
    });


// #3 - get vars from previous blocks

superflow
    .seq(function() {

        this.set('res1', 1);

    })
    .seq(function() {

        this.set('res2', 1 + this.get('res1'));

    })
    .end(function() {
        console.log('[sample3] res1', this.get('res1'));
        console.log('[sample3] res2', this.get('res2'));
    });


// #4 kill flow

superflow
    .seq(function() {
        this.set('res1', 1);
    })
    .seq(function() {
        if (this.get('res1') === 1) {
            this.die();
        } else {
            this.set('res2', 2);
        }
    })
    .seq('res3', function() {
        return 3;
    })
    .end(function() {
        console.log('[sample4] res1', this.get('res1'));
        console.log('[sample4] res2', this.get('res2'));
        console.log('[sample4] res3', this.get('res3'));
    });

// #5 kill flow and overwrite .end()

superflow
    .seq(function() {
        this.set('res1', 1);
    })
    .seq(function() {
        if (this.get('res1') === 1) {
            this.die(function() {
                console.log('[sample5] ... but this will!')
            });
        } else {
            this.set('res2', 2);
        }
    })
    .end(function() {
        console.log('[sample5] this will not show up ...')
    });