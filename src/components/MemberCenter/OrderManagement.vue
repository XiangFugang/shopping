<template>
  <div id="OrderManagement">
    <div>
      <van-cell is-link icon="todo-list-o" @click="Order">全部订单</van-cell>
      <van-cell is-link icon="star-o" @click="Collection">收藏商品</van-cell>
      <van-cell is-link icon="location-o" @click="address">地址管理</van-cell>
      <van-cell is-link icon="browsing-history-o" @click="browse"
        >最近浏览</van-cell
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderManagement",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    //跳转地址管理
    address() {
      this.$router.push("/AddressManagement");
    },
    //跳转全部订单
    Order() {
      this.$router.push("/Allorders");
    },
    //跳转商品收藏
    Collection() {
      this.$router.push("/MerchandiseCollection");
    },
    //跳转最近浏览
    browse() {
      this.$router.push("/RecentlyBrowse");
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
#OrderManagement {
  padding-top: 20px;
  border-bottom: 1px solid #f2f2f2;
}
</style>
