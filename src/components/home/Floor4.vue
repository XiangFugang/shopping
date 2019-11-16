<template>
  <div>
    <div class="Floor1_top">
      <div class="Floor1_top_lfte">4F</div>
      <div class="Floor1_top_text">热销商品</div>
      <div class="aaa"></div>
    </div>
    <div class="Floor4">
      <div v-for="(item, index) in hotGoods" :key="index" class="Sellwell">
        <img :src="item.image" alt="" />
        <div class="text">{{item.name}}</div>
        <div class="Price">
          <div class="Originalprice">￥{{item.mallPrice}}</div>
          <div class="Presentprice">￥{{item.price}}</div>
        </div>
      </div>
    </div>
    <div class="bottom_bottom">~~没有了~~</div>
  </div>
</template>

<script>
export default {
  name: "Floor4",
  components: {},
  props: {},
  data() {
    return {
      hotGoods: []
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.hotGoods = res.data.hotGoods;
        console.log(this.hotGoods);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.recommend();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.Floor1_top {
  padding: 5px 0;
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
  .Floor1_top_lfte {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 20px;
    color: #fff;
    background-color: #f45;
    position: relative;
    top: 10px;
  }
  .Floor1_top_text {
    line-height: 40px;
    font-size: 20px;
    color: #f45;
  }
}
.Floor4 {
  display: flex;
  flex-wrap: wrap;
  .Sellwell {
    border-right: 1px solid #f2f2f2;
    border-bottom: 2px solid #f2f2f2;
    width: 49.7%;
    img {
      width: 100%;
    }
    .text{
      margin: 0 auto;
      width: 150px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 15px;
      color: #f45;
    }
    .Price{
      display: flex;
      justify-content: center;
      .Originalprice{
        font-size: 15px;
        line-height: 20px;
        color: #f45;
      }
      .Presentprice{
        font-size: 15px;
        line-height: 20px;
        color: #f2f2f2;
        padding-left: 5px;
        text-decoration: line-through;
      }
    }
  }
}
.bottom_bottom{
  height: 200px;
  line-height: 200px;
  background-color: #f2f2f2;
  color: #7d7e80;
  font-size: 50px;
}
</style>
