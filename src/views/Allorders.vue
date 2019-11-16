<template>
  <!--  全部订单-->
  <div>
    <div>
      <van-nav-bar title="全部订单" left-arrow @click-left="onClickLeft" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Allorders",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
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
