<template>
  <!--编辑地址-->
  <div>
    <van-nav-bar
      title="编辑地址"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <van-address-edit
      :area-list="ExternalFile"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      :address-info="areaList"
    ></van-address-edit>
  </div>
</template>

<script>
import { Toast } from "vant";
import area from "../ExternalFile/area";
export default {
  name: "AddressEditor",
  components: {},
  props: {},
  data() {
    return {
      areaList: {},
      ExternalFile: {}
    };
  },
  methods: {
    //返回
    onClickLeft() {
      this.$router.push("/AddressManagement");
    },
    //保存
    async onSave(content) {
      content.address = `${content.province}${content.city}${content.county}${content.addressDetail}`;
        console.log(this.areaList,111);
        console.log(content.id,222);
        content.id = this.areaList ? this.areaList._id : undefined;
      try {
        let res = await this.$api.postAddress(content);
        // console.log(res, 11111111);
        if (res.code === 200) {
          Toast(res.msg);
          // this.$router.push("/AddressManagement");
        } else {
          Toast(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //删除
    async onDelete(content) {
      try {
        let res = await this.$api.deleteAddress(content._id);
        this.$router.push("/AddressManagement");
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //接收地址列表出入的编辑的地址信息
    Receivingaddress() {
      this.areaList = this.$route.query.item;
    }
  },
  mounted() {
    this.ExternalFile = area;
    console.log(this.areaList);
    this.Receivingaddress();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
