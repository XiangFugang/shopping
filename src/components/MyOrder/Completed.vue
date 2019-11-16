<template>
  <!--  已完成-->
  <div>
    <div v-for="(item, index) in order_list" :key="index">
      <van-card
        :num="item.count"
        :price="item.mallPrice"
        :desc="item.name"
        title="fger"
        :thumb="item.image_path"
      ></van-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Completed",
  components: {},
  props: {},
  data() {
    return {
      list: [], //接收地址详细数据
      order_list: [] //接收商品详细数据
    };
  },
  methods: {
    //接收数据
    async getMyOrder() {
      try {
        let res = await this.$api.getMyOrder();
        this.list = res.list;
        this.list.map(item => {
          this.order_list = item.order_list;
        });
        console.log(this.list, 444);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getMyOrder();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .van-card__content{
    text-align: left;
  }
</style>
