console.log("loading forms template");

var Fiber = Npm.require('fibers');

Meteor.startup(function () {

    Databases = new Meteor.Collection("databases");

    Databases.remove({});

    var mongo = Npm.require('mongodb');
    
    var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    
    var server = new Server('localhost', 27017, {auto_reconnect: true});
    
    var MongoClient = mongo.MongoClient;    
    
    MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, db) {
	if(err) throw err;
	
	db.executeDbCommand({'listDatabases':1}, function(err, doc) { 
	    var databases = doc.documents[0].databases;
	    
	    for(var i = 0; i < databases.length; i++){
		Fiber(function(){
		    console.log(databases[i]);
		    Databases.insert(databases[i]);
		}).run();
	    }
	});    
    });	   
});
	     