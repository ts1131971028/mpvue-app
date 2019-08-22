<template>
  <div class="mylesson">
    <div class="lesson_wrap" v-for="(item,index) in myLessons" :key="index" @click="switchToWatchLesson(item)">
      <img :src="item.img" alt="">\
      <div class="lesson_info">
        <h4>{{item.title}}</h4>
        <!-- 小程序 -->
        <progress :percent="item.progress" border-radius="8" strok-width="10"></progress>
        <div class="detail">
          <span v-if="item.bock">完成上个课程自动开启</span>
          <span v-else>已完成{{item.progress}}%</span>
          <img v-if="item.lock" src="/static/imgs/lock.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    myLessons() {
      return this.$store.getters.lessonInfo.mylessons;
    }
  },
  methods: {
    switchToWatchLesson(item){
      if(item.lock) return;
      else
        wx.navigateTo({
          url:"../watchLesson/main"
        })
    }
  }
};
</script>

<style>
.mylesson {
  padding: 10px 16px;
  box-sizing: border-box;
}
.lesson_wrap {
  margin-bottom: 16px;
  background-color: #fff;
  display: flex;
  height: 120px;
  border-radius: 5px;
}
.lesson_wrap img {
  height: 100%;
  width: 40%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.lesson_info {
  padding: 10px;
  box-sizing: border-box;
  width: 60%;
}
.lesson_info h4 {
  height: 50px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}
.lesson_info .detail {
  margin-top: 10px;
  font-size: 13px;
  color: #aaa;
  overflow: hidden;
}
.detail img {
  width: 16px;
  height: 16px;
  float: right;
}
</style>