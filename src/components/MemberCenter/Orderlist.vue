<template>
  <div id="Orderlist">
    <div class="payment" @click="jump(1)">
      <img src="../../imges/fukuan.png" alt="付款" class="img" />
      <div class="text">代付款</div>
    </div>
    <div class="Deliver_goods" @click="jump(2)">
      <img src="../../imges/fahuo.png" alt="发货" class="img" />
      <div class="text">代发货</div>
    </div>
    <div class="Receiving_goods" @click="jump(3)">
      <img src="../../imges/shoukuan.png" alt="收货" class="img" />
      <div class="text">待收货</div>
    </div>
    <div class="evaluate" @click="evaluate">
      <img src="../../imges/pingjia.png" alt="评价" class="img" />
      <div class="text">评价</div>
    </div>
    <div class="complete" @click="jump(4)">
      <img src="../../imges/wancheng.png" alt="完成" class="img" />
      <div class="text">完成</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Orderlist",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    //跳转我的订单/传参
    jump(index) {
      this.$router.push({ name: "MyOrder", query: { index: index } });
    },
    //跳转评价
    evaluate() {
      this.$router.push("/EvaluationCenter");
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#Orderlist {
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
  .payment {
    .img {
      width: 40px;
      height: 40px;
    }
    .text {
    }
  }
  .Deliver_goods {
    .img {
      width: 40px;
      height: 40px;
    }
    .text {
    }
  }
  .Receiving_goods {
    .img {
      width: 40px;
      height: 40px;
    }
    .text {
    }
  }
  .evaluate {
    .img {
      width: 40px;
      height: 40px;
    }
    .text {
    }
  }
  .complete {
    .img {
      width: 40px;
      height: 40px;
    }
    .text {
    }
  }
}
</style>
