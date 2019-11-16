<template>
  <!--登录注册-->
  <div id="LoginRegistration">
    <!--    <van-popup v-model="show" class="Popup">{{Tips}}</van-popup>&lt;!&ndash;错误信息弹出层&ndash;&gt;-->
    <div class="top"><img src="../imges/jiantou.png" alt="" class="img" /></div>
    <div class="frame">
      <div class="register">登录/注册</div>
      <div class="form">
        <van-cell-group class="color">
          <van-field
            v-model="username"
            clearable
            placeholder="USERNAME"
            class="back"
          ></van-field>

          <van-field
            v-model="password"
            type="password"
            placeholder="PASSWORD"
            class="back"
          ></van-field>
          <van-field
            v-model="phone"
            label="手机号"
            placeholder="仅注册需要"
            class="phone"
          ></van-field>
          <van-field
            v-model="Shortmessage"
            center
            clearable
            label="短信验证码"
            placeholder="仅注册需要"
            class="phone"
          >
            <van-button slot="button" size="small" type="primary"
              >发送验证码</van-button
            >
          </van-field>

          <div class="Verification ">
            <div class="left">
              <van-field
                v-model="VerificationCode"
                center
                clearable
                label="验证码"
                placeholder="请输入验证码"
                class="Verification_Code"
              >
              </van-field>
            </div>
            <div class="right">
              <div class="img" v-html="code" @click="getAverify"></div>
            </div>
          </div>
        </van-cell-group>
        <div class="bottom">
          <span class="inpt"></span>
          <van-button
            type="primary"
            @click="login(username, password, VerificationCode)"
            >登录</van-button
          >
          <span class="inpt"></span>
          <van-button
            type="danger"
            @click="register(username, password, VerificationCode, phone)"
            >注册</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginRegistration",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      //默认验证码
      code: "",
      //姓名
      username: "",
      //密码
      password: "",
      //电话号码
      phone: "",
      //短信验证码
      Shortmessage: "",
      //图片验证码
      VerificationCode: ""
      //错误信息
      // Tips: ""
    };
  },
  methods: {
    //默认和更换验证码
    getAverify() {
      axios
        .get(`api/verify?mt=${Math.random()}`)
        .then(res => {
          this.code = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //注册
    async register(nickname, password, verify, sms) {
      try {
        let res = await this.$api.register(nickname, password, verify, sms);
        if (res.code === 200) {
          this.$store.state.obj = res.userInfo;
          localStorage.setItem(
            "user",
            JSON.stringify({
              obj: res.userInfo
            })
          );
          // this.$router.push("/my");
        } else {
          alert(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //登录功能
    async login(nickname, password, verify) {
      try {
        let res = await this.$api.login(nickname, password, verify);
        if (res.code === 200) {
          // this.$store.state.obj = res.userInfo;
          localStorage.setItem(
            "user",
            JSON.stringify({
              obj: res.userInfo
            })
          );
          this.$router.push("/my");
          //   console.log(res);
        }
      } catch (e) {
        console.log(e);
      }
    }
    //错误信息
    // showPopup() {
    //   this.show = true;
    // }
  },
  mounted() {
    this.getAverify();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#LoginRegistration {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url("../imges/dongtu.gif") no-repeat;
  .Popup {
    width: 80%;
    font-size: 20px;
    color: #f45;
    height: 30px;
    line-height: 30px;
    border: 1px solid #f45;
    border-radius: 5px;
  }
  .top {
    margin-top: 10px;
    margin-left: 10px;
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ccc;
    .img {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -14px;
      margin-top: -13px;
      width: 25px;
      height: 25px;
    }
  }
  .frame {
    margin: 40px auto;
    width: 90%;
    background-color: rgba(255, 255, 255, 0.5);
    height: 80%;
    .register {
      margin-bottom: 30px;
      padding-left: 20px;
      padding-top: 20px;
      font-size: 20px;
      font-weight: bold;
      text-align: left;
      letter-spacing: 8px;
    }
    .form {
      /*background-color: rgba(255,255,255,0.5);*/
      margin-top: 20px;
      text-align: left;
      .color {
        background-color: rgba(255, 255, 255, 0.1) !important;
        .back {
          line-height: 80px;
          height: 80px;
          font-size: 20px;
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .phone {
          font-size: 15px;
          height: 60px;
          line-height: 60px;
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .Verification {
          border-bottom: 1px solid #f2f2f2;
          height: 50px;
          line-height: 50px;
          display: flex;
          justify-content: space-between;
          background-color: rgba(255, 255, 255, 0.1) !important;
          .left {
            width: 70%;
            background-color: rgba(255, 255, 255, 0.1) !important;
            .Verification_Code {
              background-color: rgba(255, 255, 255, 0) !important;
            }
          }
          .right {
            width: 30%;
            .img {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
      .bottom {
        border: 0px !important;
        padding-top: 20px;
        .inpt {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
