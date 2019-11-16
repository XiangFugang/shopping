<template>
  <!--评价中心-->
  <div class="shell">
    <div class="shell_all">
      <van-nav-bar title="评价中心" left-arrow @click-left="onClickLeft" />
      <div class="log">
        <img src="../imges/evaluate.jpg" alt="" class="imgs" />
      </div>
      <div class="Label">
        <div
          class="complete"
          :class="{ look: active === 1 }"
          @click="Active(1)"
        >
          待评价
        </div>
        <div class="end" :class="{ look: active === 2 }" @click="Active(2)">
          已评价
        </div>
      </div>
    </div>
    <div class="shopping">
      <div v-if="active === 1">
        <no></no>
      </div>
      <div v-else>
        <yes></yes>
      </div>
    </div>
  </div>
</template>

<script>
import no from "../components/Evaluate/Tobeevaluated";
import yes from "../components/Evaluate/Alreadyevaluated";
export default {
  name: "EvaluationCenter",
  components: {
    no,
    yes
  },
  props: {},
  data() {
    return {
      active: 1
    };
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    //控制待评价/已评价
    Active(index) {
      this.active = index;
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.shell {
  .shell_all {
    position: relative;
    .log {
      z-index: -1;

      .imgs {
        width: 100%;
      }
    }

    .Label {
      height: 50px;
      line-height: 50px;
      position: absolute;
      bottom: -25px;
      left: 50%;
      margin-left: -45%;
      display: flex;
      justify-content: space-around;
      font-size: 20px;
      border: 1px solid #f2f2f2;
      background-color: white;
      z-index: 9999;
      border-radius: 5px;
      width: 90%;
      box-shadow: 0px 5px 5px 0px #ccc;
      .complete {
        width: 30%;
      }
      .end {
        width: 30%;
      }
      .look {
        border-bottom: 4px solid #f45;
      }
    }
  }
  .shopping{
    padding-top: 35px;
  }
}
</style>
