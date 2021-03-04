<template>
  <div>
    <el-row style="margin: 10px">
    产品
    </el-row>
    <el-row style="margin-left: 10px">
      <el-tooltip class="item" effect="dark" style="margin-left: 5px; border: 2px solid"
                    v-for="product in products"
                    v-bind:key="product.id" :content="product.name_cn">
        <el-button type="image" size="small">
          <el-image :src="require('@/assets/icons/products/' + product.name_en + '.png')" style="width:30px; height: 30px"></el-image>
        </el-button>
      </el-tooltip>
    </el-row>
    <el-row>
    </el-row>
  </div>
</template>

<script>
// import ProductArea from './ProductArea';

export default {
  name: 'CalculatorIndex',
  // components: {ProductArea},
  data () {
    return {
      products: []
    }
  },
  mounted: function () {
    this.loadProducts()
  },
  methods: {
    loadProducts () {
      this.$axios
        .get('static/data/products.json')
        .then(resp => {
          this.products = resp.data
        })
    }
  }
}
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
