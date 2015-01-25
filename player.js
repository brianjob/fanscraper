var request = require('./requestq'),
    cheerio = require('cheerio');


var base_url = 'http://www.fangraphs.com';

var seasonStats = module.exports.seasonStats = function(pid) {
  return request(base_url + '/statss.aspx?playerid=' + pid)
    .then(function(response) {
      return responseHandler(response.body);
    }, function(err) {
      console.error('error:' + pid + ' not found');
      return null;
    }).catch(function(err) {
      console.error('error: ' + err.message);
      return null;
    });
};

var responseHandler = function(body) {
  var $ = cheerio.load(body);

  if ($("#content table").length < 1) {
    throw new Error('player not found');
  }

  var bio  = getBio($);
  return {
    name                   : bio.name,
    dob                    : bio.dob,
    bats                   : bio.bats,
    throws                 : bio.throws,
    height                 : bio.height,
    weight                 : bio.weight,
    position               : bio.position,
    draft                  : bio.draft,
    contract               : bio.contract,
    dashboard              : getDashboard($),
    standard               : getStandard($),
    advanced               : getAdvanced($),
    battedBall             : getBattedBall($),
    moreBattedBall         : getMoreBattedBall($),
    winProbability         : getWinProbability($),
    pitchType              : getPitchType($),
    pitchFxType            : getPitchFxType($),
    pitchFxVelocity        : getPitchFxVelocity($),
    pitchValues            : getPitchValues($),
    pitchFxValues          : getPitchFxValues($),
    pitchFxValuesPer100    : getPitchFxValuesPer100($),
    plateDiscipline        : getPlateDiscipline($),
    pitchFxPlateDiscipline : getPitchFxPlateDiscipline($),
    fielding               : getFielding($),
    advancedFielding       : getAdvancedFielding($),
    insideEdgeFielding     : getInsideEdgeFielding($),
    value                  : getValue($),
  };
};

var getBio = function($) {
  
  var bio_cell = $('#content table table td');

  return {
    name: getName(bio_cell),
    dob: getDob(bio_cell),
    bats: getBats(bio_cell),
    throws: getThrows(bio_cell),
    height: getHeight(bio_cell),
    weight: getWeight(bio_cell),
    position: getPosition(bio_cell),
    draft: getDraft(bio_cell),
    contract: getContract(bio_cell)
  };
};

var getName = function(bio_cell) {
  return bio_cell.find('strong').html();
};

var getLowerText = function(bio_cell) {
  return bio_cell.find('div:nth-of-type(3)').html();
};

var getDob = function(bio_cell) {
  return /\d{1,2}\/\d{1,2}\/\d{4}/
    .exec(getLowerText(bio_cell))[0];
};

var getBats = function(bio_cell) {
  return /([LRB])\/[LRB]/.exec(getLowerText(bio_cell))[1];
};

var getThrows = function(bio_cell) {
  return /[LRB]\/([LRB])/.exec(getLowerText(bio_cell))[1];
};

var getHeight = function(bio_cell) {
  return /(\d-\d{1,2})\/\d{2,3}/.exec(getLowerText(bio_cell))[1];
};

var getWeight = function(bio_cell) {
  return /\d-\d{1,2}\/(\d{2,3})/.exec(getLowerText(bio_cell))[1];
};

var getPosition = function(bio_cell) {
  
};

var getDraft = function(bio_cell) {

};

var getContract = function(bio_cell) {

};

var getDashboard = function($) {

};
             
var getStandard = function($) {

};
              
var getAdvanced = function($) {

};
              
var getBattedBall = function($) {

};
            
var getMoreBattedBall = function($) {

};
        
var getWinProbability = function($) {

};
               
var getPitchType = function($) {

};
             
var getPitchFxType = function($) {

};
           
var getPitchFxVelocity = function($) {

};
       
var getPitchValues = function($) {

};
           
var getPitchFxValues = function($) {

};
         
var getPitchFxValuesPer100 = function($) {

};
   
var getPlateDiscipline = function($) {

};
       
var getPitchFxPlateDiscipline = function($) {

};

var getFielding = function($) {

};
              
var getAdvancedFielding = function($) {

};
      
var getInsideEdgeFielding = function($) {

};
    
var getValue = function($) {

};
