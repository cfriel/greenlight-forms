Template.forms_data_browser.results = function () 
{    
    Pagination.perPage(50);

    Session.set("data_browser_page", 1);
    Pagination.currentPage(Session.get("data_browser_page"));

    var collection = Session.get("selected_collection");

    return Pagination.collection(Data.find({ _collection: collection }).fetch());
}

Template.forms_data_browser.pagination = function(){
    
    Pagination.perPage(50);

    Session.set("data_browser_page", 1);
    Pagination.currentPage(Session.get("data_browser_page"));

    var collection = Session.get("selected_collection");
    
    var numRecords = Data.find({_collection : collection}).count();

    if(numRecords != 0)
    {
	return Pagination.links("/create/collection", numRecords);
    }
}

Template.forms_data_browser.selected_collection = function()
{
    return Session.get("selected_collection");
}
