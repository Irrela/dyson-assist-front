<template>
  <el-form class="login-container" >
    <h3 class="login-title">Login</h3>
    <el-form-item label="Username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="Type your username"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="Type your password"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login" round>LOGIN</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },

  methods: {
    login () {
      var _this = this
      console.log(this.$store.state)
      this.$axios
        .post('http://localhost:8443/api/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$store.commit('login', _this.loginForm)
            var path = this.$route.query.redirect
            this.$router.replace({ path: (path === '/' || path === undefined) ? '/index' : path })
          } else {
            this.$message.error('账号或密码错误，请重新输入')
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>
  #poster {
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
