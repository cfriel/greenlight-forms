Databases = new Meteor.Collection("databases");
Data = new Meteor.Collection("data");

Deps.autorun(function(){
    Meteor.subscribe("data");
    Meteor.subscribe("databases");    
});


Meteor.startup(function(){

    Data.remove();
    
});

var navigateTo = function(name)
{
    console.log("called navigateto with " + name);

    if(name)
    {
	Session.set("selected_collection", name);
	
	Meteor.call('refresh', Session.get("selected_collection"), 
    		    function(err, result)
    		    {
    		    }
    		   );
    }
}

Meteor.Router.add({
    '/forms/:name?': function(name)
    {
	navigateTo(name);
	return 'forms_page';
    }
});


Template.forms_page.databases = function () {
    return Databases.find({}, {sort: {name: 1}});
};

