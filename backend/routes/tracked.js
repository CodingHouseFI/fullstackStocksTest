var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  fs.readFile('tracked.json', function(err, dataBuffer) {
    var data = JSON.parse(dataBuffer);
    res.send(data.tracked);
  });
});

router.post('/', function(req, res, next) {
  fs.readFile('tracked.json', function(err, dataBuffer) {
    //this is turns our JSON into an object
    var data = JSON.parse(dataBuffer);
    data.tracked.push(req.body.newSymbol);

    fs.writeFile('tracked.json', JSON.stringify(data), function(error){
      res.send(data.tracked);
    });
  });
})
//push data to json file

module.exports = router;
