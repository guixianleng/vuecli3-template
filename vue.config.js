// vue.config.js
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const vueEnv = process.env.NODE_ENV;

module.exports = {
  // 公共路径
  publicPath: './',

  // 不同的环境打不同包名
  outputDir: vueEnv === 'development' ? 'devdist' : 'dist',

  // 使用运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  // 开启生产环境SourceMap，设为false打包时不生成.map文件
  productionSourceMap: false,

  // 关闭ESLint，如果你需要使用ESLint，把lintOnSave设为true即可
  lintOnSave: false,

  devServer: {
    open: true,
    host: '0.0.0.0', // 指定使用一个 host，默认是 localhost
    port: 8080, // 端口地址
    https: false, // 使用https提供服务
    // proxy:
  },

  chainWebpack: (config) => {
    // 设置一些常用alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'));
  },

  configureWebpack: (config) => { // eslint-disable-line
    // 生产环境
    if (vueEnv === 'production') {
      // 生产环境去除console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;

      // 生产环境打包分析体积
      return {
        plugins: [
          new BundleAnalyzerPlugin(),
        ],
      };
    }
  },
  css: {
    loaderOptions: {
      // 全局使用的一些样式
      less: {
        data: `
          @import "@/styles/_var.less";
        `,
      },
    },
  },
};
