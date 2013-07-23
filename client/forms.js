Databases = new Meteor.Collection("databases");
Data = new Meteor.Collection("data");

Deps.autorun(function(){
    Meteor.subscribe("data");
    Meteor.subscribe("databases");    
});


Meteor.startup(function(){

    Data.remove();
    
});

var navigateToItem = function(collection, id)
{
    console.log("called navigateto with " + collection + ", " + id);

    if(collection)
    {
	Session.set("selected_collection", collection);
	Session.set("selected_item", id);
	
	Meteor.call('refresh', Session.get("selected_collection"), 
    		    function(err, result)
    		    {
    		    }
    		   );
    }
}

var navigateToCollection = function(collection)
{
    console.log("called navigateto with " + collection);

    if(collection)
    {
	Session.set("selected_collection", collection);
	
	Meteor.call('refresh', Session.get("selected_collection"), 
    		    function(err, result)
    		    {
    		    }
    		   );
    }
}

Meteor.Router.add({
    '/forms*': function(path)
    {
	if(path.length == 0)
	{
	}
	else
	{
	    if(path.substring(0,1) == "/")
	    {
		path = path.substring(1, path.length);
	    }

	    var splits = path.split("/");

	    if(splits.length == 1)
	    {
		var collection = splits[0];
		
		navigateToCollection(collection);
	    }
	    else if(splits.length == 2)
	    {
		var collection = splits[0];
		var id = splits[1];

		if(id == "")
		{
		    navigateToCollection(collection);
		}
		else
		{
		    navigateToItem(collection, id);
		    
		    return 'forms_item_page';
		}
	    }

	}
	
	return 'forms_page';
    }
});


Template.forms_page.databases = function () {
    return Databases.find({}, {sort: {name: 1}});
};

