describe('Experiments', function() {
  var Experiments;

  beforeEach(function() {
    Experiments = require('./Experiments');
  });

  describe('#getExperimentVariation', function() {
    describe('chosen variation', function() {
      beforeEach(function() {
        window.gaExperimentId = '1234';
        window.cxApi = {
        	getChosenVariation: sinon.stub().returns(1)
        };
      });

      it('returns letter B', function() {
        expect(Experiments.getExperimentVariation()).to.equal('B');
      });
    });

    describe('no chosen variation', function() {
			beforeEach(function() {
        window.cxApi = undefined;
      });

      it('returns null', function() {
        expect(Experiments.getExperimentVariation()).to.be.null;
      });
    });
  });

  describe('#getExperimentId', function() {
    describe('default scope of window', function() {
      beforeEach(function() {
        window.gaExperimentId = '456';
      });

      afterEach(function() {
        window.gaExperimentId = undefined;
      });

      it('checks for scope on window by default', function() {
        expect(Experiments.getExperimentId()).to.equal('456');
      });
    });

    describe('overridden scope', function() {
    	var scopeOverride;

      it('uses overridden scope if available', function() {
        expect(Experiments.getExperimentId({ gaExperimentId: '123' })).to.equal('123');
      });
    });

    describe('no experiment id', function() {
    	it('should be null', function() {
	      expect(Experiments.getExperimentId()).to.be.null;
    	});
    });
  });
});
