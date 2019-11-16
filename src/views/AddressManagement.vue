<template>
  <!--地址列表-->
  <div>
    <van-nav-bar title="地址列表" left-arrow @click-left="onClickLeft">
    </van-nav-bar>
    <van-address-list
      v-model="address.id"
      :list="address"
      @add="onAdd"
      @edit="onEdit"
    ></van-address-list>
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "AddressManagement",
  components: {},
  props: {},
  data() {
    return {
      address: [] //接收地址信息
    };
  },
  methods: {
    //新增地址
    onAdd() {
      this.$router.push("/AddressEditor");
    },
    //编辑地址
    onEdit(item) {
      // console.log(item, 222);
      this.$router.push({ name: "AddressEditor", query: { item: item } });
    },
    //返回
    onClickLeft() {
      // this.$router.push("/OrderSettlement");
      this.$router.go(-1);
    },
    //接收地址数据
    async getAddress() {
      try {
        let res = await this.$api.getAddress();
        res.address.map((item, index) => {
          item.id = index + 1;
        });
        this.address = res.address;
        console.log(this.address, 111);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getAddress();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
