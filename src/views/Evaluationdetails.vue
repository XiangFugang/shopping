<template>
  <!--  评价详情-->
  <div>
    <div>
      <van-nav-bar
        title="评价详情"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="top">
      <div
        class="top_img"
        v-for="(item, index) in evaluateOne.user"
        :key="index"
      >
        <img class="imgs" :src="item.avatar" alt="用户头像" />
      </div>
      <div class="top_evaluate">
        <van-rate
          v-model="value"
          :size="25"
          color="#ee0a24"
          void-icon="star"
          void-color="#eee"
        ></van-rate>
      </div>
    </div>
    <div class="bottom" v-for="(item, index) in evaluateOne.goods" :key="index">
      <div class="bottom_img">
        <img :src="item.image" alt="商品图片" class="imgs" />
      </div>
      <div class="text">{{ item.name }}</div>
      <div class="icon">
        <van-icon name="cart" color="#f45" size="30px" />
      </div>
    </div>
    <div class="Return">
      <van-button type="primary" size="large" @click="onClickLeft">返回</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Evaluationdetails",
  components: {},
  props: {},
  data() {
    return {
      id: "",
      value: 2,
      evaluateOne: {},
      goods: [],
      user: []
    };
  },
  methods: {
    async EvaluateOne() {
      try {
        let res = await this.$api.evaluateOne(this.id);
        this.evaluateOne = res.evaluateOne;
        this.goods = this.evaluateOne.goods;
        this.user = this.evaluateOne.user;
        console.log(this.evaluateOne, 666);
        console.log(this.goods, 777);
        console.log(this.user, 888);
      } catch (e) {
        console.log(e);
      }
    },
    //返回
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.EvaluateOne();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.top {
  padding: 10px 0 10px 10px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  .top_img {
    .imgs {
      border: 1px solid #f2f2f2;
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .top_evaluate {
    padding-left: 20px;
    height: 70px;
    line-height: 90px;
  }
}
.bottom {
  display: flex;
  /*justify-content: space-between;*/
  padding: 20px 10px 20px 10px;
  .bottom_img {
    border: 1px solid #f2f2f2;
    .imgs {
      width: 100px;
      height: 100px;
    }
  }
  .text {
    padding-left: 10px;
    padding-top: 5px;
    font-size: 18px;
    width: 220px;
    height: 30px;
    line-height: 30px;
    text-align: left;
    overflow: hidden;
  }
  .icon {
    width: 30px;
    position: relative;
    .van-icon {
      position: absolute;
      top: 50%;
      right: 0px;
      margin-top: -20px;
      padding-top: 10px;
      width: 40px;
      height: 30px;
      border-radius: 50%;
      background-color: #f3f3f3;
      .van-icon:before {
      }
    }
  }
}
.Return {
  position: fixed;
  left: 10px;
  right: 10px;
  bottom: 100px;
}
</style>
