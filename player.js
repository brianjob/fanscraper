var request = require('./requestq'),
    cheerio = require('cheerio');


var base_url = 'http://www.fangraphs.com';

var getName = function(bio_cell) {
  return bio_cell.find('strong').html();
};

var getLowerText = function(bio_cell) {
  return bio_cell.find('div:nth-of-type(3)').html();
};

var getDob = function(bio_cell) {
  var result = /\d{1,2}\/\d{1,2}\/\d{4}/.exec(getLowerText(bio_cell));
  if (result.length < 1) {
    throw new Error("Couldn't retrieve dob");
  }
  return result[0];
};

var getBats = function(bio_cell) {
  var result = /([LRB])\/[LRB]/.exec(getLowerText(bio_cell));
  if (result.length < 2) {
    throw new Error("Couldn't retrieve batting handedness");
  }
  return result[1];
};

var getThrows = function(bio_cell) {
  var result = /[LRB]\/([LRB])/.exec(getLowerText(bio_cell));
  if (result.length < 2) {
    throw new Error("Couldn't retrieve throwing handedness");
  }
  return result[1];
};

var getHeight = function(bio_cell) {
  var result =  /(\d-\d{1,2})\/\d{2,3}/.exec(getLowerText(bio_cell));
  if (result.length < 2) {
    throw new Error("Couldn't retrieve height");
  }
  return result[1];
};

var getWeight = function(bio_cell) {
  var result = /\d-\d{1,2}\/(\d{2,3})/.exec(getLowerText(bio_cell));
  if (result.length < 2) {
    throw new Error("Couldn't retrieve weight");
  }
  return result[1];
};

var getPosition = function(bio_cell) {
  var result = /position=((?:C|P|OF|1B|2B|3B|SS|DH)(\/(C|P|OF|1B|2B|3B|SS|DH))*)/
    .exec(getLowerText(bio_cell));
  if (result.length < 2) {
    throw new Error("Couldn't retrieve position");
  }
  return result[1];
};

var getDraft = function(bio_cell) {
  var pattern = /Drafted:.*?(\d{4})\s+([\w\s]*\w)\s-\sRound:\s*(\d*),\s*Pick:\s*(\d*),\s*Overall:\s*(\d*),\s*Team:\s*([\w\s]*\w)/;
  var result = pattern.exec(getLowerText(bio_cell));

  if (!result) {
    return null;
  }
  
  var draft = {
    year: result[1],
    draft: result[2],
    round: result[3],
    pick: result[4],
    overall: result[5],
    team: result[6]
  };
  
  return draft;
};

var contractHelper = function(pattern, bio_cell) {
  var result = pattern.exec(getLowerText(bio_cell));

  if (!result) {
    return null;
  }

  return {
    dollars: result[1],
    length: result[2],
    start_year: result[3],
    end_year: result[4] || result[3],
    option_years: result[5] || 0
  };
};

var getContract = function(bio_cell) {
  var pattern = /Contract:.*?(\$[\d\.]+M)\s+\/\s+(\d+)\sYears\s\((\d{4})(?:\s+-\s+(\d{4}))*\)(?:\s+\+\s+(\d{1,2})\s+Option Years)?/;
  return contractHelper(pattern, bio_cell);
};

var getExtension = function(bio_cell) {
  var pattern = /Extension:.*?(\$[\d\.]+M)\s+\/\s+(\d+)\sYears\s\((\d{4})(?:\s+-\s+(\d{4}))*\)(?:\s+\+\s+(\d{1,2})\s+Option Years)?/;
  return contractHelper(pattern, bio_cell);
};

var getBio = function($) {
  
  var bio_cell = $('#content table table td');

  return {
    name:      getName(bio_cell),
    dob:       getDob(bio_cell),
    bats:      getBats(bio_cell),
    throws:    getThrows(bio_cell),
    height:    getHeight(bio_cell),
    weight:    getWeight(bio_cell),
    position:  getPosition(bio_cell),
    draft:     getDraft(bio_cell),
    contract:  getContract(bio_cell),
    extension: getExtension(bio_cell)
  };
};

var tableToJson = function($, table) {
  var headers = [];

  $(table).find('th').each(function() {
    var text = $(this).text();
    headers.push(text);
  });

  var rows = [];
  $(table).find('tr').each(function() {
    var row = {};
    
    $(this).find('td').each(function(i) {
      row[headers[i]] = $(this).text();
    });

    if (Object.keys(row).length > 0) {
      rows.push(row);
    }
  });
  
  return rows;
};

module.exports.tableToJson = tableToJson;

var responseHandler = function(body) {
  var $ = cheerio.load(body);

  if ($("#content table").length < 1) {
    throw new Error('player not found');
  }

  var bio  = getBio($);
  var tables = $('.rgMasterTable');
  var titles = $('.br_stitle a:not([href^="http://"])');
  var stats = {};

  tables.toArray().forEach(function(elt, i) {
    stats[titles[i].attribs.name] = tableToJson($, elt);
  });

  var ret = {
    name      : bio.name,
    dob       : bio.dob,
    bats      : bio.bats,
    throws    : bio.throws,
    height    : bio.height,
    weight    : bio.weight,
    position  : bio.position,
    draft     : bio.draft,
    contract  : bio.contract,
    extension : bio.extension,
    stats     : stats
  };

  return ret;
};

module.exports.seasonStats = function(pid) {
  return request(base_url + '/statss.aspx?playerid=' + pid)
    .then(function(response) {
      return responseHandler(response.body);
    }, function() {
      console.error('ERROR:' + pid + ' not found');
      return null;
    }).catch(function(err) {
      console.error('ERROR: ' + err.message);
      return null;
    });
};
