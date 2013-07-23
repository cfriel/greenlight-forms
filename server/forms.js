Meteor.startup(function () {

    Databases = new Meteor.Collection("databases");

    Databases.remove({});

    Meteor.publish("databases", function(){
	return Databases.find();
    });

    var mongo = Npm.require('mongodb');
    var Fiber = Npm.require('fibers');
    
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
		
		var databaseParam = databases[i];
		//console.log(databaseParam.name);

		Fiber(function(database){
		    
		    var collections = Meteor.sync(function(done){
			
			MongoClient.connect('mongodb://127.0.0.1:27017/'+database.name, function(err, child) {
			    
			    if(err) throw err;
			    
			    child.collectionNames(function(err, collections){			    
				done(err,collections);
			    });
			});
		    });
		    
		    database.collections = collections.result;
		    
		    //console.log(database);
		    Databases.insert(database);
		}).run(databaseParam);
	    }
	});
    });
    
    Data = new Meteor.Collection("data");

    Data.remove();

    Meteor.publish("data", function(){
	return Data.find();
    });
    
});

Meteor.methods({
  refresh: function (coll) 
    {
	if(coll)
	{
	    Data.remove({});

	    console.log("calling refresh with " + coll);

	    var parts = coll.split(".");

	    var database = parts[0];
	    var collection = parts[1];
	    
	    var mongo = Npm.require('mongodb');
	    var Fiber = Npm.require('fibers');
	    
	    var Server = mongo.Server,
	    Db = mongo.Db,
	    BSON = mongo.BSONPure;
	    
	    var MongoClient = mongo.MongoClient;    
	    
	    Fiber(function(params){

		var database = params[0];
		var collection = params[1];
		
		var res = Meteor.sync(function(done){
		    MongoClient.connect('mongodb://127.0.0.1:27017/'+database, function(err, db) {
			if(err) throw err;
			
			db.collection(collection)
			    .find({})
			    .limit(10)
			    .toArray(function(err, docs) {
				done(err, docs);
			    });
		    });
		});
		
		if(res.error)
		{
		    throw new Meteor.Error(401, res.error.message);
		}
		else
		{
		    console.log("Inserting " + res.result.length + " records");
		    //console.log(res.result);
		    for(var i = 0; i < res.result.length; i++)
		    {
			res.result[i]._id = "" + res.result[i]._id;
			console.log(res.result[i]._id);
			Data.insert(res.result[i]);
		    }
		}
	    }).run([database, collection]);
	}
    }
});
