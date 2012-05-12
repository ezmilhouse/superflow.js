if (!chai) {
    var chai = require('../../');
}

var should = chai.should();

function err(fn, msg) {
    try {
        fn();
        throw new chai.AssertionError({ message: 'Expected an error' });
    } catch (err) {
        should.equal(msg, err.message);
    }
}

suite('superflow', function() {

    test('.version', function(){
        superflow.version.should.match(/^\d+\.\d+\.\d+$/);
    });

    // ---

    suite('Basics', function() {

        test('.seq() - should be a function', function() {
            superflow.seq.should.be.a('function');
        });

        test('.par() - should be a function', function() {
            superflow.par.should.be.a('function');
        });

    });

    // ---

    suite('.seq() / sync', function() {

        test('.end() results via 1st param - this.vars + this.get()', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .seq('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);

                });


        });
        test('.end() results via this.set() - this.vars + this.get()', function() {

            superflow
                .seq(function() {
                    this.set('res1', 1);
                })
                .seq(function() {
                    this.set('res2', 2);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);

                });


        });

    });

    suite('.seq() / async', function() {

        test('.end() results via 1st param - this.vars + this.get()', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .seq('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);

                    // ---

                    done();

                });

        });
        test('.end() results via this.set() - this.vars + this.get()', function(done) {

            superflow
                .seq(function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.set('res1', 1);
                        cb();
                    }, 250);
                })
                .seq(function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.set('res2', 2);
                        cb();
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);

                    // ---

                    done();

                });

        });

    });

    // ---

    suite('.par() / sync', function() {

        test('.end() results via 1st param - this.vars + this.get()', function() {

            superflow
                .par('res1', function() {
                    return 1;
                })
                .par('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);

                });


        });
        test('.end() results via this.set() - this.vars + this.get()', function() {

            superflow
                .par(function() {
                    this.set('res1', 1);
                })
                .par(function() {
                    this.set('res2', 2);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);

                });


        });

    });

    suite('.par() / async', function() {

        test('.end() results via 1st param - this.vars + this.get()', function(done) {

            superflow
                .par('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .par('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);

                    // ---

                    done();

                });

        });
        test('.end() results via this.set() - this.vars + this.get()', function(done) {

            superflow
                .par(function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.set('res1', 1);
                        cb();
                    }, 250);
                })
                .par(function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.set('res2', 2);
                        cb();
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);

                    // ---

                    done();

                });

        });

    });

    // ---

    suite('.seq() + .par() mixed / sync', function() {

        test('.end() results via 1st param - this.vars + this.get()', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .par('res2', function() {
                    return 2;
                })
                .par('res3', function() {
                    return 3;
                })
                .seq('res4', function() {
                    return 4;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');
                    this.vars.should.contain.key('res4');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.vars.res3.should.equal(3);
                    this.vars.res4.should.equal(4);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);
                    this.get('res3').should.equal(3);
                    this.get('res4').should.equal(4);

                });


        });
        test('.end() results via this.set() - this.vars + this.get()', function() {

            superflow
                .seq(function() {
                    this.set('res1', 1);
                })
                .par(function() {
                    this.set('res2', 2);
                })
                .par(function() {
                    this.set('res3', 3);
                })
                .seq(function() {
                    this.set('res4', 4);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');
                    this.vars.should.contain.key('res4');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.vars.res3.should.equal(3);
                    this.vars.res4.should.equal(4);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);
                    this.get('res3').should.equal(3);
                    this.get('res4').should.equal(4);

                });


        });

    });

    suite('.seq() + .par() mixed / async', function() {

        test('.end() results via 1st param - this.vars + this.get()', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .par('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .par('res3', function(cb) {
                    setTimeout(function() {
                        cb(null, 3);
                    }, 250);
                })
                .seq('res4', function(cb) {
                    setTimeout(function() {
                        cb(null, 4);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');
                    this.vars.should.contain.key('res4');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.vars.res3.should.equal(3);
                    this.vars.res4.should.equal(4);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);
                    this.get('res3').should.equal(3);
                    this.get('res4').should.equal(4);

                    // ---

                    done();

                });

        });
        test('.end() results via this.set() - this.vars + this.get()', function(done) {

            superflow
                .seq(function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.set('res1', 1);
                        cb();
                    }, 250);
                })
                .par(function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.set('res2', 2);
                        cb();
                    }, 250);
                })
                .par(function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.set('res3', 3);
                        cb();
                    }, 250);
                })
                .seq(function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.set('res4', 4);
                        cb();
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');
                    this.vars.should.contain.key('res4');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.vars.res3.should.equal(3);
                    this.vars.res4.should.equal(4);
                    this.get('res1').should.equal(1);
                    this.get('res2').should.equal(2);
                    this.get('res3').should.equal(3);
                    this.get('res4').should.equal(4);

                    // ---

                    done();

                });

        });

    });

    // ---

    suite('.die() / in .seq()', function() {

        test('sync', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .die()
                .seq('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);

                });

        });
        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .die()
                .seq('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);

                    // ---

                    done();

                });

        });

    });

    suite('.die() / in .seq() with func as 1st param,  overwriting .end()', function() {

        test('sync', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .die(function() {
                    this.set('res1', 5);
                })
                .seq('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(5);

                });

        });
        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .die(function() {

                    this.set('res1', 5);

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(5);

                    // ---

                    done();

                })
                .seq('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(5);

                    // ---

                    done();

                });

        });

    });

    suite('.die() / in .seq() with conditional expression', function() {

        test('sync + conditional === true', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .die(1 === 1)
                .seq('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);

                });

        });
        test('sync + conditional === false', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .die(1 === 2)
                .seq('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);

                });

        });
        test('async + conditonal === true', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .die(1 === 1)
                .seq('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);

                    // ---

                    done();

                });

        });
        test('async + conditonal === false', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .die(1 === 2)
                .seq('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);

                    // ---

                    done();

                });

        });

    });

    suite('.die() / in .seq() + .par() with conditional expression', function() {

        test('sync + conditional === true', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .die(1 === 1)
                .par('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);

                });

        });
        test('sync + conditional === false', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .die(1 === 2)
                .par('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);

                });

        });
        test('async + conditonal === true', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .die(1 === 1)
                .par('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);

                    // ---

                    done();

                });

        });
        test('async + conditonal === false', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .die(1 === 2)
                .par('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);

                    // ---

                    done();

                });

        });

    });

    // ---

    suite('.die() / in .seq() + .par()', function() {

        test('sync', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .die()
                .par('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);

                });

        });
        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .die()
                .par('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.contain.not.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);

                    // ---

                    done();

                });

        });

    });

    suite('.die() / in .seq() + .par() with func as 1st param,  overwriting .end()', function() {

        test('sync', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .die(function() {
                    this.set('res1', 5);
                })
                .par('res2', function() {
                    return 2;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.not.contain.key('res2');

                    // ---

                    this.vars.res1.should.equal(5);

                });

        });
        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .die(function() {

                    this.set('res1', 5);

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.contain.not.key('res2');

                    // ---

                    this.vars.res1.should.equal(5);

                    // ---

                    done();

                })
                .par('res2', function(cb) {
                    setTimeout(function() {
                        cb(null, 2);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');

                    // ---

                    this.vars.should.contain.not.key('res2');

                    // ---

                    this.vars.res1.should.equal(1);

                    // ---

                    done();

                });

        });

    });

    // ---

    suite('this.die() / in .seq()', function() {

        test('sync', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .seq('res2', function() {
                    if (this.get('res1') === 1) {
                        this.die();
                    } else {
                        return 2;
                    }
                })
                .seq('res3', function() {
                    return 3;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.should.not.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2) // because it's null

                });

        });
        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .seq('res2', function(cb) {
                    var that = this;
                    setTimeout(function() {
                        if (that.get('res1') === 1) {
                            that.die();
                            cb();
                        } else {
                            cb(null, 2);
                        }
                    }, 250);

                })
                .seq('res3', function(cb) {
                    setTimeout(function() {
                        cb(null, 3);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.should.not.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2) // because it's null

                    // ---

                    done();

                });

        });

    });

    suite('this.die() / in .seq() with func as 1st param,  overwriting .end()', function() {

        test('sync', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .seq('res2', function() {
                    if (this.get('res1') === 1) {
                        var that = this;
                        this.die(function() {
                            that.set('res1', 5);
                        });
                    } else {
                        return 2;
                    }
                })
                .seq('res3', function() {
                    return 3;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.should.not.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(5);
                    should.not.exist(this.vars.res2) // because it's null

                });

        });
        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .seq('res2', function(cb) {
                    var that = this;
                    setTimeout(function() {
                        if (that.get('res1') === 1) {
                            that.die(function() {

                                that.set('res1', 5);

                                // ---

                                this.should.contain.key('vars');
                                this.vars.should.be.a('object');
                                this.vars.should.contain.key('res1');
                                this.vars.should.contain.key('res2');

                                // ---

                                this.vars.should.not.contain.key('res3');

                                // ---

                                this.vars.res1.should.equal(5);
                                should.not.exist(this.vars.res2) // because it's null

                                // ---

                                done();
                            });
                            cb();
                        } else {
                            cb(null, 2);
                        }
                    }, 250);

                })
                .seq('res3', function(cb) {
                    setTimeout(function() {
                        cb(null, 3);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.should.not.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(5);
                    should.not.exist(this.vars.res2) // because it's null

                    // ---

                    done();

                });

        });

    });

    suite('this.die() / in .seq() with conditional expression === true', function() {

        test('sync', function() {

            superflow
                .seq('res1', function() {
                    return 1;
                })
                .seq('res2', function() {
                    return this.die(this.get('res1') === 1, 2); // if true die, otherwise 2
                })
                .seq('res3', function() {
                    return 3;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.should.not.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2) // because it's null

                });

        });
        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .seq('res2', function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.die(that.get('res1') === 1, function(next) {
                            if (next) return cb(null, 2);
                            cb();
                        });
                    }, 250);

                })
                .seq('res3', function(cb) {
                    setTimeout(function() {
                        cb(null, 3);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.should.not.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2) // because it's null

                    // ---

                    done();

                });

        });

    });

    suite('this.die() / in .seq() with conditional expression === false', function() {

        test('sync', function() {

            superflow
                .seq('res1', function() {
                return 1;
            })
                .seq('res2', function() {
                    return this.die(this.get('res1') === 5, 2); // if true die, otherwise 2
                })
                .seq('res3', function() {
                    return 3;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.vars.res3.should.equal(3);

                });

        });
        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .seq('res2', function(cb) {
                    var that = this;
                    setTimeout(function() {
                        that.die(that.get('res1') === 5, function(next) {
                            if (next) return cb(null, 2);
                            cb();
                        });
                    }, 250);

                })
                .seq('res3', function(cb) {
                    setTimeout(function() {
                        cb(null, 3);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(1);
                    this.vars.res2.should.equal(2);
                    this.vars.res3.should.equal(3);

                    // ---

                    done();

                });

        });

    });

    suite('this.die() / in .par()', function() {

        test('sync', function() {

            superflow
                .par('res1', function() {
                    return 1;
                })
                .par('res2', function() {
                    if (1 === 1) {
                        this.die();
                    } else {
                        return 2;
                    }
                })
                .par('res3', function() {
                    return 3;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2); // because it's null
                    this.vars.res3.should.equal(3);

                });

        });
        test('async', function(done) {

            superflow
                .par('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .par('res2', function(cb) {
                    var that = this;
                    setTimeout(function() {
                        if (1 === 1) {
                            that.die();
                            cb();
                        } else {
                            cb(null, 2);
                        }
                    }, 250);

                })
                .par('res3', function(cb) {
                    setTimeout(function() {
                        cb(null, 3);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2); // because it's null
                    this.vars.res3.should.equal(3);

                    // ---

                    done();

                });

        });

    });

    // ---

    suite('this.die() / in .seq() + .par() / going to die in .par()', function() {

        test('sync', function() {

            superflow
                .seq('res1', function(cb) {
                    return 1;
                })
                .par('res2', function(cb) {
                    if (1 === 1) {
                        this.die();
                    } else {
                        return 2;
                    }
                })
                .par('res3', function(cb) {
                    return 3;
                })
                .seq('res4', function(cb) {
                    return 4;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');

                    // ---

                    this.vars.should.not.contain.key('res4');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2); // because it's null
                    this.vars.res3.should.equal(3);

                });


        });

        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 250);
                })
                .par('res2', function(cb) {
                    var that = this;
                    setTimeout(function() {
                        if (1 === 1) {
                            that.die();
                            cb();
                        } else {
                            cb(null, 2);
                        }
                    }, 250);

                })
                .par('res3', function(cb) {
                    setTimeout(function() {
                        cb(null, 3);
                    }, 250);
                })
                .seq('res4', function(cb) {
                    setTimeout(function() {
                        cb(null, 4);
                    }, 250);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');
                    this.vars.should.contain.key('res3');

                    // ---

                    this.vars.should.not.contain.key('res4');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2); // because it's null
                    this.vars.res3.should.equal(3);

                    // ---

                    done();

                });

        });

    });

    suite('this.die() / in .seq() + .par() / going to die in .seq()', function() {

        test('sync', function() {

            superflow
                .seq('res1', function(cb) {
                    return 1;
                })
                .seq('res2', function(cb) {
                    if (1 === 1) {
                        this.die();
                    } else {
                        return 2;
                    }
                })
                .par('res3', function(cb) {
                    return 3;
                })
                .seq('res4', function(cb) {
                    return 4;
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.should.not.contain.key('res3');
                    this.vars.should.not.contain.key('res4');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2); // because it's null

                });


        });

        test('async', function(done) {

            superflow
                .seq('res1', function(cb) {
                    setTimeout(function() {
                        cb(null, 1);
                    }, 100);
                })
                .seq('res2', function(cb) {
                    var that = this;
                    setTimeout(function() {
                        if (1 === 1) {
                            that.die();
                            cb();
                        } else {
                            cb(null, 2);
                        }
                    }, 100);

                })
                .par('res3', function(cb) {
                    setTimeout(function() {
                        cb(null, 3);
                    }, 100);
                })
                .seq('res4', function(cb) {
                    setTimeout(function() {
                        cb(null, 4);
                    }, 100);
                })
                .end(function() {

                    this.should.contain.key('vars');
                    this.vars.should.be.a('object');
                    this.vars.should.contain.key('res1');
                    this.vars.should.contain.key('res2');

                    // ---

                    this.vars.should.not.contain.key('res3');
                    this.vars.should.not.contain.key('res4');

                    // ---

                    this.vars.res1.should.equal(1);
                    should.not.exist(this.vars.res2); // because it's null

                    // ---

                    done();

                });

        });

    });

});