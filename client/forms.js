Databases = new Meteor.Collection("databases");
Data = new Meteor.Collection("data");

Deps.autorun(function(){
    Meteor.subscribe("data");
    Meteor.subscribe("databases");    
});

Meteor.startup(function(){
});

Template.forms_page.databases = function () {
    return Databases.find({}, {sort: {name: 1}});
};

Template.forms_page.rendered = function()
{
    var select2 = $("#s").select2({
        minimumInputLength: 1,

        query: function (query) {

            var data = {results: []}, i, j, s;

	    var res = Data.find({ Surname : { $regex : query.term + ".*", $options: 'i' } }).fetch();

            for (var i = 0; i < res.length; i++) {
                data.results.push( {id: res[i]._id, text: res[i].Surname});
            }

            query.callback(data);
        }
    });

    $('#s').on("change", function(e) { 
	console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
	window.location.href = e.val;
    });
}

var ensureLoadDatabases = function()
{
    var databasesLoaded = Session.get("databases_loaded");

    if(!databasesLoaded)
    {
	loadDatabases();
    }
}

var loadDatabases = function()
{
    Meteor.call('databases', function(err, result)
		{
		    if(err)
		    {
			console.log("Failed to load databases");
		    }
		    else
		    {
			Session.set("databases_loaded", true);
		    }
		});
    
};

var loadCollection = function(database, collection)
{
    Meteor.call('load', database, collection, {}, 0, 100, 
		function(err, result)
		{
		});
};

var loadItem = function(database, collection, id)
{
    Meteor.call('item', database, collection, id, 
		function(err, result)
		{
		});
};

Meteor.Router.add({
    
    '/forms': function(path)
    {
	ensureLoadDatabases();

	return 'forms_page';
    },

    '/forms/:database/:collection' : function(database, collection)
    {
	Session.set('selected_database', database);
	Session.set('selected_collection', collection);

	ensureLoadDatabases();
	loadCollection(database, collection);

	return 'forms_page';
    },

    '/forms/:database/:collection/:id' : function(database, collection, id)
    {
	Session.set('selected_database', database);
	Session.set('selected_collection', collection);
	Session.set('selected_id', id);

	ensureLoadDatabases();
	loadItem(database, collection, id);

	return 'forms_item_page';
    }
    
});