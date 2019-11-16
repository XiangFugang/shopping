<template>
  <!--  搜索历史-->
  <div>
    <div>
      <van-row>
        <van-col span="5">
          <div class="position" @click="City('/Location')">
            {{ position }}
          </div></van-col
        >
        <van-col span="15">
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            use-action-slot
            bind:search="onSearch"
          >
          </van-search>
        </van-col>
        <van-col span="4">
          <div class="sou" @click="search">搜索</div>
        </van-col>
      </van-row>
    </div>
    <div class="loop">
      <div v-for="(item, index) in arr" :key="index">
        <div @click="close(item)" class="Label">{{ item }}</div>
      </div>
    </div>
   <div>
     <div @click="Eliminate" class="icon" v-if="arr.length > 0">
       <van-icon name="delete" size="30px" />
     </div>
     <div v-else></div>
   </div>
    <div v-for="(item, index) in list" :key="index" class="loop_li">
      <van-card :price="item.present_price" :thumb="item.image">
        <div slot="title">
          <div v-html="item.name"></div>
        </div>
      </van-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Searchhistory",
  components: {},
  props: {},
  data() {
    return {
      position: "", //地址
      value: "", //搜索框值
      arr: [], //搜索历史
      list: [] //搜索请求的数据
    };
  },
  methods: {
    //搜索
    async search() {
      try {
        let res = await this.$api.search(this.value);
        if (res.code === 200) {
          this.list = res.data.list;
          this.list.map(item => {
            let name = item.name.split(this.value);
            item.name = name.join(
              "<span style='color: #f45'>" + this.value + "</span>"
            );
          });
        }
        if (this.arr.indexOf(this.value) === -1) {
          this.arr.push(this.value);
          localStorage.setItem("Searchhistory", JSON.stringify(this.arr));
        }
        console.log(res, 111);
      } catch (e) {
        console.log(e);
      }
    },
    //清除历史搜索的记录
    Eliminate() {
      this.arr = [];
      localStorage.setItem("Searchhistory", JSON.stringify(this.arr));
    },
    //点击历史搜索记录搜索
    close(item) {
      this.value = item;
      this.search();
    }
    //join() 方法用于把数组中的所有元素放入一个字符串。
    //split() 方法用于把一个字符串分割成字符串数组。
  },
  mounted() {
    this.arr = JSON.parse(localStorage.getItem("Searchhistory"));
    this.position = this.$store.state.city;
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
.loop {
  text-align: left;
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  padding: 5px 10px 5px 0;
  .Label {
    margin-left: 20px;
    padding: 2px 3px;
    background-color: #f45;
    color: white;
  }
}
.icon {
  padding-left: 15px;
  text-align: left;
}
.van-card__content {
  text-align: left;
  font-size: 15px;
}
.van-card__price {
  height: 30px;
  line-height: 30px;
}
.loop_li {
  border-bottom: 3px solid #f2f2f2;
}
</style>
