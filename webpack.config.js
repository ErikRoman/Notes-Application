const path = require( 'path' )


module.exports = {
    entry: {
        index: [ 'babel-polyfill', './Source/index.js' ],
        edit: [ 'babel-polyfill', './Source/edit.js' ]
    },

    output: {
        path: path.resolve( __dirname, 'Public/Scripts' ),
        filename: '[name]-bundle.js'
    },

    module: {
        rules: [ {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ 'env' ]
                }
            }
        } ]
    },

    devServer: {
        contentBase: path.resolve( __dirname, 'Public' ),
        publicPath: '/Scripts/'
    },

    devtool: 'source-map' 
}