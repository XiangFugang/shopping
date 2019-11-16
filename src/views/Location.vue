<template>
  <!--定位-->
  <div id="Location">
    <div class="top">
      <van-nav-bar title="城市列表" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="search">
      <van-search class="input" placeholder="请输入城市关键词" />
      <div class="City">当前城市</div>
    </div>
    <div class="Currentcity">
      <span class="City">{{ get }}</span>
    </div>
    <div class="Popular">热门城市</div>
    <ul class="City_name">
      <li>北京</li>
      <li>上海</li>
      <li>杭州</li>
      <li>重庆</li>
      <li>成都</li>
      <li>厦门</li>
    </ul>
    <div class="CitySearch">
      <van-index-bar>
        <div v-for="(item, index) in city" :key="index">
          <van-index-anchor :index="index" />
          <div v-for="cities in item" :key="cities.id">
            <van-cell :title="cities.name" />
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
// import city from "../http/city";
export default {
  name: "Location",
  components: {},
  props: {},
  data() {
    return {
      city: {}
    };
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.city = this.$city.data.cities;
    console.log(this.city);
  },
  created() {},
  filters: {},
  computed: {
    get() {
      return this.$store.state.city;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#Location {
  /*.top {*/
  /*  display: flex;*/
  /*  justify-content: space-between;*/
  /*  height: 50px;*/
  /*  width: 60%;*/
  /*  line-height: 50px;*/
  /*  font-size: 20px;*/
  /*  font-weight: bold;*/
  /*  .lfte {*/
  /*  }*/
  /*  .right {*/
  /*  }*/
  /*}*/
  .search {
    padding-top: 10px;
    background-color: #f2f2f2;
    .input {
      background-color: #f2f2f2 !important;
    }
    .City {
      padding: 0 0 10px 10px;
      font-size: 14px;
      text-align: left;
    }
  }
  .Currentcity {
    padding: 10px 20px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    text-align: left;
    .City {
      padding: 3px 30px 3px 30px;
      border: 1px solid #f2f2f2;
    }
  }
  .Popular {
    padding-left: 20px;
    text-align: left;
    line-height: 50px;
    background-color: #f2f2f2;
    font-size: 15px;
  }
  .City_name {
    display: flex;
    flex-wrap: wrap;
    li {
      /*flex: 5;*/
      margin: 10px 0 5px 28px;
      padding: 2px 5px 2px 5px;
      border: 1px solid #f2f2f2;
      width: 20%;
    }
  }
  .CitySearch {
    text-align: left;
    /*.aaa[data-v-f3f3eg9]{*/
    /*  font-size: 20px !important;*/
    /*  line-height: 25px !important;*/
    /*  color: #42b983;*/
    /*}*/
    /*.van-index-bar__index[data-v-f3f3eg9]{*/
    /*  font-size: 20px;*/
    /*  line-height: 25px;*/
    /*  color: #42b983;*/
    /*}*/
  }
}
</style>
