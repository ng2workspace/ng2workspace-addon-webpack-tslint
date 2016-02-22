module.exports = function(options, workspace) {
  var config = workspace.get('webpack').webpackConfig;

  var formatter = (function() {
    var fs = require('fs');
    var stylishDir = workspace.util
        .toAbsolute('node_modules', 'tslint-stylish');

    if(fs.existsSync(stylishDir)) {
      return {
        name: 'stylish',
        dir: stylishDir
      };
    }

    return {};
  })();

  options = workspace.util.defaults(options, {
    configuration: {
      rules: {}
    },
    formatter: formatter.name,
    formattersDirectory: formatter.dir
  });

  config.tslint = options;

  config.module.preLoaders.push({
    test: /\.ts$/,
    loader: 'tslint',
    exclude: [workspace.util.toAbsolute('node_modules')]
  });
};