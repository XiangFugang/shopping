<template>
  <div id="personaldata">
    <div class="data">
      <div class="content">个人资料</div>
    </div>
    <div class="text"><van-cell title="github" border></van-cell></div>
    <div class="Head_portrait">
      <div class="portrait">头像</div>
      <div class="picture">
        <div class="imgs">
          <img :src="obj.avatar" alt="" class="img" />
        </div>
        <div class="Label"><van-icon name="arrow"></van-icon></div>
      </div>
    </div>
    <van-cell-group>
      <van-field
        label="用户名"
        v-model="obj.username"
        placeholder="请输入用户名"
      ></van-field>
      <van-field
        label="昵称"
        v-model="obj.nickname"
        placeholder="请输入昵称"
      ></van-field>
      <van-field
        label="性别"
        v-model="obj.gender"
        placeholder="请输入性别"
      ></van-field>
      <van-field
        label="邮箱"
        v-model="obj.email"
        placeholder="请输入邮箱"
      ></van-field>
      <van-field
        label="出生年月"
        v-model="Birthday"
        placeholder="请输入出生年月"
        @click="showPopup"
      ></van-field>
    </van-cell-group>
    <div class="bottom">
      <van-button type="primary" size="large" @click="Preservation"
        >保存</van-button
      >
      <div class="top"></div>
      <van-button type="default" size="large" @click="cancel">取消</van-button>
    </div>
    <!--生日时间选择-->
    <van-popup
      v-model="time"
      position="bottom"
      :style="{ width: '100%', height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="showPopup"
        @cancel="showPopup"
      >
      </van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Personaldata",
  components: {},
  props: {},
  data() {
    return {
      Birthday: "",
      Timeformat: "",
      day: "", //日
      month: "", //月
      year: "", //年
      obj: {},
      time: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(1975, 1, 1),
      maxDate: new Date(),
      currentDate: new Date()
    };
  },
  methods: {
    //时间选择弹出层点击确认/取消事件
    showPopup() {
      this.year = Number(this.$dayjs(this.currentDate).format("YYYY"));
      this.month = Number(this.$dayjs(this.currentDate).format("MM"));
      this.day = Number(this.$dayjs(this.currentDate).format("DD"));
      this.Birthday = this.year + "年"+ this.month+ "月" + this.day + "日"
      this.time = !this.time;
    },
    //点击取消按钮是关闭弹出层
    cancel() {
      this.$emit("close", false);
    },
    //保存点击事件/更改之后的值
    async Preservation() {
      try {
        let res = await this.$api.saveUser({
          gender: this.obj.gender,
          nickname: this.obj.nickname,
          username: this.obj.username,
          day: this.day,
          month: this.month,
          year: this.year
        });
        console.log(res);
        this.cancel()
      } catch (e) {
        console.log(e);
      }
    },
    //获取数据
    async user() {
      try {
        let res = await this.$api.user();
        this.Birthday = `${res.userInfo.year}年${res.userInfo.month}月${res.userInfo.day}日`;
        this.obj = res.userInfo;
        console.log(res, 333);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.user();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.data {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  .content {
    flex: 1;
    text-align: center;
  }
  .left {
    padding-left: 10px;
  }
}
.text {
  border-bottom: 1px solid #f2f2f2;
}
.text >>> .van-cell {
  text-align: left;
  font-weight: bold;
  font-size: 25px;
}
.Head_portrait {
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  height: 70px;
  line-height: 70px;
  font-size: 20px;
  .portrait {
    padding-left: 20px;
  }
  .picture {
    padding-top: 5px;
    display: flex;
    justify-content: space-between;
    .imgs {
      border: 1px solid #f2f2f2;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      .img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .Label {
      padding-left: 10px;
    }
  }
}
.bottom {
  padding: 30px 20px 0 20px;
  .top {
    height: 20px;
  }
}
</style>
