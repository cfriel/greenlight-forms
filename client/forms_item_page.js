Template.forms_item_page.databases = function () {
    return Databases.find({}, {sort: {name: 1}});
};

Template.forms_item_page.key = function()
{
    return Session.get("selected_item");
}

Template.forms_item_page.keys = function()
{
    var self = this;
    
    var keys = Object.keys(self);
    
    for(var i = 0; i < keys.length; i++)
    {
	keys[i] = { "name" : keys[i], "value" : self[keys[i]] };
    }

    return keys;
}

Template.forms_item_page.items = function()
{
    var selectedId = Session.get("selected_id");

    console.log("loading " + selectedId);

    if(Data.find({_id : selectedId }).fetch().length != 0)
    {
	return Data.find({_id : selectedId });
    }
    else
    {
	return Data.find({_id : Meteor.Collection.ObjectID(selectedId) });
    }
}