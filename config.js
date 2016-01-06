/**
 * Created by sridharrajs on 1/6/16.
 */

let fs = require('fs');

const CONFIGURATIONS = JSON.parse(fs.readFileSync('./configuration.json', 'utf-8'));

class Config{

	static init(HOST_ENVIRONMENT){
		let settings = CONFIGURATIONS[HOST_ENVIRONMENT];
		this.port = settings.port;
		this.secure = settings.secure;
		this.mongdbUrl = settings.mongodb_url;
	}

}

module.exports = Config;