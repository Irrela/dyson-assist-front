<template>
  <div>
    <el-button type="success" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">添加星系种子</el-button>

    <el-dialog
      title="星系信息"
      :visible.sync="dialogFormVisible">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="种子序号" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.seed_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="恒星类型" :label-width="formLabelWidth" prop="title">
          <el-select value-key="id" v-model="form.star_type" placeholder="请选择分类">
            <el-option label="标准恒星" value="star"></el-option>
            <el-option label="中子星" value="neutron"></el-option>
            <el-option label="白矮星" value="white_dwarf"></el-option>
            <el-option label="黑洞" value="black_hole"></el-option>
            <el-option label="巨星" value="giant"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="恒星名称" :label-width="formLabelWidth" prop="author">
          <el-input v-model="form.star_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="星系特征" :label-width="formLabelWidth" prop="date">
          <el-checkbox-group v-model="form.planets">
            <el-checkbox label="潮汐锁定（卫星）" name="type"></el-checkbox>
            <el-checkbox label="潮汐锁定（永昼永夜）" name="type"></el-checkbox>
            <el-checkbox label="横躺自转（卫星）" name="type"></el-checkbox>
            <el-checkbox label="横躺自转（永昼永夜）" name="type"></el-checkbox>
            <el-checkbox label="冰巨星" name="type"></el-checkbox>
            <el-checkbox label="气态巨星" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="光能效率" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.light_effic" autocomplete="off" placeholder="填写星系内最大值(无需%), 例如: 120"></el-input>
          <el-switch
            v-model="form.is_light_eternal"
            active-color="#13ce66"
            active-text="该行星永昼永夜">
          </el-switch>
        </el-form-item>
        <el-form-item label="珍奇类型" :label-width="formLabelWidth" prop="press">
          <el-checkbox-group v-model="form.rare_resources">
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
        <!-- 自动生成书籍_id -->
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="on"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear()">清空内容</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        // 不设置id，让database自增
        // id: '',
        seed_id: '',
        star_type: '',
        star_name: '',
        planets: [],
        light_effic: '',
        is_light_eternal: false,
        rare_resources: []
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.form = {
        // id: '',
        seed_id: '',
        star_type: '',
        star_name: '',
        planets: [],
        light_effic: '',
        is_light_eternal: false,
        rare_resources: []
      }
    },
    onSubmit () {
      console.log(this.form)
      this.$axios
        .post('/seeds', {
          seed_id: this.form.seed_id,
          star_type: this.form.star_type,
          star_name: this.form.star_name,
          planets: this.form.planets,
          rare_resources: this.form.rare_resources
        })
        .then(resp => {
          if (resp && resp.status === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          }
        })
    }
  }
}
</script>

<style scoped>
  .el-icon-circle-plus-outline {
    margin: 50px 0 0 20px;
    font-size: 100px;
    float: left;
    cursor: pointer;
  }
</style>
