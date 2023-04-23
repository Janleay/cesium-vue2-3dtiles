import Vue from 'vue'
import App from './App.vue'

import antdComponents from 'ant-design-vue/es' // ant-design
// 全局样式
import 'ant-design-vue/dist/antd.less'

import * as Cesium from 'cesium/Cesium'
import widgets from 'cesium/Widgets/widgets.css'
// 定义为全局变量，以便调用
Vue.prototype.cesium = Cesium;
Vue.prototype.widgets = widgets;

Vue.config.productionTip = false

Vue.use(antdComponents)

new Vue({
  render: h => h(App),
}).$mount('#app')
