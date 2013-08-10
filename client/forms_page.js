Template.forms_page.datasets = function () {
    return Greenlight.Dataset.Datasets.find({}, {sort: {name: 1}});
};

Template.forms_page.root = function()
{
    return "/forms";
};

Template.forms_page.rendered = function()
{
};

Deps.autorun(function(){

    var datasetName = Session.get("forms_dataset");
    
    var dataset = Greenlight.Dataset.Datasets.findOne({name: datasetName});
    
    if(dataset)
    {
    
	var currentCollection = dataset.collection;
	
	var item = Data.findOne({ _collection : currentCollection });

	var select2 = $("#s").select2({
            minimumInputLength: 1,

            query: function (query) {

		var data = {results: []}, i, j, s;


		var count = 0;
		var limit = 10;

		if(item && query.term)
		{
		    var keys = Object.keys(item);
		    
		    for(var i = 0; i < keys.length; i++)
		    {
			if(count < limit)
			{
			    var q = {};
			    q[keys[i]] = { $regex : query.term + ".*", $options: 'i'}
			    q["_collection"] = currentCollection;
			    
			    var res = Data.find(q).fetch();
			    
			    for (var j = 0; j < res.length && count < limit; j++) {
		     		data.results.push( {id: res[j]._id, text: res[j][keys[i]]});
				count++;
			    }
			}
		    }

		    
		    query.callback(data);
		}
            }
	});
	
	$('#s').on("change", function(e) { 
	    console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
	    window.location.href = e.val;
	});
    }
});