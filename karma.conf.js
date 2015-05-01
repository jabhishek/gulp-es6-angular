module.exports = function(config){
    config.set({

        basePath : './',

        files : [],

        /*logLevel: 'LOG_WARN',*/

        systemjs: {
            files: [
                'client/app/*/**/*.js'
            ],

            // Point out where the SystemJS config file is
            configFile: 'client/system.config.js',

            // Add any additional configuration, such as mappings to modules only used in testing
            config: {
                baseURL: "/",
                transpiler: 'babel',
                paths: {
                    'babel': 'client/ext/babel-core/browser.js'
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