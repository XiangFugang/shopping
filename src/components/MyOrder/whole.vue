<template>
  <!--全部-->
  <div>
    whole
  </div>
</template>

<script>
export default {
  name: "whole",
  components: {},
  props: {},
  data() {
    return {
      whole: null
    };
  },
  methods: {
    async getMyOrder() {
      try {
        let res = await this.$api.getMyOrder();
        this.whole = res;
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

<style scoped lang="scss"></style>
