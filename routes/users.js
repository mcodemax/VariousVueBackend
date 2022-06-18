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
    const filter = req.query.filter;
    const {order, titleSort, descriptSort, nameSort} = req.query; 
    console.log(nameSort)
    //order is asc or desc

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let usersArr = _.toArray(users);

    if(nameSort) usersArr = sortFind(usersArr, 'name', nameSort.toLowerCase());
    if(titleSort) usersArr = sortFind(usersArr, 'title', titleSort.toLowerCase());
    if(descriptSort) usersArr = sortFind(usersArr, 'description', descriptSort.toLowerCase());

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


module.exports = router;
