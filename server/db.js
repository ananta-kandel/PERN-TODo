const Pool = require("pg").Pool;
 
const pool = new Pool({
  host:"localhost",
  user: 'anantakandel',
  PORT:5432,
  database:"todopern",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

module.exports =  pool;