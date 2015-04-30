module.exports = function(config){
    config.set({

        basePath : './client',

        files : [],

        systemjs: {
            files: [
                'components/angular/angular.js',
                'components/angular-ui-router/release/angular-ui-router.js',
                'components/angular-mocks/angular-mocks.js',
                'client/ext/plugin-text/text.js',
                'app/*/**/*.js',
                'app/*/**/*.html'
            ],

            // Point out where the SystemJS config file is
            configFile: 'system.config.js',

            // Add any additional configuration, such as mappings to modules only used in testing
            config: {
                transpiler: 'babel',
                paths: {
                    'babel': 'ext/babel-core/browser.js',
                    'angular-mocks': 'components/angular-mocks/angular-mocks.js',
                    'angular': 'components/angular/angular.js',
                    'text': 'ext/plugin-text/text.js'
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
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};