require('dotenv').config();

module.exports = {

	dashboard_route: function(){
		return '/dashboard';
	},

	database_prefix: function(){
		return 'kp_';
	},

	database_config: function(){
		let config = {};
		switch(process.env.NODE_ENV){
			case 'prod':
				config = {
					host: process.env.PROD_DB_HOST,
					database: process.env.PROD_DB_NAME,
					user: process.env.PROD_DB_USERNAME,
					password: process.env.PROD_DB_PASS
				}
				break;
			case 'dev':
				config = {
					host: process.env.DEV_DB_HOST,
					database: process.env.DEV_DB_NAME,
					user:  process.env.DEV_DB_USERNAME,
					password: process.env.DEV_DB_PASS
				}
				break;
			case 'stag':
				config = {
					host: process.env.STAG_DB_HOST,
					database: process.env.STAG_DB_NAME,
					user:  process.env.STAG_DB_USERNAME,
					password: process.env.STAG_DB_PASS
				}			
				break;
		}
		console.log(process.env.NODE_ENV);
		return config;
	},

	saltRounds: 10,
	
};