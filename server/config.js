const mode = process.env.MODE; // 'local' or 'stage' or 'prod'

const local = {
  db: {
    host: process.env.LOCAL_DB_HOST,
    port: parseInt(process.env.LOCAL_DB_PORT),
    name: process.env.LOCAL_DB_NAME
  }
};

const stage = {
  db: {
    host: process.env.STAGE_DB_HOST,
    port: parseInt(process.env.STAGE_DB_PORT),
    name: process.env.STAGE_DB_NAME
  }
};

const prod = {
  db: {
    host: process.env.PROD_DB_HOST,
    port: parseInt(process.env.PROD_DB_PORT),
    name: process.env.PROD_DB_NAME
  }
};

const config = {
  local,
  stage,
  prod
};

module.exports = config[mode];