Package.describe({
  summary: "greenlight forms site template"
});

Npm.depends({mongodb: "1.3.4"});

Package.on_use(function (api, where) {
    api.use('router', ['client', 'server']);
    api.use(['templating'], 'client');
    api.use('deps', ['client', 'server']);
    api.use('session', ['client', 'server']);
    api.use('greenlight', ['client','server']);

    api.add_files(['client/forms_data_browser_list_item.html', 'client/forms_data_browser_list_item.js'], 'client');
    api.add_files(['client/forms_data_browser.html', 'client/forms_data_browser.css','client/forms_data_browser.js'], 'client');
    api.add_files(['client/forms_page.html','client/forms_page.js', 'client/forms_page.css'], 'client' );
    api.add_files(['client/forms_item_page.html', 'client/forms_item_page.css', 'client/forms_item_page.js'], 'client');

    api.add_files('client/forms.js', 'client' );
    api.add_files('server/forms.js', 'server' );
});

Package.on_test(function (api) {
    api.add_files('forms_tests.js', 'client');
});
