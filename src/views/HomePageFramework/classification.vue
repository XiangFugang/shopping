<template>
  <!--分类-->
  <div id="classification">
    <div class="classification_top">商品分类</div>
    <div class="top_shopping">
      <ul class="sidebar">
        <!--商品分类-->
        <li
          v-for="(item, index) in category"
          :key="index"
          class="sidebar_sort"
          @click="click(index, item.bxMallSubDto)"
          :class="{ gutter: id === index }"
        >
          {{ item.mallCategoryName }}
        </li>
      </ul>
    </div>
    <div class="wrapper" ref="wrapper">
      <ul class="bottom_shopping">
        <!--详细分类-->
        <li
          v-for="(item, index) in bxMallSubDto"
          :key="index"
          id="branch"
          @click="classification(index, item.mallSubId)"
          :class="{ branch: sum === index }"
        >
          {{ item.mallSubName }}
        </li>
      </ul>
    </div>
    <div class="information" ref="information">
      <ul class="content">
        <li
          v-for="(item, index) in dataList"
          :key="index"
          class="li"
          @click="Commoditydetails(item.id)"
        >
          <div class="imgs">
            <img :src="item.image" :alt="item.name" class="imges" />
          </div>
          <div class="text">
            <div class="text_X">{{ item.name }}</div>
            <div class="text_Y">
              <span class="text_Y_Originalprice">￥{{ item.orl_price }}</span>
              <span class="text_Y_Presentprice"
                >￥{{ item.present_price }}</span
              >
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
  name: "classification",
  components: {},
  props: {},
  data() {
    return {
      dataList: [], //接收详细分类以后商品的单个信息
      category: [], //接收商品分类数据
      bxMallSubDto: [], //接收商品详细分类数据
      sum: 1, //记录Fruits被选中
      id: 0
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.category = res.data.category;
        console.log(res, 5555);
      } catch (e) {
        console.log(e);
      }
    },
    async classification(index, id) {
      try {
        let res = await this.$api.category(id);
        this.sum = index;
        this.dataList = res.dataList;
        console.log(this.dataList);
      } catch (e) {
        console.log(e);
      }
    },
    click(index, name) {
      this.id = index;
      this.bxMallSubDto = name;
    },
    //商品详情传值与跳转路由
    Commoditydetails(id) {
      this.$router.push({ name: "CommodityDetails", query: { goodsId: id } });
    }
  },
  mounted() {
    this.id = Number(this.$route.query.id) - 1;
    this.recommend();
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        startX: 0,
        click: true,
        scrollX: true
      });
    });
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.information, {
        startY: 0,
        click: true,
        scrollY: true
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
#classification {
  .classification_top {
    line-height: 50px;
    font-weight: bold;
    font-size: 18px;
  }
  .top_shopping {
    z-index: 10;
    position: fixed;
    top: 50px;
    bottom: 50px;
    width: 20%;
    background-color: #f2f2f2;
    .sidebar {
      .sidebar_sort {
        line-height: 50px;
        text-align: center;
        border-bottom: 2px solid #fff;
      }
    }
  }
}
.wrapper {
  display: flex;
  background-color: #f2f2f2;
  height: 50px;
  line-height: 50px;
  position: fixed;
  top: 50px;
  right: 0;
  width: 80%;
  .bottom_shopping {
    display: flex;
    flex: 1;
    /*justify-content: space-between;*/
    #branch {
      padding: 0 5px 0 5px;
      width: 80px;
    }
    .branch {
      border-bottom: 2px solid #f45;
    }
  }
}
.gutter {
  background-color: #f45;
  color: #d2591b;
}
.information {
  overflow: hidden;
  width: 80%;
  position: fixed;
  top: 100px;
  right: 0px;
  bottom: 50px;
  .content {
    flex: 1;
    flex-direction: column;
    .li {
      display: flex;
      .imgs {
        margin: 10px;
        border: 1px solid #f2f2f2;
        .imges {
          height: 70px;
        }
      }
      .text {
        .text_X {
          text-align: left;
          line-height: 30px;
          width: 100%;
          font-size: 18px;
          color: #f45;
        }
        .text_Y {
          font-size: 15px;
          text-align: left;
          .text_Y_Originalprice {
            color: #f45;
          }
          .text_Y_Presentprice {
            color: #f2f2f2;
            padding-left: 10px;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>
