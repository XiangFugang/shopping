<template>
  <div>
    <div class="Floor1_top">
      <div class="Floor1_top_lfte">3F</div>
      <div class="Floor1_top_text">{{floorName.floor3}}</div>
    </div>
    <div class="Floor1_map">
      <div class="Floor1_map_top">
        <div class="Fruitdrop" v-if="floor3[0]"><img :src="floor3[0].image" alt="水果糖" /></div>
        <div class="snacks">
          <div class="Cookies" v-if="floor3[1]"><img :src="floor3[1].image" alt="" /></div>
          <div class="Cake" v-if="floor3[2]"><img :src="floor3[2].image" alt="" /></div>
        </div>
      </div>
      <div class="Floor1_map_bottom">
        <div class="Floor1_map_bottom_left" v-if="floor3[3]">
          <img :src="floor3[3].image" alt="" />
        </div>
        <div class="Floor1_map_bottom_rgiht" v-if="floor3[4]">
          <img :src="floor3[4].image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor3",
  components: {},
  props: {},
  data() {
    return {
      floor3: [],
      floorName:{}
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        this.floor3 = res.data.floor3;
        this.floorName = res.data.floorName;
        console.log(this.floor3);
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
.Floor1_map {
  .Floor1_map_top {
    display: flex;
    .Fruitdrop {
      width: 49%;
      border-right: 2px solid #f2f2f2;
      border-bottom: 2px solid #f2f2f2;
      img {
        width: 100%;
      }
    }
  }
  .snacks {
    width: 50%;
    .Cookies {
      border-bottom: 2px solid #f2f2f2;
      img {
        width: 100%;
      }
    }
    .Cake {
      border-bottom: 2px solid #f2f2f2;
      img {
        width: 100%;
      }
    }
  }
}
.Floor1_map_bottom {
  display: flex;
  .Floor1_map_bottom_left {
    width: 49%;
    border-right: 2px solid #f2f2f2;
    img {
      width: 100%;
    }
  }
  .Floor1_map_bottom_rgiht {
    width: 50%;
    img {
      width: 100%;
    }
  }
}
</style>
