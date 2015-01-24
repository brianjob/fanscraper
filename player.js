var request = require('request-promise'),
    cheerio = require('cheerio');


var base_url = 'http://www.fangraphs.com';

var seasonStats = module.exports.seasonStats = function(pid) {
  return request(base_url + '/statss.aspx?playerid=' + pid)
  .then(function(response) {
    return responseHandler(response);
  }, function(err) {
    console.log('player: ' + pid + ' not found');
    return null;
  });
};

var responseHandler = function(body) {
  var $                      = cheerio.load(body);
  var bio                    = getBio($);
  var dashboard              = getDashboard($);
  var standard               = getStandard($);
  var advanced               = getAdvanced($);
  var battedBall             = getBattedBall($);
  var moreBattedBall         = getMoreBattedBall($);
  var winProb                = getWinProbability($);
  var pitchType              = getPitchType($);
  var pitchFxType            = getPitchFxType($);
  var pitchFxVelocity        = getPitchFxVelocity($);
  var pitchValues            = getPitchValues($);
  var pitchFxValues          = getPitchFxValues($);
  var pitchFxValuesPer100    = getPitchFxValuesPer100($);
  var plateDiscipline        = getPlateDiscipline($);
  var pitchFxPlateDiscipline = getpitchFxPlateDiscipline($);
  var fielding               = getFielding($);
  var advancedFielding       = getAdvancedFielding($);
  var insideEdgeFielding     = getInsideEdgeFielding($);
  var value                  = getValue($);
};

var bio = function($) {

};
var dashboard = function($) {

};
             
var standard = function($) {

};
              
var advanced = function($) {

};
              
var battedBall = function($) {

};
            
var moreBattedBall = function($) {

};
        
var winProb = function($) {

};
               
var pitchType = function($) {

};
             
var pitchFxType = function($) {

};
           
var pitchFxVelocity = function($) {

};
       
var pitchValues = function($) {

};
           
var pitchFxValues = function($) {

};
         
var pitchFxValuesPer100 = function($) {

};
   
var plateDiscipline = function($) {

};
       
var pitchFxPlateDiscipline = function($) {

};

var fielding = function($) {

};
              
var advancedFielding = function($) {

};
      
var insideEdgeFielding = function($) {

};
    
var value = function($) {

};
