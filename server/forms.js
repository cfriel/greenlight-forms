var name = "forms";
var version = "1.0";

forms = function(){};

forms.prototype = new forms();

Forms = forms.prototype;

Meteor.startup(function () {

    console.log("loading forms package");
    
    Greenlight.register_template(name, version, Forms);    

});

