Template.forms_data_browser_list_item.summary = function()
{
    var self = this;
    
    var keys = Object.keys(self);
    
    var res = "";

    for(var i = 0; i < keys.length; i++)
    {
	res = res + "," + self[keys[i]];
    }

    return res;


}