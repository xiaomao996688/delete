/*
* @Author: Jacky
* @Date:   2018-07-25 17:58:06
* @Last Modified by:   Jacky
* @Last Modified time: 2018-07-27 13:10:22
*/
const  webpack 			   = require('webpack'); 
const  ExtractTextPlugin   = require("extract-text-webpack-plugin");
const  HtmlWebpackPlugin   = require('html-webpack-plugin');
//线上环境，与开发环境dev-server配置 
const WEBPACK_ENV 		   = process.env.WEBPACK_ENV || 'dev';

console.log(WEBPACK_ENV);
//获取html-webpack-plugin参数方法
const  getHtmlConfig      = function(name){
	return {
			template: './src/view/'+name+'.html',
			filename: 'view/'+name+'.html',
			inject: true,
			hash: true,
			chunks:['common',name]
	}
}
const config = {
	entry :{ 
		'common':['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/login.js']
	},
	output: {
		//path是dist的目录
   		path:__dirname+'/dist',
   		//相对服务来说的
   		publicPath:'/dist',
		filename: 'js/[name].js'
	},
	externals:{
		'jquery':'window.jQuery'
	},
	module:{
		loaders:[
			{ test: /\.css$/, 
			  loader:  ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
			},
			{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
			  loader:  'url-loader?limit=100&name=resource/[name].[ext]'
			}
		]
		

	},
	plugins: [
		//独立通用模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/base.js'
		}) ,
		//css分离单独打包
		new ExtractTextPlugin("css/[name].css"),
		//html模板处理，模板参数配置
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login'))


	]

};
if('dev' === WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
