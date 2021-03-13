<template>
  <div>
    <!-- Filter Area -->
    <el-form id="filter_form" ref="form" :model="filter_form" label-width="80px" size="mini">
      <el-form-item label="恒星类型">
        <el-select v-model="filter_form.star_type" placeholder="">
          <el-option label="标准恒星" value="star"></el-option>
          <el-option label="中子星" value="neutron"></el-option>
          <el-option label="白矮星" value="white_dwarf"></el-option>
          <el-option label="黑洞" value="black_hole"></el-option>
          <el-option label="巨星" value="giant"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="初始星系">
        <el-checkbox-group v-model="filter_form.planets">
          <el-checkbox label="潮汐锁定（卫星）" name="type"></el-checkbox>
          <el-checkbox label="潮汐锁定（永昼永夜）" name="type"></el-checkbox>
          <el-checkbox label="横躺自转（卫星）" name="type"></el-checkbox>
          <el-checkbox label="横躺自转（永昼永夜）" name="type"></el-checkbox>
          <el-checkbox label="冰巨星" name="type"></el-checkbox>
          <el-checkbox label="气态巨星" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="珍奇产出">
        <el-checkbox-group v-model="filter_form.rare_resources">
          <el-checkbox label="单极磁石" name="type"></el-checkbox>
          <el-checkbox label="可燃冰" name="type"></el-checkbox>
          <el-checkbox label="光栅石" name="type"></el-checkbox>
          <el-checkbox label="有机晶体" name="type"></el-checkbox>
          <el-checkbox label="分形硅石" name="type"></el-checkbox>
          <el-checkbox label="金伯利矿石" name="type"></el-checkbox>
          <el-checkbox label="刺笋结晶" name="type"></el-checkbox>
          <el-checkbox label="重氢" name="type"></el-checkbox>
          <el-checkbox label="原油" name="type"></el-checkbox>
          <el-checkbox label="硫酸" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="包含硬飞">
        <el-switch v-model="form.needTrans"></el-switch>
      </el-form-item> -->

      <el-divider></el-divider>
      <el-row type="flex" justify="start">
        <el-button @click="onReset" icon="el-icon-refresh-left" style="margin-left: 20px">重置</el-button>
        <el-button type="primary" @click="onSubmit" icon="el-icon-search" style="margin-left: 10px; width: 150px">筛选</el-button>
        <el-select v-model="filter_form.sort_type" placeholder="排序方式" style="margin-left: 25px; width: 120px">
          <el-option label="光能利用率" value="light_effic"></el-option>
          <el-option label="风能利用率" value="wind_effic"></el-option>
          <el-option label="珍奇数量" value="rare_num"></el-option>
        </el-select>
        <el-switch style="margin-left: 10px; margin-top: 10px"
          v-model="filter_form.asc"
          active-text="降序"
          active-value= -1
          inactive-text="升序"
          inactive-value= 1
          >
        </el-switch>

        <EditForm @onSubmit="loadSeeds()" style="margin-left: 20%"></EditForm>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <!-- PreArea -->
    <el-tooltip effect="dark" placement="right" style="margin-left: 20px"
                  v-for="seed in seeds"
                  v-bind:key="seed.id"
      >
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;"> {{seed.starName}} </p>
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;"> {{map.get(seed.starType)}} </p>
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;"> ID: {{seed.id}} </p>
        <p slot="content" style="width: 300px" class="abstract">风能利用率 : {{seed.windEffic}}%</p>
        <p slot="content" style="width: 300px" class="abstract">光能利用率 : {{seed.lightEffic}}%</p>
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">———————————————————————</p>
        <p slot="content" style="width: 300px; text-shadow: 0 0 10px white,0 0 20px blue,0 0 30px white,0 0 40px blue;" class="abstract"
            v-for="planet in seed.planets"
            v-bind:key="planet.id"
        >
          {{planet}}
        </p>
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">———————————————————————</p>
        <p slot="content" style="width: 300px; text-shadow: 0 0 10px white,0 0 20px orange,0 0 30px white,0 0 40px #E6A23C;" class="abstract"
            v-for="resource in seed.rareResources"
            v-bind:key="resource.id"
        >
          {{resource}}
        </p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 180px; float: left"
                  bodyStyle="padding:10px" shadow="hover">
          <div class="cover">
            <img :src="require('@/assets/icons/main_star/' + seed.starType + '.png')" alt="封面">
          </div>
          <div class="title">
            <a>{{seed.starName}}</a>
            <br>
            <a>ID : {{seed.seedId}}</a>
          </div>
          <div>
            <i class="el-icon-star-off" @click="giveStar(seed.id)"></i>
            <a></a>
          </div>
        </el-card>
      </el-tooltip>
  </div>
</template>

<script>
import EditForm from './EditForm'

export default {
  name: 'SeedsIndex',
  components: {EditForm},
  data () {
    return {
      seeds: [],
      filter_form: {
        star_type: '',
        planets: [],
        rare_resources: [],
        sort_type: 'light_effic',
        asc: 1
      },
      map: new Map([['star', '标准恒星'], ['black_hole', '黑洞'], ['giant', '巨星'], ['neutron', '中子星'], ['white_dwarf', '白矮星']])
    }
  },
  mounted: function () {
    this.loadSeeds()
  },
  methods: {
    loadSeeds () {
      this.$axios
        .get('http://localhost:8443/api/seeds')
        .then(resp => {
          if (resp && resp.status === 200) {
            this.seeds = resp.data
            console.log(this.seeds[0])
          }
        })
    },
    onSubmit () {
      console.log(this.filter_form)
      this.$axios
        .post('http://localhost:8443/api/filterSeeds', {
          starType: this.filter_form.star_type,
          planets: this.filter_form.planets,
          rareResources: this.filter_form.rare_resources,
          sortType: this.filter_form.sort_type,
          ascending: this.filter_form.asc
        })
        .then(resp => {
          if (resp && resp.status === 200) {
            this.seeds = resp.data
          }
        })
    },
    onReset () {
      this.filter_form = {
        star_type: '',
        planets: [],
        rare_resources: []
      }
    }
  }
}
</script>

<style scoped>
  #filter_form {
    text-align: left;
    margin: 10px;
  }
  .cover {
    width: 85px;
    height: 85px;
    margin: 0 auto;
    overflow: hidden;
    cursor: pointer;

  }
  img {
    width: 75px;
    height: 75px;
  }
  .title {
    font-size: 15px;
    font-style: italic;
    text-align: left;
  }
  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }
  .abstract {
    display: block;
    line-height: 17px;
  }
  i {
    margin-top: 0px;
    float: left;
  }
</style>
