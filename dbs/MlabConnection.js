const MongoClient = require('mongodb').MongoClient;

const URL = "";

function connect(url){
    return MongoClient.connect(url).then(client => client.db());
}

module.exports = async function(){
    //Promise.all(connect(URL)); // Could resolve multiple dbs - for prod and dev
    let database = await Promise.resolve(connect(URL));
    return {
        database:database
    }
}