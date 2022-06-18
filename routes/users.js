var express = require('express');
var router = express.Router();
var _ = require('lodash');
var logger = require('../lib/logger');
var log = logger();

var users = require('../init_data.json').feeds;
var curId = _.size(users); // not needed prob

/* GET users listing. */
router.get('/', async function (req, res) {
  try {
    const {order, titleSort, descriptSort, nameSort} = req.query; 

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let usersArr = _.toArray(users);

    if(nameSort){
      usersArr = sortFind(usersArr, 'name', nameSort.toLowerCase());
      usersArr = orderSort(usersArr, 'name', order);
    } 
    if(titleSort){
      usersArr = sortFind(usersArr, 'title', titleSort.toLowerCase());
      usersArr = orderSort(usersArr, 'title', order);
    } 
    if(descriptSort){
      usersArr = sortFind(usersArr, 'description', descriptSort.toLowerCase());
      usersArr = orderSort(usersArr, 'description', order);
    } 

    const totalResults = usersArr.length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const data = {};
    data.totalResults = totalResults;

    if (endIndex < usersArr.length) {
      data.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      data.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    data.results = usersArr.slice(startIndex, endIndex)
    res.json(data);
  } catch (error) {
    res.sendStatus(500);
  }
});



/** Takes array and sorts it by string criteria
 */
const sortFind = (arr, filter, search) => {
  //add sorts by title
  return arr.filter(e => e[filter].includes(search));
}

const orderSort = (arr, filter, order = 'asc') => {
  const alphabetize = (a,b, filter) => {
    // Use toUpperCase() to ignore character casing
    const varA = a[filter].toUpperCase();
    const varB = b[filter].toUpperCase();
  
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return comparison;
  }

  if(order === 'desc'){
    return arr.sort((a,b) => alphabetize(a,b,filter)).reverse();
  }else{
    return arr.sort((a,b) => alphabetize(a,b,filter));
  }
}

module.exports = router;
