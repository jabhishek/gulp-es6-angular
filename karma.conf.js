module.exports = function(config){
    config.set({

        basePath : './',

        files : ['client/bower_components/angular/angular.js',
                'client/bower_components/angular-animate/angular-animate.js',
                'client/bower_components/angular-aria/angular-aria.js',
                'client/bower_components/angular-material/angular-material.js',
                'client/bower_components/angular-touch/angular-touch.js',
                'client/bower_components/angular-local-storage/dist/angular-local-storage.js',
                'client/bower_components/angular-ui-router/release/angular-ui-router.js'],

        /*logLevel: 'LOG_WARN',*/

        systemjs: {
            files: [
                'client/bower_components/angular-mocks/angular-mocks.js',
                'client/ext/plugin-text/text.js',
                'client/app/*/**/*.js',
                'client/app/*/**/*.html'
            ],

            // Point out where the SystemJS config file is
            configFile: 'client/system.config.js',

            // Add any additional configuration, such as mappings to modules only used in testing
            config: {
                baseURL: "/client/",
                transpiler: 'babel',
                paths: {
                    'babel': 'ext/babel-core/browser.js',
                    'angular-mocks': 'bower_components/angular-mocks/angular-mocks.js'
                }
            }
        },

        autoWatch : true,

        frameworks: ['systemjs', 'jasmine'],

        browsers : ['PhantomJS'],

        plugins : ['karma-systemjs',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
        ]
    });
};