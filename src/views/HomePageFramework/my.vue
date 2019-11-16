<template>
  <!--我的-->
  <div id="my">
    <div class="Member_Center">会员中心</div>
    <InformationDisplay></InformationDisplay>
    <Orderlist></Orderlist>
    <OrderManagement></OrderManagement>
  </div>
</template>

<script>
import InformationDisplay from "../../components/MemberCenter/InformationDisplay";
import Orderlist from "../../components/MemberCenter/Orderlist";
import OrderManagement from "../../components/MemberCenter/OrderManagement";
export default {
  name: "my",
  components: {
    InformationDisplay,
    Orderlist,
    OrderManagement
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#my {
  .Member_Center {
    font-size: 20px;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 10px;
    height: 30px;
    line-height: 30px;
  }
}
</style>
