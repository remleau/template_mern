const mode = process.env.MODE; // 'local' or 'stage' or 'prod'

const local = {
  db: {
    host: process.env.LOCAL_DB_HOST,
    port: parseInt(process.env.LOCAL_DB_PORT),
    name: process.env.LOCAL_DB_NAME,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD
  }
};

const stage = {
  db: {
    host: process.env.STAGE_DB_HOST,
    port: parseInt(process.env.STAGE_DB_PORT),
    name: process.env.STAGE_DB_NAME,
    user: process.env.STAGE_DB_USER,
    password: process.env.STAGE_DB_PASSWORD
  }
};

const prod = {
  db: {
    host: process.env.PROD_DB_HOST,
    port: parseInt(process.env.PROD_DB_PORT),
    name: process.env.PROD_DB_NAME,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD
  }
};

const common = {
  jwt_secret: process.env.JWT_SECRET
}

const config = {
  local,
  stage,
  prod
};

module.exports = {
  ...config[mode],
  ...common
};