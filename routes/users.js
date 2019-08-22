var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', (req, res, next) => {
  console.log(req.body);

  res.json(util.SuccessResponse({}));
});

module.exports = router;
