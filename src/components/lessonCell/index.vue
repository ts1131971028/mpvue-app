<template>
  <div class="lesson_cell" @click="switchWebView">
    <img :src="img" alt="">
    <div class="cell_text">
      <h4>{{title}}</h4>
      <p>
        <span class="level">{{level}}</span>
        <span class="learn_count">{{count}}人学习</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    img:String,
    title:String,
    level:String,
    count:String,
    url:String
  },
  methods: {
    switchWebView() {
      wx.navigateTo({
        url:`../webView/main?url=${this.url}`
      })
    }
  },
};
</script>

<style>
.lesson_cell {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  height: 240rpx;
  padding: 20rpx 32rpx;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
}
.lesson_cell img {
  width: 40%;
  height: 200rpx;
  margin-right: 10px;
  border-radius: 5px;
}
.cell_text {
  width: 60%;
}
.cell_text h4 {
  margin-top: 10px;
  height: 60px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.cell_text p {
  font-size: 14px;
}
.cell_text p .level {
  color: #eb8831;
  margin-right: 20px;
}
.cell_text p .learn_count {
  color: #ccc;
}
</style>