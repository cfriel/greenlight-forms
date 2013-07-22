Databases = new Meteor.Collection("databases");
Data = new Meteor.Collection("data");

Meteor.startup(function(){

    Data.remove();
    
});

Meteor.Router.add({
    '/forms': 'forms_page'
});


var databasesHandle = Meteor.subscribe('databases', function () {
});

Template.forms_page.databases = function () {
    return Databases.find({}, {sort: {name: 1}});
};

Deps.autorun(function(){

    var databases = Databases.find({}, {sort: {name: 1}});

    if(databases)
    {
	Routes = {};

	Routes['/forms'] = 'forms_page';

	databases.forEach(function(database){

	    var route = "/forms/" + database.name;

	    console.log("Adding route " + route);

	    Routes[route] = function() 
	    {
		console.log(database.name);
		return "forms_page";
	    };

	    for(var i = 0; i < database.collections.length; i++)
	    {
		var subRoute = "/forms/" + database.collections[i].name;

		var name = database.collections[i].name;

		console.log("Adding route " + subRoute);

		var f = function(name){
		    return function()
		    {
			console.log(name);
			Session.set("selected_collection", name);
			
			Meteor.call('refresh', Session.get("selected_collection"), 
    				    function(err, result)
    				    {
    				    }
    				   );
			
			return "forms_page";
		    }
		};
		
		Routes[subRoute] = f(name);
	    }
	});

	Meteor.Router.add(Routes);
    }
});

