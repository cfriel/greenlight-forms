Meteor.startup(function () {

    Databases = new Meteor.Collection("databases");

    Databases.remove({});

    Meteor.publish("databases", function(){
	return Databases.find();
    });

    Data = new Meteor.Collection("data");

    Data.remove();

    Meteor.publish("data", function(){
	return Data.find();
    });
    
});

