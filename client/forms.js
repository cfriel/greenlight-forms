console.log("forms loaded");

Meteor.Router.add({
    '/forms': 'forms_page'
});

Databases = new Meteor.Collection("databases");

var databasesHandle = Meteor.subscribe('databases', function () {
});

Template.forms_page.databases = function () {
  return Databases.find({}, {sort: {name: 1}});
};