<template>
  <div class="lessonDetail">
    <div class="lesson_head">
      <video
        @timeupdate="timeupdate"
        @ended="playend"
        :src="videoUrl"
        autoplay="true"
        controls
        :poster="lessonDetail.img"
      ></video>
    </div>
    <div class="lesson_content">
      <div
        @click="handleLesson(item,index)"
        class="catalogue_wrap"
        v-for="(item,index) in lessonDetail.catalogue"
        :key="index"
      >
        <span v-if="currentIndex == index" class="active_icon"></span>
        <h4>{{item.name}}</h4>
        <img v-if="item.lock" src="/static/imgs/lock.jpg" alt>
        <img v-else src="/static/imgs/icon_r.jpg" alt>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lessonDetail: {},
      videoUrl: "",
      currentIndex: 0,
      duration: 0
    };
  },
  onLoad() {
    this.getData();
  },
  methods: {
    getData() {
      this.currentIndex = 0;
      this.$https
        .request({
          url: this.$interfaces.getCatalogue,
          mehtod: "get"
        })
        .then(res => {
          // console.log(res);
          this.lessonDetail = res;
          this.videoUrl = this.lessonDetail.catalogue[0].url;

          // 设置标题
          wx.setNavigationBarTitle({
            title: res.title
          });
          // 存储等级
          wx.setStorage({
            key: "grade",
            data: res.level
          });
        });
    },
    playend() {
      // 如果当前播放的不是最后一个视频,那么就跳转到下一个. 下一个视频解锁, 并且重置url
      // console.log(this.lessonDetail.catalogue);
      let catalogue = this.lessonDetail.catalogue;
      if (this.currentIndex < catalogue.length - 1) {
        this.currentIndex++;
        catalogue[this.currentIndex].lock = false;
        this.videoUrl = catalogue[this.currentIndex].url;
      }

      // 视频播放结束之后,更新数据
      this.setLearnTime();
    },
    handleLesson(item, index) {
      if (!item.lock) {
        this.videoUrl = item.url;
        this.currentIndex = index;
      }
    },
    timeupdate(e) {
      // console.log(event);
      // 学习时长  分钟
      this.duration = Math.floor(e.mp.detail.duration / 60);
    },
    setLearnTime() {
      // 计算今天学习的总时长 = 当前视频时长 + 之前学习时长
      const time =
        this.duration + Number(wx.getStorageSync("learnInfo").minutes);
      wx.setStorage({
        key: "learnInfo",
        data: {
          minutes: time,
          percentage: Math.floor(time / 60 * 100) + "%"
        }
      });
    }
  }
};
</script>

<style>
.lesson_head {
  position: relative;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
}
video {
  width: 100%;
  height: 100%;
}
.lesson_content {
  background-color: #fff;
  padding: 16px;
  box-sizing: border-box;
}
.catalogue_wrap {
  margin-bottom: 16px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  padding: 16px;
  border-radius: 5px;
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.catalogue_wrap h4 {
  width: 95%;
  font-size: 15px;
  font-weight: bold;
}
.catalogue_wrap img {
  width: 20px;
  height: 20px;
}
.level {
  margin-right: 10px;
}
.active_icon {
  position: absolute;
  width: 3px;
  height: 80%;
  background-color: #009eef;
  left: 0;
  top: 10%;
}
</style>