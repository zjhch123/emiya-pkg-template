const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const eslint = require('rollup-plugin-eslint').eslint
const alias = require('rollup-plugin-alias')
const autoprefixer = require('autoprefixer')
const postcss = require('rollup-plugin-postcss')
const babel = require('rollup-plugin-babel')

const path = require('path')
const paths = require('../scripts/paths')

module.exports = function (_params) {
  return {
    input: _params,
    output: {
      format: 'umd',
    },
    allowRealFiles: true,
    plugins: [
      alias({
        resolve: ['.mjs', '.es6', '.js', '/index.js'],
        '@src': paths.srcDir,
        '@dist': paths.distDir
      }),
      postcss({
        modules: true,
        minimize: true,
        use: [ 'sass' ],
        plugins:  [
          autoprefixer({
            browsers: [ 'last 2 versions', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4' ]
          })
        ]
      }),
      resolve({
        module: true,
        jsnext: true,
        main: true,
        browser: true,
        extensions: ['.mjs', '.es6', '.js'],
      }),
      commonjs({
        include: 'node_modules/**',
        exclude: [],
      }),
      eslint({
        include: [ path.join(paths.srcDir, '**', '*.js') ]
      }),
      babel({
        runtimeHelpers: true,
        exclude: [
          './node_modules/**',
          '../node_modules/**',
        ],
      }),
    ]
  }
}