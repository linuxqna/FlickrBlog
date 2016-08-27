module.exports = {
    entry: './src/client.js',
    output: {
        path: './bin',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'classnames!style-loader!css-loader?modules=true&localIdentName=[name]-[local]-[hash:base64:5]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
}
