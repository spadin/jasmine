describe("Matchers (Integration)", function() {
  function verifyPasses(expectations, expectationCount) {
    var env = new jasmineUnderTest.Env();
    expectationCount = expectationCount || 1;

    it('passes', function(done) {
      env.it('a spec', function() {
        expectations(env);
      });

      var specExpectations = function(result) {
        expect(result.status).toEqual('passed');
        expect(result.passedExpectations.length).toEqual(expectationCount);
        expect(result.failedExpectations.length).toEqual(0);
      };

      env.addReporter({ specDone: specExpectations, jasmineDone: done });
      env.execute();
    });
  };

  function verifyFails(expectations) {
    var env = new jasmineUnderTest.Env();

    it('fails', function(done) {
      env.it('a spec', function() {
        expectations(env);
      });

      var specExpectations = function(result) {
        expect(result.status).toEqual('failed');
        expect(result.failedExpectations.length).toEqual(1);
        expect(result.passedExpectations.length).toEqual(0);
      };

      env.addReporter({ specDone: specExpectations, jasmineDone: done });
      env.execute();
    });
  };

  describe('nothing', function() {
    verifyPasses(function(env) {
      env.expect().nothing();
    });
  });

  describe('toBeCloseTo', function() {
    verifyPasses(function(env) {
      env.expect(1.001).toBeCloseTo(1, 2);
    });

    verifyFails(function(env) {
      env.expect(1.1).toBeCloseTo(1, 2);
    });
  });

  describe('toBeDefined', function() {
    verifyPasses(function(env) {
      env.expect({}).toBeDefined();
    });

    verifyFails(function(env) {
      env.expect(undefined).toBeDefined();
    });
  });

  describe('toBeFalsy', function() {
    verifyPasses(function(env) {
      env.expect(false).toBeFalsy();
    });

    verifyFails(function(env) {
      env.expect(true).toBeFalsy();
    });
  });

  describe('toBeGreaterThanOrEqual', function() {
    verifyPasses(function(env) {
      env.expect(2).toBeGreaterThanOrEqual(1);
    });

    verifyFails(function(env) {
      env.expect(1).toBeGreaterThanOrEqual(2);
    });
  });

  describe('toBeGreaterThan', function() {
    verifyPasses(function(env) {
      env.expect(2).toBeGreaterThan(1);
    });

    verifyFails(function(env) {
      env.expect(1).toBeGreaterThan(2);
    });
  });

  describe('toBeLessThanOrEqual', function() {
    verifyPasses(function(env) {
      env.expect(1).toBeLessThanOrEqual(2);
    });

    verifyFails(function(env) {
      env.expect(2).toBeLessThanOrEqual(1);
    });
  });

  describe('toBeLessThan', function() {
    verifyPasses(function(env) {
      env.expect(1).toBeLessThan(2);
    });

    verifyFails(function(env) {
      env.expect(2).toBeLessThan(1);
    });
  });

  describe('toBeNaN', function() {
    verifyPasses(function(env) {
      env.expect(NaN).toBeNaN();
    });

    verifyFails(function(env) {
      env.expect(2).toBeNaN();
    });
  });

  describe('toBeNegativeInfinity', function() {
    verifyPasses(function(env) {
      env.expect(Number.NEGATIVE_INFINITY).toBeNegativeInfinity();
    });

    verifyFails(function(env) {
      env.expect(2).toBeNegativeInfinity();
    });
  });

  describe('toBeNull', function() {
    verifyPasses(function(env) {
      env.expect(null).toBeNull();
    });

    verifyFails(function(env) {
      env.expect(2).toBeNull();
    });
  });

  describe('toBePositiveInfinity', function() {
    verifyPasses(function(env) {
      env.expect(Number.POSITIVE_INFINITY).toBePositiveInfinity();
    });

    verifyFails(function(env) {
      env.expect(2).toBePositiveInfinity();
    });
  });

  describe('toBe', function() {
    verifyPasses(function(env) {
      env.expect(1).toBe(1);
    });

    verifyFails(function(env) {
      env.expect(2).toBe(1);
    });
  });

  describe('toBeTruthy', function() {
    verifyPasses(function(env) {
      env.expect(true).toBeTruthy();
    });

    verifyFails(function(env) {
      env.expect(false).toBeTruthy();
    });
  });

  describe('toBeUndefined', function() {
    verifyPasses(function(env) {
      env.expect(undefined).toBeUndefined();
    });

    verifyFails(function(env) {
      env.expect(null).toBeUndefined();
    });
  });

  describe('toContain', function() {
    verifyPasses(function(env) {
      env.expect([1]).toContain(1);
      env.expect([1]).toContain(jasmineUnderTest.anything());
    }, 2);

    verifyFails(function(env) {
      env.expect([]).toContain(1);
    });
  });

  describe('toEqual', function() {
    verifyPasses(function(env) {
      env.expect(1).toEqual(1);
      env.expect(1).toEqual(jasmineUnderTest.anything());
    }, 2);

    verifyFails(function(env) {
      env.expect(2).toEqual(1);
    });
  });

  describe('toHaveBeenCalledBefore', function() {
    verifyPasses(function(env) {
      var spy1 = jasmineUnderTest.createSpy("spy1"),
        spy2 = jasmineUnderTest.createSpy("spy2");
      spy1();
      spy2();
      env.expect(spy1).toHaveBeenCalledBefore(spy2);
    });

    verifyFails(function(env) {
      var spy1 = jasmineUnderTest.createSpy("spy1"),
        spy2 = jasmineUnderTest.createSpy("spy2");
      env.expect(spy1).toHaveBeenCalledBefore(spy2);
    });
  });

  describe('toHaveBeenCalled', function() {
    verifyPasses(function(env) {
      var spy = jasmineUnderTest.createSpy("spy");
      spy();
      env.expect(spy).toHaveBeenCalled();
    });

    verifyFails(function(env) {
      var spy = jasmineUnderTest.createSpy("spy");
      env.expect(spy).toHaveBeenCalled();
    });
  });

  describe('toHaveBeenCalledTimes', function() {
    verifyPasses(function(env) {
      var spy = jasmineUnderTest.createSpy("spy");
      spy();
      env.expect(spy).toHaveBeenCalledTimes(1);
    });

    verifyFails(function(env) {
      var spy = jasmineUnderTest.createSpy("spy");
      spy();
      env.expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('toHaveBeenCalledWith', function() {
    verifyPasses(function(env) {
      var spy = jasmineUnderTest.createSpy("spy");
      spy(1);
      env.expect(spy).toHaveBeenCalledWith(1);
      env.expect(spy).toHaveBeenCalledWith(jasmineUnderTest.anything());
    }, 2);

    verifyFails(function(env) {
      var spy = jasmineUnderTest.createSpy("spy");
      env.expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('toMatch', function() {
    verifyPasses(function(env) {
      env.expect('foo').toMatch(/o$/);
    });

    verifyFails(function(env) {
      env.expect('bar').toMatch(/o$/);
    });
  });

  describe('toThrowError', function() {
    verifyPasses(function(env) {
      env.expect(function() { throw new Error('nope') }).toThrowError();
    });

    verifyFails(function(env) {
      env.expect(function() {}).toThrowError();
    });
  });

  describe('toThrow', function() {
    verifyPasses(function(env) {
      var e = new Error('nope');
      env.expect(function() { throw e; }).toThrow(e);
      env.expect(function() { throw e; }).toThrow(jasmineUnderTest.anything());
    }, 2);

    verifyFails(function(env) {
      env.expect(function() {}).toThrow();
    });
  });
});
