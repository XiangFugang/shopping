<template>
  <div id="Scrolling">
    <div class="Scrolling_top">商品推荐</div>
    <div class="wrapper" ref="wrapper">
      <ul class="Scrolling_center_ul">
        <li
          v-for="(item, index) in data.recommend"
          :key="index"
          class="Scrolling_center_li"
        >
          <div>
            <img class="Scrolling_center_img" :src="item.image" alt="index" />
          </div>
          <div class="Scrolling_center_Title">{{ item.goodsName }}</div>
          <div class="Scrolling_center_Discount">
            <div class="Scrolling_center_Original">￥{{ item.mallPrice }}</div>
            <div class="Scrolling_center_price">￥{{ item.price }}</div>
          </div>
          <div class="Scrolling_center_Guidedgraph">
            <div class="Scrolling_center_vehicle">
              <van-icon name="shopping-cart" color="#fff" />
            </div>
            <div
              class="Scrolling_center_details"
              @click="Commoditydetails(item.goodsId)"
            >
              商品详情
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scrolling",
  components: {},
  props: {},
  data() {
    return {
      data: {}
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.data = res.data;
        console.log(this.data);
      } catch (e) {
        console.log(e);
      }
    },
    //商品详情路由跳转与传参
    Commoditydetails(parameter) {
      console.log(parameter);
      this.$router.push({
        name: "CommodityDetails",
        query: { goodsId: parameter }
      });
    }
  },
  mounted() {
    this.recommend();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        startX: 0,
        click: true,
        scrollX: true
      });
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#Scrolling {
  .Scrolling_top {
    padding: 0 0 0 20px;
    text-align: left;
    line-height: 40px;
    border-bottom: 1px solid #f2f2f2;
  }
  .wrapper {
    overflow: hidden;
    display: flex;
    .Scrolling_center_ul {
      display: flex;
      flex: 1;
      .Scrolling_center_li {
        border-right: 2px solid #f2f2f2;
        width: 125px;
        .Scrolling_center_img {
          width: 100%;
        }
        .Scrolling_center_Title {
          padding: 5px 20px 5px 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 20px;
          line-height: 20px;
          width: 110px;
          text-align: center;
          font-size: 18px;
        }
        .Scrolling_center_Discount {
          display: flex;
          justify-content: center;
          width: 100%;
          .Scrolling_center_Original {
            line-height: 20px;
            font-size: 15px;
          }
          .Scrolling_center_price {
            line-height: 20px;
            font-size: 15px;
            padding-left: 3px;
            text-decoration: line-through;
            color: #f2f2f2;
          }
        }
        .Scrolling_center_Guidedgraph {
          display: flex;
          justify-content: center;
          .Scrolling_center_vehicle {
            width: 30px;
            padding: 5px 0 4px 0;
            background-color: coral;
            border-radius: 5px 0 0 5px;
          }
          .Scrolling_center_details {
            background-color: #7d7e80;
            height: 30px;
            line-height: 30px;
            background-color: #f45;
            font-size: 15px;
            color: #fff;
            padding-right: 5px;
            border-radius: 0 5px 5px 0;
          }
        }
      }
    }
  }
}
</style>
