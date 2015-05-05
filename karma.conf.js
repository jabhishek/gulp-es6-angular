module.exports = function(config){
    config.set({

        basePath : './',

        files : [],

        /*logLevel: 'LOG_WARN',*/

        systemjs: {
            files: [
                'client/components/angular/angular.js',
                'client/components/angular-mocks/angular-mocks.js',
                'client/ext/plugin-text/text.js',
                'client/app/*/**/*.js',
                'client/app/*/**/*.html'
            ],

            // Point out where the SystemJS config file is
            /*configFile: 'client/system.config.js',*/

            // Add any additional configuration, such as mappings to modules only used in testing
            config: {
                baseURL: "/",
                transpiler: 'babel',
                paths: {
                    'babel': 'client/ext/babel-core/browser.js',
                    'angular-mocks': 'client/components/angular-mocks/angular-mocks.js'
                },
                meta: {
                    'client/components/angular/angular': {format: 'global', exports: 'angular'}
                },
                map: {
                    'angular': 'client/components/angular/angular',
                    'text': 'client/ext/plugin-text/text'
                }
            }
        },

        autoWatch : true,

        frameworks: ['systemjs', 'jasmine'],

        browsers : ['Chrome'],

        plugins : ['karma-systemjs',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
        ]
    });
};