Package.describe({
  summary: "greenlight forms site template"
});

Npm.depends({mongodb: "1.3.4"});

Package.on_use(function (api, where) {
    api.use('router', ['client', 'server']);
    api.use(['templating'], 'client');
    api.add_files(['client/forms.html','client/forms.js'], 'client' );
    api.add_files('server/forms.js', 'server' );
});

Package.on_test(function (api) {
    api.add_files('forms_tests.js', 'client');
});
