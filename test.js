var assert = require('assert');
var bonds_id = '1109';
var verlander_id = '8700';

describe('player.js', function() {
  describe('seasonStats()', function() {
    it('should return an empty object if player id is not found', function() {
      var player = require('./player');
      var data = player.seasonStats('-1');
      assert.equal({}, data);
    });

    it('should return an object containing a property with the players birth date',
       function() {
	 var player = require('./player');
	 var data = player.seasonStats(bonds_id);
	 assert.equal('7/24/1964', data.dob);
       });

    it('should return an object containing a property with the players batting handedness',
       function() {
      var player = require('./player');
      var bats = player.seasonStats(bonds_id).bats;
      assert.equal('L', bats);
    });

    it('should return an object containing a property with the players throwing handedness',
       function() {
	 var player = require('./player');
	 var data = player.seasonStats(bonds_id).throws;
	 assert.equal('L', data.throws);
       });

    it('should return an object containing the players height',
       function() {
	 var player = require('./player');
	 var data = player.seasonStats(bonds_id);
	 assert.equal('6-2', data.height);
       });

    it('should return an object containing the players weight',
       function() {
	 var player = require('./player');
	 var data = player.seasonStats(bonds_id);
	 assert.equal('240', data.weight);
       });

    it('should return an object containing the players position',
       function() {
	 var player = require('./player');
	 var data = player.seasonStats(bonds_id);
	 assert.equal('OF', data.position);
       });

    it('should return an object describing the players draft history',
       function() {
	 var player = require('./player');
	 var data = player.seasonStats(bonds_id);
	 assert.equal('1985', draft.year);
	 assert.equal('June Amateur Draft', draft.draft);
	 assert.equal('1', draft.round);
	 assert.equal('6', draft.pick);
	 assert.equal('6', draft.overall);
	 assert.equal('Pittsburgh Pirates', draft.team);
       });

    it('should return an object describing the players contract',
       function() {
	 var player = require('./player');
	 var data = player.seasonStats(verlander_id);
	 assert.equal('180,000,000', contract.dollars);
	 assert.equal('2013', contract.start_year);
	 assert.equal('2019', contract.end_year);
	 assert.equal('1', contract.option_years);
       });
  });
});
