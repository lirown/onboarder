import { esbuildPlugin } from '@web/dev-server-esbuild';
import { rollupAdapter, fromRollup } from '@web/dev-server-rollup';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';

const config = {
  appIndex: 'index.html',
  mimeTypes: {
    // serve all json files as js
    '**/*.json': 'js'
    // serve .module.css files as js
    // '**/*.module.css': 'js',
  },
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ target: 'auto' }),
    ...(process.env.NODE_ENV
      ? [
          fromRollup(
            replace
          )({
            preventAssignment: true,
            include: 'client/**/*.js',
            exclude: 'client/config.*.js',
            delimiters: ['', ''],
            values: {
              './config': `./config.${process.env.NODE_ENV}`
            }
          }),
          rollupAdapter(json())
        ]
      : [])
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /\//, to: '/404.html' }]
    }
  }
};

console.log(config);
export default config;
