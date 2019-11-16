<template>
  <!--  待评价-->
  <div class="aaa">
    <div v-for="(item, index) in list" :key="index">
      <van-card :title="item.name" :thumb="item.image_path">
        <div slot="footer">
          <van-tag plain type="danger" class="bbb" @click="Drying(item)"
            >评论晒单</van-tag
          >
        </div>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tobeevaluated",
  components: {},
  props: {},
  data() {
    return {
      list: [] //接收商品数据
    };
  },
  methods: {
    async tobeEvaluated() {
      try {
        let res = await this.$api.tobeEvaluated();
        this.list = res.data.list;
      } catch (e) {
        console.log(e);
      }
    },
    //评论晒单
    Drying(item) {
      this.$router.push({ name: "Dryinglist", query: { item: item } });
    }
  },
  mounted() {
    this.tobeEvaluated();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.van-card {
  text-align: left;
  .van-card__title {
    font-size: 15px;
  }
  .bbb {
    font-size: 14px;
    color: #f45;
  }
}
</style>
