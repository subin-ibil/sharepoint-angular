// gulpfile.js - Add to project root

'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(/Warning - \[sass\]/gi);

// Configure webpack to handle HTML and SCSS files
build.configureWebpack.mergeConfig({
  additionalConfiguration: (generatedConfiguration) => {
    // Handle HTML files
    generatedConfiguration.module.rules.push({
      test: /\.html$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'html-loader',
          options: {
            esModule: false,
            minimize: true,
          },
        },
      ],
    });

    // Handle SCSS files for components (not the main styles)
    generatedConfiguration.module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'raw-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
          },
        },
      ],
    });

    return generatedConfiguration;
  },
});

build.initialize(require('gulp'));
