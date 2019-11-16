<template>
  <!--订单结算-->
  <div id="OrderSettlement">
    <div class="top">
      <div class="Title">
        <van-nav-bar
          title="订单结算"
          left-arrow
          @click-left="onClickLeft"
        ></van-nav-bar>
      </div>
      <div class="condition">
        <div v-if="defaultAdd !== null" class="address">
          <div class="left_Icon">
            <img src="../imges/Location.png" alt="定位图标" class="imgs" />
          </div>
          <div class="Receiving_information">
            <div class="information_text">
              <div class="text_Receiving_goods">
                收货人：{{ defaultAdd.name }}
              </div>
              <div class="tel">{{ defaultAdd.tel }}</div>
            </div>
            <div class="address">收货地址：{{ defaultAdd.address }}</div>
            <div class="address_text">（收货不便时，可选择免费待收货服务）</div>
          </div>
          <div class="right_Icon">
            <img
              src="../imges/jian.png"
              alt="修改地址跳转图标"
              class="imgs"
              @click="Address"
            />
          </div>
        </div>
        <div v-else class="center" @click="Readd">
          点击添加收货地址
        </div>
      </div>
      <div class="bottom">
        <img src="../imges/caitiao.jpg" alt="" class="Demarcation" />
      </div>
    </div>
    <div class="warp" ref="wrapper">
      <div class="warp_cenyer">
        <div v-for="(item, index) in orderList" :key="index" class="details">
          <div class="left">
            <img :src="item.image_path" :alt="item.name" class="imgs" />
          </div>
          <div class="center">
            <div class="name_text">{{ item.name }}</div>
            <div class="price_text">￥{{ item.present_price }}</div>
          </div>
          <div class="right">X{{ item.count }}</div>
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="num"
      button-text="提交订单"
      @submit="onSubmit"
    ></van-submit-bar>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { Toast } from "vant";
export default {
  name: "OrderSettlement",
  components: {},
  props: {},
  data() {
    return {
      defaultAdd: null, //接收默认地址
      num: 0, //合计
      orderList: [], //从购物车接收的数据
      args: {
        orderId: []
      }
    };
  },
  methods: {
    //合计
    Total() {
      this.orderList.map(item => {
        this.num = this.num + item.count * item.present_price * 100;
      });
    },
    //返回
    onClickLeft() {
      this.$router.push("/ShoppingCart");
    },
    //获取默认地址信息
    async getDefaultAddress() {
      try {
        let res = await this.$api.getDefaultAddress();
        this.defaultAdd = res.defaultAdd;
      } catch (e) {
        console.log(e);
      }
    },
    //提交订单
    async onSubmit() {
      this.Biography();
      console.log(this.args, 222);
      let res = await this.$api.placeOrder(this.args);
      if (res.code === 200) {
        Toast(res.msg);
      } else {
        Toast(res.msg);
      }
    },
    //重新选择
    Address() {
      this.$router.push("/AddressManagement");
    },
    //跳转收货地址
    Readd() {
      this.$router.push("/AddressEditor");
    },
    //设置提价订单时传入的参数
    Biography() {
      this.args.address = this.defaultAdd.address;
      this.args.tel = this.defaultAdd.tel;
      this.args.totalPrice = `${this.num / 100}`;
      this.args.idDirect = false;
      this.args.count = `${this.orderList.length}`;
      this.orderList.map(item => {
        this.args.orderId.push(item.cid);
      });
    }
  },
  mounted() {
    //接收结算商品的数据
    this.orderList = this.$route.query.orderList;
    //滚动
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        startY: 0,
        click: true,
        scrollY: true
      });
    });
    //实时计算
    this.Total();
    this.getDefaultAddress();
    this.defaultAdd;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#OrderSettlement {
  .top {
    background-color: white;
    z-index: 100;
    .Title {
      background-color: white;
    }
    .condition {
      .center {
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 18px;
        background-color: white;
      }
      .address {
        display: flex;
        justify-content: space-between;
        .left_Icon {
          position: relative;
          .imgs {
            position: absolute;
            top: 50%;
            margin-top: -17px;
            width: 25px;
            height: 25px;
            padding: 0 5px;
          }
        }
        .Receiving_information {
          margin-left: 35px;
          .information_text {
            text-align: left;
            display: flex;
            justify-content: space-between;
            padding: 10px 5px;
            font-size: 15px;
            .text_Receiving_goods {
            }
            .tel {
            }
          }
          .address {
            font-size: 15px;
            padding: 10px 0;
          }
          .address_text {
            text-align: left;
            color: #d2591b;
          }
        }
        .right_Icon {
          padding-top: 35px;
          .imgs {
            width: 25px;
            height: 25px;
          }
        }
      }
    }

    .bottom {
      background-color: white;
      height: 7px;
      .Demarcation {
        width: 100%;
      }
    }
  }
  .warp {
    margin: 20px 0 0 0;
    height: 470px;
    overflow: hidden;
    .warp_cenyer {
      .details {
        display: flex;
        justify-content: space-between;
        padding: 20px 0 20px 10px;
        .left {
          width: 100px;
          height: 100px;
          border: 2px solid #f2f2f2;
          .imgs {
            width: 100%;
          }
        }
        .center {
          padding-left: 10px;
          .name_text {
            padding-top: 5px;
            line-height: 20px;
            color: black;
            font-size: 18px;
            text-align: left;
            max-width: 220px;
            overflow: hidden;
          }
          .price_text {
            color: #f45;
            font-size: 18px;
            text-align: left;
            line-height: 30px;
            padding-top: 40px;
          }
        }
        .right {
          padding-top: 80px;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
