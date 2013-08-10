Template.forms_data_browser.results = function () 
{    
    Pagination.perPage(50);

    Session.set("data_browser_page", 1);
    Pagination.currentPage(Session.get("data_browser_page"));

    var datasetName = Session.get("forms_dataset");
    
    var dataset = Greenlight.Datasets.findOne({name: datasetName});
    
    if(dataset)
    {    
	var collection = dataset.collection;	
	
	return Pagination.collection(Data.find({ _collection: collection }).fetch());
    }
}

Template.forms_data_browser.pagination = function(){
    
    Pagination.perPage(50);

    Session.set("data_browser_page", 1);
    Pagination.currentPage(Session.get("data_browser_page"));

    var datasetName = Session.get("forms_dataset");
    
    var dataset = Greenlight.Datasets.findOne({name: datasetName});
    
    if(dataset)
    {    
	var collection = dataset.collection;

	var numRecords = Data.find({_collection : collection}).count();

	if(numRecords != 0)
	{
	    return Pagination.links("/create/collection", numRecords);
	}
    }
}
