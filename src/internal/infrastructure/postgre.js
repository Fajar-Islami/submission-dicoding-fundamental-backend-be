const { Pool } = require('pg');
const CONFIG = require('../config/config');

module.exports = {
  DBCONFIG: new Pool({
    max: CONFIG.PGMAXPOOL || 10,
    min: CONFIG.PGMINPOOL || 2,
  }),
};
