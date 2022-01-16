const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const folderPath = path.resolve(__dirname, "./src/");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const pages = [
    new LiveReloadPlugin({
        appendScriptTag: true
    }),
    new HtmlWebpackTagsPlugin({
        hash: true,
        append: false,
        tags: [
            '/assets/css/style.css',
            '/static/vendor/modernizr-detectizr.js'
        ]
    }),

    new HtmlWebPackPlugin({
        title : 'Portfolio',
        hash: true,
        template: './src/index.html',
        chunks: ['index','style'],
        filename:'index.html',
        HTML_PATH: folderPath
    }),

    new HtmlWebPackPlugin({
        title : 'Portfolio',
        hash: true,
        template: './src/w1.html',
        chunks: ['index','style'],
        filename:'w1.html',
        HTML_PATH: folderPath
    }),

    new HtmlWebPackPlugin({
        title : 'Portfolio',
        hash: true,
        template: './src/w2.html',
        chunks: ['index','style'],
        filename:'w2.html',
        HTML_PATH: folderPath
    }),

    new HtmlWebPackPlugin({
        title : 'Portfolio',
        hash: true,
        template: './src/w3.html',
        chunks: ['index','style'],
        filename:'w3.html',
        HTML_PATH: folderPath
    }),

    new HtmlWebPackPlugin({
        title : 'Portfolio',
        hash: true,
        template: './src/w4.html',
        chunks: ['index','style'],
        filename:'w4.html',
        HTML_PATH: folderPath
    }),

    new HtmlWebPackPlugin({
        title : 'Portfolio',
        hash: true,
        template: './src/w5.html',
        chunks: ['index','style'],
        filename:'w5.html',
        HTML_PATH: folderPath
    }),

    // ['index', 'w1', 'w2', 'w3', 'w4', 'w5'].forEach((file) => {
    //     console.log(file);
    //     new HtmlWebPackPlugin({
    //         title : 'Portfolio',
    //         hash: true,
    //         template: `./src/${file}.html`,
    //         filename: `${file}.html`,
    //         chunks: ['index','style'],
    //         HTML_PATH: folderPath
    //     })
    // })
    //https://stackoverflow.com/questions/50665176/combine-htmlwebpackplugin-chunks
];



module.exports = pages;

