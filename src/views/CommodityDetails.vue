<template>
  <!--商品详情-->
  <div id="CommodityDetails">
    <div class="Icon" @click="Return">
      <img src="../imges/jiantou.png" alt="" class="Icon_img" />
    </div>
    <div class="Rotationchart">
      <van-swipe :autoplay="3000" indicator-color="#f45" @change="onChange">
        <van-swipe-item content="one"
          ><img :src="goodsOne.image" alt="l" class="imgs"
        /></van-swipe-item>
        <van-swipe-item content="tow"
          ><img :src="goodsOne.image_path" alt="l" class="imgs"
        /></van-swipe-item>
        <div class="custom-indicator" slot="indicator">{{ current + 1 }}/2</div>
      </van-swipe>
    </div>
    <div class="Price">
      <div class="Tradename">{{ goodsOne.name }}</div>
      <div class="Price">￥{{ goodsOne.orl_price }}</div>
    </div>
    <div class="state">
      <div class="freight">运费：{{ goodsOne.__v }}</div>
      <div class="Surplus">剩余：{{ goodsOne.amount }}</div>
      <div v-if="Collection" class="love" :class="{ like: Collection }">
        <span class="Collection">收藏：</span>
        <span
          ><img src="../imges/heixin.png" alt="" class="img" @click="collection"
        /></span>
      </div>
      <div v-else class="love">
        <span class="Collection">取消收藏：</span>
        <span
          ><img
            src="../imges/hongxin.png"
            alt=""
            class="img"
            @click="collection"
        /></span>
      </div>
    </div>
    <div class="shop">
      <div class="left">
        <div class="left_img">
          <img src="../imges/dianpu.png" alt="店铺" class="dianpu" />
        </div>
        <div class="left_Fabulous">有赞的店铺</div>
        <div class="Official">官方</div>
      </div>
      <div class="right">
        <div class="Get_into">进入店铺</div>
        <div class="right_img">
          <img src="../imges/jian.png" alt="" class="jiantou" />
        </div>
      </div>
    </div>
    <div class="information">
      <div class="details" :class="{ color: !commodity }" @click="color">
        商品详情
      </div>
      <div class="comment" :class="{ color: commodity }" @click="color">
        商品评论
      </div>
    </div>
    <div class="bottom">
      <van-goods-action>
        <van-goods-action-icon
          icon="chat-o"
          text="客服"
          @click="onClickIcon"
        ></van-goods-action-icon>
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="onClickIcon"
        ></van-goods-action-icon>
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="onClickButton"
        ></van-goods-action-button>
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="onClickButton"
        ></van-goods-action-button>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "CommodityDetails",
  components: {},
  props: {},
  data() {
    return {
      commodity: false,
      Collection: true,
      current: 0,
      goodsId: "",
      goodsOne: {}
    };
  },
  methods: {
    //获取单个商品的详细的数据
    async goodOne() {
      try {
        let res = await this.$api.goodOne(this.goodsId);
        this.goodsOne = res.goods.goodsOne;
        console.log(this.goodsOne);
      } catch (e) {
        console.log(e);
      }
    },
    //反应轮播图张数
    onChange(index) {
      this.current = index;
    },
    onClickIcon() {
      // Toast('点击图标');
    },
    //添加到购物车
    async onClickButton() {
      // Toast('点击按钮');
      try {
        let res = await this.$api.addShop(this.goodsId);
        console.log(res);
        Toast(res.msg);
      } catch (e) {
        console.log(e);
      }
    },
    collection() {
      this.Collection = !this.Collection;
    },
    color() {
      this.commodity = !this.commodity;
    },
    Return() {
      this.$router.push("/Home");
    }
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    console.log(this.goodsId, 111);
    this.goodOne();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#CommodityDetails {
  .Icon {
    position: relative;
    top: 15px;
    left: 10px;
    z-index: 2;
    background-color: #7d7e80;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    .Icon_img {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -17px;
      margin-top: -15px;
      width: 30px;
      height: 30px;
    }
  }
  .Rotationchart {
    position: relative;
    .imgs {
      width: 100%;
      height: 350px;
    }
    .custom-indicator {
      text-align: center;
      height: 30px;
      width: 30px;
      line-height: 30px;
      border-radius: 50%;
      color: #f45;
      background-color: #f2f2f2;
      position: absolute;
      right: 10px;
      bottom: 0px;
    }
  }
  .bottom {
    .van-goods-action-button--first {
      border-radius: inherit;
    }
    .van-goods-action-button--last {
      border-radius: inherit;
    }
  }
  .Price {
    text-align: left;
    padding: 10px 0 10px 20px;
    border: 1px solid #f2f2f2;
    .Tradename {
      font-size: 18px;
    }
    .Price {
      border: 0;
      padding: 10px 0 0 0;
      color: #f45;
      font-size: 15px;
    }
  }
  .state {
    border: 1px solid #f2f2f2;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    .freight {
    }
    .Surplus {
    }
    .like {
      text-align: center !important;
    }
    .love {
      text-align: left;
      width: 100px;
      position: relative;
      .Collection {
        display: inline-block;
      }
      .img {
        position: absolute;
        right: 0px;
        top: 50%;
        margin-top: -13px;
        width: 30px;
        height: 30px;
      }
    }
  }
  .shop {
    /*margin-top: 10px;*/
    padding: 10px 10px 10px 0px;
    height: 30px;
    border: 1px solid #f2f2f2;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      .left_img {
        padding: 3px 5px 0 20px;
        .dianpu {
          width: 20px;
          height: 20px;
        }
      }
      .left_Fabulous {
        line-height: 30px;
      }
      .Official {
        margin-left: 10px;
        height: 20px;
        line-height: 20px;
        padding: 2px 5px;
        background-color: #f45;
        color: #fff;
        border-radius: 3px;
      }
    }
    .right {
      display: flex;
      .Get_into {
        line-height: 30px;
      }
      .right_img {
        padding-top: 4px;
        .jiantou {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .information {
    border-top: 1px solid #f2f2f2;
    margin-top: 10px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    .details {
      font-size: 18px;
      text-align: center;
      width: 50%;
    }
    .color {
      color: #f45;
    }
    .comment {
      font-size: 18px;
      text-align: center;
      width: 50%;
    }
  }
}
</style>
