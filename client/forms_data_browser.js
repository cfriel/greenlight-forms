Template.forms_data_browser.results = function () {
    Pagination.perPage(10);
    Session.set("collection_list_page", 1);
    Pagination.currentPage(Session.get("collection_list_page"));
 
    return Data.find({});
}

Template.forms_data_browser.pagination = function(){
    Pagination.perPage(10);
    Session.set("collection_list_page", 1);
    Pagination.currentPage(Session.get("collection_list_page"));
    var numRecords = Data.find({}).count();

    if(numRecords != 0)
    {
	return Pagination.links("/create/collection", numRecords);
    }
}

Template.forms_data_browser.selected_collection = function()
{
    return Session.get("selected_collection");
}
