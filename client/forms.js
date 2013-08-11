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

forms = function(obj)
{
    console.log("foo");
    if(obj)
    {
	this.init(obj);
    }
};

forms.prototype = new Greenlight.Package();
forms.prototype.constructor = forms;

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

forms.prototype.instantiate = function(site)
{    
    var url = site.url;

    if(url)
    {
	var siteRoutes = function(site)
	{
	    var root = '/'+site.url;

	    var roots = {};

	    roots[root] = function(path){

		Session.set('site', site);
		
		return 'forms_page';
	    };
		
	    roots[root+'/:dataset'] = function(dataset){
		
		Session.set('site', site);
		Session.set('forms_dataset', dataset);
		    
		var dataset = Greenlight.Dataset.findOne({ name: dataset });
		
		if(dataset)
		{
		    Greenlight.Dataset.load(dataset);
		}
		
		return 'forms_page';
	    };
		
	    roots[root+'/:dataset/:id'] =function(dataset, id){

		Session.set('site', site);
		Session.set('forms_dataset', dataset);
		Session.set('forms_id', id);
		
		return 'forms_item_page';
	    };

	    return roots;

	}(site);
	    
	Meteor.Router.add(siteRoutes);
    }
};

forms.prototype.default_route = {

    '/' : function()
    {
	console.log("calling default route");

	return 'forms_page';
    }

};


Greenlight.Packages.Forms = forms.prototype;

Meteor.startup(function(){

    console.log("loading forms package");
    
    Greenlight.register_package(name, version, Greenlight.Packages.Forms);

});
