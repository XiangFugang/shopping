<template>
  <div id="InformationDisplay">
    <div class="imgs">
      <van-popup
        v-model="show"
        position="top"
        closeable
        close-icon="arrow-left"
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
        <personaldata @close="close"></personaldata>
      </van-popup>
      <img src="../../imges/shezhi.png" alt="" class="img" @click="showPopup" />
    </div>
    <div>
      <div class="Photo_frame" v-if="obj">
        <img :src="obj.obj.avatar" alt="" class="Head_portrait" />
      </div>
      <div class="Photo_frame" v-else>
        <img src="" alt="" class="Head_portrait" />
      </div>
    </div>
    <div>
      <div class="tx" v-if="obj">
        <div class="top">欢迎您：{{ obj.obj.nickname }}</div>
        <div class="bottom" @click="out">退出登录</div>
      </div>
      <div v-else class="text" @click="LoginRegistration">登录 / 注册</div>
    </div>
  </div>
</template>

<script>
import personaldata from "./Personaldata";
export default {
  name: "InformationDisplay",
  components: {
    personaldata
  },
  props: {},
  data() {
    return {
      show: false,
      obj: {}
    };
  },
  methods: {
    //在没有登录的情况下跳转登录
    LoginRegistration() {
      this.$router.push("/LoginRegistration");
    },
    out() {
      localStorage.clear();
      this.$store.state.obj = {};
      this.$router.push("/LoginRegistration")
      // this.obj = JSON.parse(localStorage.getItem("user"));
    },
    //弹出层
    showPopup() {
      this.show = true;
    },
    close(data) {
      this.show = data;
    }
  },
  mounted() {
    this.obj = JSON.parse(localStorage.getItem("user"));
    // console.log(this.obj, this.obj.obj.nickname);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#InformationDisplay {
  width: 100%;
  height: 200px;
  background-color: #f45;
  position: relative;
  .imgs {
    position: absolute;
    top: 10px;
    right: 10px;
    .img {
      width: 20px;
      height: 20px;
    }
    /*.data{*/
    /*  display: flex;*/
    /*  justify-content: space-between;*/
    /*  height: 50px;*/
    /*  line-height: 50px;*/
    /*  .content{*/
    /*    flex: 1;*/
    /*    text-align: center;*/
    /*  }*/
    /*  .left{*/
    /*    padding-left: 10px;*/
    /*  }*/
    /*}*/
  }
  .Photo_frame {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -45px;
    margin-top: -65px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 1px solid #f2f2f2;
    .Head_portrait {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .text {
    position: absolute;
    top: 75%;
    left: 50%;
    margin-left: -30px;
  }
  .tx {
    position: absolute;
    top: 65%;
    left: 50%;
    margin-left: -50px;
    .top {
      height: 20px;
      line-height: 20px;
    }
    .bottom {
      padding-top: 10px;
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
