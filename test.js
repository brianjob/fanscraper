var assert = require('assert');
var bonds_id = '1109';
var verlander_id = '8700';
var vmart_id = '393';
var nathan_id = '1122';
var bonifacio_id = '4054';

describe('player.js', function() {
  describe('seasonStats()', function() {
    it('should return null if player id is not found', 
       function(done) {
	 this.timeout(3000);
	 var player = require('./player');
	 player.seasonStats('-1')
	   .then(function(data) {
	     assert.equal(null, data);
	     done();
	   });
       });

    it('should return an object containing a property with the players name',
       function(done) {
	 this.timeout(3000);
	 var player = require('./player');
	 player.seasonStats(verlander_id)
	   .then(function(data) {
	     console.log(JSON.stringify(data));
	     assert.equal('Justin Verlander', data.name);
	     done();
	   });
       });

    it('should return an object containing a property with the players birth date',
       function(done) {
	 this.timeout(3000);
	 var player = require('./player');
	 player.seasonStats(bonds_id)
	   .then(function(data) {
	     console.log(JSON.stringify(data));
	     assert.equal('7/24/1964', data.dob);
	     done();
	   });
       });

    it('should return an object containing a property with the players batting handedness',
       function(done) {
	 this.timeout(3000);
	 var player = require('./player');
	 player.seasonStats(vmart_id)
	   .then(function(data) {
	     assert.equal('B', data.bats);
	     done();
	   });
       });
    
    it('should return an object containing a property with the players throwing handedness',
       function(done) {
	 this.timeout(3000);
	 var player = require('./player');
	 player.seasonStats(vmart_id)
	   .then(function(data) {
	     assert.equal('R', data.throws);
	     done();
	   });
       });

    it('should return an object containing the players height',
       function(done) {
	 var player = require('./player');
	 player.seasonStats(bonds_id)
	   .then(function(data) {
	     assert.equal('6-2', data.height);
	     done();
	   });
       });

    it('should return an object containing the players weight',
       function(done) {
	 var player = require('./player');
	 player.seasonStats(bonds_id)
	   .then(function(data) {
	     assert.equal('240', data.weight);
	     done();
	   });
       });

    it('should return an object containing the players position',
       function(done) {
	 var player = require('./player');
	 player.seasonStats(bonds_id)
	 .then(function(data) {
	   assert.equal('OF', data.position);
	   done();
	 });
       });

    it('should return an object describing the players draft history',
       function(done) {
	 var player = require('./player');
	 return player.seasonStats(bonds_id)
	   .then(function(data) {
	     var draft = data.draft;
	     assert.equal('1985', draft.year);
	     assert.equal('June Amateur Draft', draft.draft);
	     assert.equal('1', draft.round);
	     assert.equal('6', draft.pick);
	     assert.equal('6', draft.overall);
	     assert.equal('Pittsburgh Pirates', draft.team);
	     done();
	   });
       });

    it('should return an object describing the players contract',
       function(done) {
	 var player = require('./player');
	 player.seasonStats(verlander_id)
	   .then(function(data) {
	     var contract = data.contract;
	     assert.equal('$180M', contract.dollars);
	     assert.equal('2013', contract.start_year);
	     assert.equal('2019', contract.end_year);
	     assert.equal('7', contract.length)
	     assert.equal('1', contract.option_years);
	     done();
	   });
       });

    it('should return on object w/ a null contract property if no contract info',
       function(done) {
	 var player = require('./player');
	 player.seasonStats(bonds_id)
	   .then(function(data) {
	     assert.equal(null, data.contract);
	   });
       });

    it('should return an object describing the players contract extension if it exists',
       function(done) {
	 var player = require('./player');
	 player.seasonStats(nathan_id)
	   .then(function(data) {
	     var extension = data.extension;
	     assert.equal('$20M', extension.dollars);
	     assert.equal('2014', extension.start_year);
	     assert.equal('2015', extension.end_year);
	     assert.equal('2', extension.length);
	     assert.equal('1', extension.option_years);
	   });
       });

    it('should return an object w/ null extension property if no extension info',
       function(done) {
	 var player = require('./player');
	 player.seasonStats(verlander_id)
	 .then(function(data) {
	   assert.equal(null, data.extension);
	 });
       });
  });
});
