
var name = "forms";
var version = "1.0";

forms = function(obj)
{
    if(obj)
    {
	this.init(obj);
    }
};

forms.prototype = new Greenlight.Package();
forms.prototype.constructor = forms;

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

Greenlight.Packages.Forms = forms.prototype;

Meteor.startup(function(){

    console.log("loading forms package");
    
    Greenlight.register_package(name, version, Greenlight.Packages.Forms);

});
