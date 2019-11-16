<template>
  <!--我的订单-->
  <div>
    <div>
      <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
    </div>
    <div>
      <van-tabs v-model="active">
        <van-tab title="全部"><whole></whole></van-tab>
        <van-tab title="待支付"><Tobepaid></Tobepaid></van-tab>
        <van-tab title="待发货"><Tobeshipped></Tobeshipped></van-tab>
        <van-tab title="待收货"
          ><Goodstobereceived></Goodstobereceived
        ></van-tab>
        <van-tab title="已完成"><Completed></Completed></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Completed from "../components/MyOrder/Completed";
import Goodstobereceived from "../components/MyOrder/Goodstobereceived";
import Tobepaid from "../components/MyOrder/Tobepaid";
import Tobeshipped from "../components/MyOrder/Tobeshipped";
import whole from "../components/MyOrder/whole";
export default {
  name: "MyOrder",
  components: {
    Completed,
    Goodstobereceived,
    Tobepaid,
    Tobeshipped,
    whole
  },
  props: {},
  data() {
    return {
      active: 1
    };
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.active = this.$route.query.index;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
