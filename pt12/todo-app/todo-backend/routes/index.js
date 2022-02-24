const express = require('express');
const { getAsync }  = require('../redis')
const router = express.Router();

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  const counter = await getAsync('added_todos')
  res.json({"added_todos": counter || 0})
})

module.exports = router;
