<template>
  <!--  已评价-->
  <div>
    <div v-for="(data, inde) in list" :key="inde">
      <div v-for="(item, index) in data.goods" :key="index">
        <van-card :title="item.name" :thumb="item.image">
          <div slot="footer" class="footer">
            <van-button size="mini" @click="See(data._id)">查看评论</van-button>
          </div>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alreadyevaluated",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      goods: []
    };
  },
  methods: {
    async alreadyEvaluated() {
      try {
        let res = await this.$api.alreadyEvaluated();
        this.list = res.data.list;
        // res.data.list.map(item => {
        //   this.goods = item.goods;
        // });
        console.log(this.list, 111);
        console.log(this.goods, 222);
      } catch (e) {
        console.log(e);
      }
    },
    //查看评论
    See(id) {
      this.$router.push({ name: "Evaluationdetails", query: { id: id } });
    }
  },
  mounted() {
    this.alreadyEvaluated();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.van-card__content {
  text-align: left;
}
.footer {
  font-size: 15px;
}
</style>
