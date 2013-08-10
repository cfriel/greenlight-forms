Databases = new Meteor.Collection("databases");
Data = new Meteor.Collection("data");

Deps.autorun(function(){
    Meteor.subscribe("data");
    Meteor.subscribe("databases");    
});

Meteor.startup(function(){
});


var name = "forms";
var version = "1.0";

forms = function(){};

forms.prototype = new Greenlight.Package();

forms.prototype.routes = {

    '/forms': function(path)
    {
	return 'forms_page';
    },

    '/forms/:dataset' : function(dataset)
    {
	Session.set('forms_dataset', dataset);

	var dataset = Greenlight.Dataset.findOne({ name: dataset });

	if(dataset)
	{
	    Greenlight.Dataset.load(dataset);
	}

	return 'forms_page';
    },

    '/forms/:dataset/:id' : function(dataset, id)
    {
	Session.set('forms_dataset', dataset);
	Session.set('forms_id', id);

	return 'forms_item_page';
    }

};

forms.prototype.default_route = {

    '/' : function()
    {
	console.log("calling default route");

	return 'forms_page';
    }

};


Forms = forms.prototype;

console.log("loading forms package");

Greenlight.register_template(name, version, Forms);

