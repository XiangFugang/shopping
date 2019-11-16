<template>
  <!--  晒单-->
  <div>
    <div>
      <van-nav-bar
        title="订单中心"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="details">
      <van-card title="商品评分" :thumb="item.image_path">
        <div slot="footer">
          <van-rate
            v-model="rate"
            :size="25"
            color="#ee0a24"
            void-icon="star"
            void-color="#eee"
          ></van-rate>
        </div>
      </van-card>
    </div>
    <div>
      <van-cell-group>
        <van-field
          v-model="content"
          rows="2"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="说说你的购买感受吧"
          show-word-limit
        ></van-field>
      </van-cell-group>
    </div>
    <div>
      <van-checkbox @click="toggle" v-model="anonymous" class="anonymous"
        >匿名评价</van-checkbox
      >
    </div>
    <div class="bottom">
      <van-button type="primary" size="large" @click="Submission"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Dryinglist",
  components: {},
  props: {},
  data() {
    return {
      item: {}, //接收商品的数据
      rate: 2, //评分
      content: "", //评论内容
      anonymous: false, //匿名评价开关
      args: {
        image: []
      }
    };
  },
  methods: {
    //提交
    async Submission() {
      this.evaluateOne();
      try {
        let res = await this.$api.comment(this.args);
        if (res.code === 200) {
          this.$router.push("/Home");
        } else {
          Toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    //匿名评价
    toggle() {
      this.anonymous = !this.anonymous;
    },
    //处理被提交的数据的方法
    evaluateOne() {
      this.args.rate = this.rate;
      this.args.content = this.content;
      this.args.anonymous = this.anonymous;
      this.args.id = this.item.cid;
      this.args._id = this.item._id;
      this.args.order_id = this.item.order_id;
      this.args.image = [];
    }
  },
  mounted() {
    this.item = this.$route.query.item;
    console.log(this.item, 33333);
    this.evaluateOne();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.details {
  text-align: left;
}
.van-card__content {
  text-align: left;
}
.bottom {
  width: 90%;
  margin: 30px auto;
}
.anonymous {
  width: 100px;
  font-size: 18px;
  overflow: hidden;
}
</style>
