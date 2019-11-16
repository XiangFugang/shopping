<template>
  <!--购物车-->
  <div id="ShoppingCart">
    <div v-if="shopList.length !== 0">
      <div class="ShoppingCart">购物车</div>
      <div class="Choice">
        <div class="left">
          <div>
            <!--全选与反选-->
            <div v-if="radio" class="checkbox" @click="Choice">
              <div class="input">
                <img src="../../imges/xuanzhong.png" alt="选择" />
              </div>
              <div class="text">取消全选</div>
            </div>
            <div v-else class="checkbox" @click="Choice">
              <div class="input">
                <img src="../../imges/weixuanzhong.png" alt="未选择" />
              </div>
              <div class="text">全选</div>
            </div>
          </div>
          <!--====================================================================-->
        </div>
        <div class="right">
          <div class="text">
            <span>合计：</span>
            <span>￥{{ Total }}</span>
          </div>
          <div class="text_1">请确认订单</div>
        </div>
      </div>
      <div>
        <div
          class="Button"
          v-if="radio || (sum > 0 && sum != 0)"
          :class="{ bottoon: radio || (sum > 0 && sum != 0) }"
        >
          <van-button type="default" class="delete" @click="deleteShop"
            >删除</van-button
          >
          <van-button type="primary" class="Settlement" @click="Check"
            >去结算</van-button
          >
        </div>
        <div class="Button" v-else></div>
      </div>
      <div class="wrapper" ref="wrapper">
        <ul class="content">
          <li v-for="(item, index) in shopList" :key="index" class="content_li">
            <div class="left">
              <!--选择框-->
              <div @click="checke(item)" class="checke">
                <div v-if="item.check" class="checkall">
                  <img src="../../imges/xuanzhong.png" alt="" class="img" />
                </div>
                <div v-else class="checkall">
                  <img src="../../imges/weixuanzhong.png" alt="" class="img" />
                </div>
              </div>
              <!--==============================================================-->
              <div class="imgs">
                <img :src="item.image_path" alt="商品" class="img" />
              </div>
            </div>
            <div class="right">
              <div class="text">{{ item.name }}</div>
              <div class="bottom">
                <div class="texte">￥{{ item.present_price }}</div>
                <div class="plus">
                  <div class="left">
                    <img
                      @click="reduce(item)"
                      src="../../imges/jianhao.png"
                      alt="减号"
                      class="img"
                    />
                  </div>
                  <div class="center">
                    <input
                      type="number"
                      disabled="disabled"
                      class="input"
                      :value="item.count"
                    />
                  </div>
                  <div class="right">
                    <img
                      @click="plus(item)"
                      src="../../imges/jiahao.png"
                      alt="加号"
                      class="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <div class="Icon">
        <img src="../../imges/shop.png" alt="" class="imgs" />
      </div>
      <div class="te" @click="Shopping">去购物吧大佬</div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "ShoppingCart",
  components: {},
  props: {},
  data() {
    return {
      value: 0,
      radio: false, //全选
      shopList: [], //接收数组
      sum: 0, //用来记录单选的个数，并判断全选与反选
      arrid: [] //用来记录删除的id
    };
  },
  methods: {
    //全选框/反选框
    Choice() {
      this.radio = !this.radio;
      this.shopList.map(item => {
        item.check = this.radio;
      });
    },
    //查询获取购物车数据
    async getCard() {
      try {
        let res = await this.$api.getCard();
        this.shopList = res.shopList;
        //滚动
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startY: 0,
            click: true,
            scrollY: true
          });
        });
        console.log(this.shopList, 111);
      } catch (e) {
        console.log(e);
      }
    },
    //单选
    checke(item) {
      this.sum = 0;
      item.check = !item.check;
      this.shopList.map(item => {
        if (item.check) {
          this.sum++;
        }
      });
      if (this.shopList.length === this.sum) {
        this.radio = true;
      } else {
        this.radio = false;
      }
    },
    //购物车商品删除
    async deleteShop() {
      this.shopList.map(item => {
        if (item.check) {
          this.arrid.push(item.cid);
        }
      });
      try {
        let res = await this.$api.deleteShop(this.arrid);
        this.getCard();
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //无商品时跳转首页购物
    Shopping() {
      this.$router.push("/Home");
    },
    //结算
    Check() {
      this.$router.push({
        name: "OrderSettlement",
        query: {
          orderList: this.shopList.filter(item => {
            return item.check === true && item.count != 0;
          })
        }
      });
    },
    //商品数量加减-------------------------------------->
    //减
    reduce(item) {
      if (item.count > 0) {
        item.count -= 1;
      } else {
        item.count = 0;
      }
    },
    //加
    plus(item) {
      if (item.count < 999) {
        item.count += 1;
      } else {
        item.count = 0;
      }
    }
    //------------------------------------------------->
  },
  mounted() {
    this.getCard();
  },
  created() {},
  filters: {},
  computed: {
    //总计
    Total() {
      let num = 0;
      this.shopList.map(item => {
        if (item.check) {
          num = num + item.count * item.present_price;
        }
      });
      return num;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#ShoppingCart {
  .ShoppingCart {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f2f2f2;
    font-weight: bold;
  }
  .Choice {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f2f2f2;
    height: 70px;
    .left {
      position: relative;
      height: 70px;
      line-height: 70px;
      .checkbox {
        display: flex;
        .input {
          position: absolute;
          top: 50%;
          margin-top: -25px;
        }
      }
      .text {
        margin-left: 30px;
      }
    }
    .right {
      padding-right: 50px;

      .text {
        text-align: left;
        height: 35px;
        line-height: 35px;
      }
      .text_1 {
        text-align: left;
        height: 35px;
        line-height: 35px;
      }
    }
  }
  .Button {
    text-align: right;
    .delete {
      margin-right: 10px;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
    .Settlement {
      margin-right: 20px;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
  }
  .bottoon {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .wrapper {
    height: 500px;
    overflow: hidden;
    .content {
      .content_li {
        height: 106px;
        border-bottom: 1px solid #f2f2f2;
        justify-content: space-between;
        padding: 20px 30px 20px 0;
        display: flex;
        flex: 1;
        .left {
          display: flex;
          .checke {
            position: relative;
            .checkall {
              position: absolute;
              top: 50%;
              margin-top: -20px;
              .img {
              }
            }
          }
          .imgs {
            padding-left: 40px;

            .img {
              width: 90px;
              height: 90px;
              border: 1px solid #f2f2f2;
            }
          }
        }
        .right {
          padding-left: 20px;
          .text {
            width: 186px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
            height: 30px;
            line-height: 30px;
            color: #f45;
          }
          .bottom {
            display: flex;
            justify-content: space-between;
            padding-top: 30px;
            .texte {
              color: #f45;
              font-size: 18px;
            }
            .plus {
              display: flex;
              .left {
                width: 25px;
                height: 25px;
                .img {
                  width: 100%;
                }
              }
              .center {
                .input {
                  margin: 0 3px 0 3px;
                  font-size: 18px;
                  color: black;
                  font-weight: bold;
                  text-align: center;
                  width: 40px;
                  height: 25px;
                  border: 1px solid #f2f2f2;
                  border-radius: 5px;
                }
              }
              .right {
                width: 25px;
                height: 25px;
                .img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
.Icon {
  margin: 100px auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: coral;
  .imgs {
    padding-top: 27px;
    width: 75%;
  }
}
.te {
  width: 30%;
  margin: 0px auto;
  background-color: #f45;
  /*border: 1px solid #f45;*/
  color: white;
  border-radius: 5px;
  font-size: 18px;
  padding: 5px 10px 5px 10px;
}
</style>
