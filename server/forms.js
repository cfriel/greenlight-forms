var name = "forms";
var version = "1.0";

Meteor.startup(function () {

    console.log("loading forms package");
    
    Greenlight.register_template(name, version);
    
});

