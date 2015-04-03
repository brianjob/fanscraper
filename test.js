var assert = require('assert');
var bonds_id = '1109';
var verlander_id = '8700';
var vmart_id = '393';
var nathan_id = '1122';
var bonifacio_id = '4054';
var prince_id = '4613';

var timeout = 10000;

describe('player.js', function() {
  describe('seasonStats()', function() {
    describe('getBio()', function() {
      it('should return null if player id is not found', 
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats('-1')
	     .then(function(data) {
	       assert.equal(null, data);
	       done();
	     });
	 });

      it('should return an object containing a property with the players name',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(verlander_id)
	     .then(function(data) {
	       assert.equal('Justin Verlander', data.name);
	       done();
	     });
	 });

      it('should return an object containing a property with the players birth date',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id)
	     .then(function(data) {
	       assert.equal('7/24/1964', data.dob);
	       done();
	     });
	 });

      it('should return an object containing a property with the players batting handedness',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(vmart_id)
	     .then(function(data) {
	       assert.equal('B', data.bats);
	       done();
	     });
	 });
      
      it('should return an object containing a property with the players throwing handedness',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(vmart_id)
	     .then(function(data) {
	       assert.equal('R', data.throws);
	       done();
	     });
	 });

      it('should return an object containing the players height',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id)
	     .then(function(data) {
	       assert.equal('6-2', data.height);
	       done();
	     });
	 });

      it('should return an object containing the players weight',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id)
	     .then(function(data) {
	       assert.equal('240', data.weight);
	       done();
	     });
	 });

      it('should return an object containing the players position',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id)
	     .then(function(data) {
	       assert.equal('OF', data.position);
	       done();
	     });
	 });

      it('should return an object describing the players draft history',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   return player.seasonStats(bonds_id)
	     .then(function(data) {
	       var draft = data.draft;
	       assert.equal('1985',               draft.year);
	       assert.equal('June Amateur Draft', draft.draft);
	       assert.equal('1',                  draft.round);
	       assert.equal('6',                  draft.pick);
	       assert.equal('6',                  draft.overall);
	       assert.equal('Pittsburgh Pirates', draft.team);
	       done();
	     });
	 });

      it('should return an object with a null draft property if no draft info available',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   return player.seasonStats(bonifacio_id)
	     .then(function(data) {
	       assert.equal(null, data.draft);
	       done();
	     });
	 });

      it('should return an object describing the players contract',
	 function(done) {
	   this.timeout(timeout);
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

      it('should return an object where contract.option_years = 0 for a player with no options on his contract',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(prince_id)
	     .then(function(data) {
	       assert.equal(0, data.contract.option_years);
	       done();
	     });
	 });

      it('should return on object w/ a null contract property if no contract info',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id)
	     .then(function(data) {
	       assert.equal(null, data.contract);
	       done();
	     });
	 });

      it('should return an object describing the players contract extension if it exists',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(nathan_id)
	     .then(function(data) {
	       var extension = data.extension;
	       assert.equal('$20M', extension.dollars);
	       assert.equal('2014', extension.start_year);
	       assert.equal('2015', extension.end_year);
	       assert.equal('2', extension.length);
	       assert.equal('1', extension.option_years);
	       done();
	     });
	 });

      it('should return an object w/ null extension property if no extension info',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(verlander_id)
	     .then(function(data) {
	       assert.equal(null, data.extension);
	       done();
	     });
	 });
    });
    
    describe('tables', function() {
      it('should return an object with the dashboard table as a property',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id)
	     .then(function(data) {
	       assert.equal('1986', data.stats.dashboard[0].Season);
	       assert.equal('3.3', data.stats.dashboard[0].WAR);
	       assert.equal('2002', data.stats.dashboard[21].Season);
	       assert.equal('12.7', data.stats.dashboard[21].WAR);
	       done();
	     });
	 });

      it('should return an object with the standard table as a property',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id).then(function(data) {
	     assert.equal('1986', data.stats.standard[0].Season);
	     assert.equal('26', data.stats.standard[0]['2B']);
	     assert.equal('2007', data.stats.standard[28].Season);
	     assert.equal('.298', data.stats.standard[29].AVG);
	     done();
	   });
	 });

      it('should return an object with the advanced table as a property',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id).then(function(data) {
	     assert.equal('0.64', data.stats.advanced[0]['BB/K']);
	     assert.equal('7.3', data.stats.advanced[0].Spd);
	     assert.equal('.293', data.stats.advanced[14].ISO);
	     assert.equal('4.0', data.stats.advanced[14].wSB);
	     done();
	   });
	 });

      it('should return an object with the batted ball table as a property',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id).then(function(data) {
	     assert.equal('2002', data.stats.battedball[0].Season);
	     assert.equal('0.0 %', data.stats.battedball[0]['BUH%']);
	     assert.equal('Postseason', data.stats.battedball[9].Season);
	     assert.equal('6.7 %', data.stats.battedball[9]['IFH%']);
	     done();
	   });
	 });

      it('should return an object with the more batted ball table as a property',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id).then(function(data) {
	     assert.equal('2399', data.stats.morebattedball[0].Pitches);
	     assert.equal('132', data.stats.morebattedball[9].Strikes);
	     done();
	   });
	 });

      it('should return an object with the win probability table as a property',
	 function(done) {
	   this.timeout(timeout);
	   var player = require('./player');
	   player.seasonStats(bonds_id).then(function(data) {
	     assert.equal('-0.03', data.stats.winprobability[0].WPA);
	     assert.equal('4.76', data.stats.winprobability[8]['WPA/LI']);
	     done();
	   });
	 });
    });
  });
});
