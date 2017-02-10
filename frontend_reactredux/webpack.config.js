module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: './public'
    },

    devServer: {
        inline: true,
        contentBase: './public',
        port: 3000
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader!babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },

    devtool: 'eval-source-map',

    resolve: {
        extensions: ['', '.js', '.jsx']
    }

};