<template>
  <div>
    <router-view></router-view>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home-o" @click="click('/Home')">商城</van-tabbar-item>
        <van-tabbar-item icon="wap-nav" @click="click('/classification')">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" @click="click('/ShoppingCart')">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" @click="click('/my')">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePageFramework",
  components: {},
  props: {},
  data() {
    return {
      active: 0
    };
  },
  methods: {
    click(parameter) {
      this.$router.push(parameter)
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

<style scoped lang="scss"></style>
