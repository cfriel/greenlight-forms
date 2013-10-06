var name = "forms";
var version = "1.0";

forms = function(){};

forms.prototype = new forms();

forms.prototype.metadata = function()
{
    
    return {
	description : "The forms package provides functionality to view datasets in a generic forms browser, where any item can be individually viewed or edited.  Users can also create new instances of items based on the inferred template for the dataset."
    };
}();


Greenlight.Packages.Forms = forms.prototype;

Meteor.startup(function () {

    console.log("loading forms package");
    
    Greenlight.register_package(name, version, Greenlight.Packages.Forms);    

});

