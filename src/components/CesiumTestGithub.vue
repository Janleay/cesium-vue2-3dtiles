<template>
  <div id="cesiumContainer">
    <div class="layerList">
      <div class="layer" v-for="v in layerList" :key="v.layerId" @dblclick="flyToTileset(v.tileset)">
        <div class="layerSwitch"><a-switch :checked="v.tileset.show" @click="handleVisible(v)" /></div>
        <div class="layerName">{{ v.layerId }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// tokenApi
const tokenUrl = '3dtiles服务鉴权路径'

export default {
  name: 'CesiumTest',
  data () {
    return {
      tilesetList: [
        { layerId: '图层id', url: '3dtiles服务路径', visible: false }
      ],
      layerList: [],
      viewer: null
    }
  },
  mounted () {
    this.login().then(res => {
      this.initCesium(res)
    })
  },
  methods: {
    login () {
      return new Promise(resolve => {
        axios.post(tokenUrl,{
          password: "password",
          username: "username"
        }).then(res => {
          if (!res || !res.data || !res.data.data) return false
          const { data: { data: { token = '' }}} = res
          console.log(token)
          resolve(token)
        })
      })
    },
    initCesium (token) {
      const Cesium = this.cesium
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWNjYTM0MC05NTE2LTRkYzgtODc0ZS04NmEwMjcwOTllOGEiLCJpZCI6MTEwODYxLCJpYXQiOjE2NjU1NTY5MDR9.wC1eKY7_FrAuYGe5wxwGuPq613RrkSUof-FBCgZ5wVw';
      this.viewer = new Cesium.Viewer("cesiumContainer",{
        shouldAnimate:true,timeline:false,animation:false
      });
      this.viewer.cesiumWidget.creditContainer.style.display = 'none'
      this.tilesetList.forEach(p => {
        const { url, visible, layerId } = p
        try {
          const ts = this.viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: url + `?token=${token}`,
            show: visible
          }))
          this.layerList.push({
            layerId: layerId,
            tileset: ts
          })

          ts.readyPromise.then(tileset => {
            this.viewer.flyTo(tileset)
          })
        } catch (error) {
          this.message.error(`Error creating tileset: ${error}`)
        } finally {}
      })
      this.layerList.reverse()

      const provider = new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      });

      const arcgisLayer = this.viewer.imageryLayers.addImageryProvider(provider);
      console.log(arcgisLayer)
    },
    handleVisible (v) {
      v.tileset.show = !v.tileset.show
    },
    flyToTileset (tileset) {
      this.viewer && this.viewer.flyTo(tileset)
    }
  }
}
</script>

<style lang="less" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  .layerList {
    position: absolute; z-index: 10; width: 120px; background: white;
    top: 20px; left: 20px; max-height: 100%; overflow: auto; border-radius: 6px;
    .layer {
      height: 36px; margin: 5px 10px; display: inline-flex; width: 100px;
      .layerSwitch {
        margin-top: 7px;
      }
      .layerName {
        line-height: 36px; height: 36px; padding-left: 10px;
      }
    }
  }
}
</style>