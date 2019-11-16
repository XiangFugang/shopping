<template>
  <!--收藏商品-->
  <div>
    <div>
      <van-nav-bar title="收藏商品" left-arrow @click-left="onClickLeft" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MerchandiseCollection",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
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
