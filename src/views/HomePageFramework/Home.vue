<template>
  <!--首页商城-->
  <div>
    <van-row>
      <van-col span="5">
        <div
          class="position"
          v-if="this.position === ''"
          @click="City('/Location')"
        >
          <van-loading color="#1989fa" />
        </div>
        <div v-else class="position" @click="City('/Location')">
          {{ position }}
        </div></van-col
      >
      <van-col span="15">
        <van-search
          placeholder="请输入搜索关键词"
          use-action-slot
          bind:search="onSearch"
          @click="focus"
        >
        </van-search>
      </van-col>
      <van-col span="4">
        <div class="sou" @click="sou">搜索</div>
      </van-col>
    </van-row>
    <!--轮播图-->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(item, index) in data.slides"
        :key="index"
        content="one"
      >
        <img :src="item.image" alt="l" class="imgs" />
      </van-swipe-item>
    </van-swipe>
    <!--    导航菜单-->
    <div class="aaa">
      <ul class="bbb">
        <li
          v-for="(item, index) in data.category"
          :key="index"
          @click="click(item.mallCategoryId)"
        >
          <img :src="item.image" alt="index" class="category" />
          <div>{{ item.mallCategoryName }}</div>
        </li>
      </ul>
      <div class="shell">
        <img :src="data.advertesPicture.PICTURE_ADDRESS" alt="" class="log" />
      </div>
    </div>
    <Scroll></Scroll>
    <floor1></floor1>
    <floor2></floor2>
    <floor3></floor3>
    <floor4></floor4>
    <van-popup v-model="show" position="top" :style="{ height: '100%' }">
      <Searchhistory></Searchhistory>
    </van-popup>
  </div>
</template>

<script>
import Scroll from "../../components/home/Scrolling";
import floor1 from "../../components/home/Floor1";
import floor2 from "../../components/home/Floor2";
import floor3 from "../../components/home/Floor3";
import floor4 from "../../components/home/Floor4";
import Searchhistory from "../../components/home/Searchhistory";
export default {
  name: "ShoppingMall",
  components: {
    Scroll,
    floor1,
    floor2,
    floor3,
    floor4,
    Searchhistory
  },
  props: {},
  data() {
    return {
      value: "",
      position: "", //接收城市名
      data: {},
      show: false
    };
  },
  methods: {
    //搜索按钮
    sou() {},
    //网络请求
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.data = res.data;
        console.log(this.data);
      } catch (e) {
        console.log(e);
      }
    },
    //商品分类点击传值
    click(id) {
      this.$router.push({
        name: "classification",
        query: { id: id, category: this.data.category }
      });
    },
    City(City) {
      this.$router.push(City);
    },
    //搜索框得到焦点
    focus() {
      this.show = !this.show;
    }
  },
  mounted() {
    let _this = this; //对this重新赋值
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB"
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息
        console.log(data);
        _this.position = data.addressComponent.city;
        _this.$store.state.city = data.addressComponent.city;
      }

      function onError(data) {
        console.log(data);
        // 定位出错
      }
    });
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
.position {
  line-height: 54px;
}
.van-row {
  background-color: #f2f2f5;
}
.van-search {
  background-color: #f2f2f5 !important;
}
.sou {
  line-height: 54px;
  font-size: 18px;
}
.imgs {
  width: 100%;
}
.aaa {
  background-color: #f2f2f2;
  padding: 10px 10px 10px 10px;
}
.category {
  width: 50px;
}
.bbb {
  padding: 20px 10px 10px 10px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  font-size: 13px;
}
.shell {
  padding: 20px 0 0 0;
}
.log {
  width: 100%;
}
</style>
