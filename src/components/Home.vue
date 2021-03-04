<template>
  <div>
    <el-row id="logo">
      <el-image :src="require('@/assets/dsp_logo.png')" style="width:200px"></el-image>
    </el-row>
    <nav-menu></nav-menu>
    <router-view/>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
export default {
  name: 'Home',
  components: {NavMenu}
}
</script>

<style scoped>
  div {
    text-align: center;
  }
  #logo {
    background: #000102;
  }
</style>
