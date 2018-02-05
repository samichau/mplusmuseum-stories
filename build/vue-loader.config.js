module.exports = {
  extractCSS: process.env.NODE_ENV === 'production',
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions'],
    }),
  ],
  loaders: {
    js: 'babel-loader',
    less: `vue-style-loader!css-loader!less-loader?{"modifyVars":{"fontbase":"'${process.env.FONT_URL}'"}}`,
  },
  esModule: false,
};
