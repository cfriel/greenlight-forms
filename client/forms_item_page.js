Template.forms_item_page.rendered = function()
{
    var self = this;

    $(".item-key-value").click(function(){
	var td = $(this).parent();
	$('.item-key-value-edit', td).show();
	$('.item-key-value', td).hide();
	$('.item-key-value-edit', td).focus();
    });

    $(".item-key-value-edit").blur(function(){
	var td = $(this).parent();
	$('.item-key-value-edit', td).hide();
	$('.item-key-value', td).show();
	$('.item-key-value', td).text($('.item-key-value-edit', td).val());
	
    });
};

Template.forms_item_page.root = function()
{
   var site = Session.get('site');
    
    if(site)
    {
	return '/'+site.url;
    }
    else
    {
	return "/forms";
    }
};



Template.forms_item_page.datasets = function () 
{
    var site = Session.get('site');

    if(site)
    {
	return Greenlight.Datasets.find({_id : {$in : site.collections}}, {sort: {name: 1}});
    }
}

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
    var selectedId = Session.get("forms_id");

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