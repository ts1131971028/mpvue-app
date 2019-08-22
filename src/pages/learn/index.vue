<template>
  <scroll-view class="learn" scroll-y>
    <div class="learn_info">
      <img src="/static/imgs/plan.jpg" alt />
      <div class="info_text">
        <h4>
          已学习
          <span>{{minutes}}</span>分钟
        </h4>
        <p>
          今日目标已完成
          <span>{{percentage}}</span>
        </p>
      </div>
    </div>
    <div class="my_lesson" v-if="mylessons.length > 0">
      <cartHeader title="我的课程" :lessonCount="lessonCount" @click="switchMyLesson"></cartHeader>
      <div class="lesson_wrap">
        <div class="lesson_scroll">
          <div class="lesson_card" v-for="(lesson,index) in mylessons" :key="index">
            <img :src="lesson.img" alt />
            <span>{{lesson.title}}</span>
          </div>
          <div class="lesson_card" @click="switchMyLesson">
            <img src="/static/imgs/lookall.jpg" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="start_lesson" @click="switchToWatchLesson">
      <button>进入课程</button>
    </div>
    <div class="hot_lesson">
      <cartHeader title="今日最热课程" :lessonCount="lessonCount" @click="switchToHotLesson"></cartHeader>
      <div v-for="(item,index) in hotLessons" :key="index">
        <lessonCell :img="item.img" :title="item.title" :level="item.level" :count="item.count" :url="item.url"></lessonCell>
      </div>
    </div>
  </scroll-view>
</template>
<script>
import cartHeader from "../../components/cartHeader/index";
import lessonCell from "../../components/lessonCell/index";
export default {
  data() {
    return {
      minutes: 0,
      percentage: "0%",
      lessonCount: 0,
      hotLessons: []
    };
  },
  onLoad () {
    this.getData();
  },
  computed: {
    mylessons() {
      const lessons = [];
      //获取课程
      const mylessons = this.$store.getters.lessonInfo.mylessons;
      //课程个数
      this.lessonCount = mylessons.length;
      //判断是否大于5，如果大于5显示前5个，否则显示所有课程
      const count = mylessons.length > 5 ? 5 : mylessons.length;

      for (let i = 0; i < count; i++) {
        lessons.push(mylessons[i]);
      }
      return lessons;
    }
  },
  components: {
    cartHeader,
    lessonCell
  },
  methods: {
    switchMyLesson() {
      wx.navigateTo({
        url: "../myLesson/main"
      });
    },
    switchToWatchLesson() {
      wx.navigateTo({
        url: "../watchLesson/main"
      });
    },
    switchToHotLesson() {
      wx.switchTab({
        url: "../lesson/main"
      })
    },
    getData () {
      this.$https.request({
        url: this.$interfaces.getHotLessons,
        method: "get"
      }).then(res => {
        console.log(res)
        this.hotLessons = res
      })
    }
  }
};
</script>
<style>
.learn {
  height: 100%;
  box-sizing: border-box;
}
.learn_info {
  padding: 10px;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
}
.learn_info img {
  width: 85px;
  height: 85px;
}
.info_text {
  padding: 10px;
}
.info_text h4 {
  font-weight: bold;
}
.info_text h4 span {
  color: #009eef;
}
.info_text p {
  color: #ccc;
  font-size: 14px;
  margin-top: 10px;
}
.info_text p span {
  color: #85c646;
}

.my_lesson .hot_lesson {
  width: 100%;
  margin-top: 16px;
  background-color: #fff !important;
  border: 1px solid #ebeef5;
}

.lesson_wrap {
  width: 100%;
  overflow-x: auto;
}
.lesson_scroll {
  max-width: 200%;
  min-width: 100%;
  display: flex;
  flex-direction: row;
}
.lesson_card {
  display: flex;
  flex-direction: column;
  min-width: 120px;
  padding: 10px 5px;
}
.lesson_card img {
  width: 100%;
  height: 100px;
  border-radius: 5px;
}
.lesson_card span {
  font-size: 14px;
  color: #333;
}
::-webkit-scrollbar {
  display: none;
}
.start_lesson {
  padding: 20px 0;
  box-sizing: border-box;
  text-align: center;
}
.start_lesson button {
  background-color: #fff;
  color: #009eef;
  width: 150px;
  border-radius: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.start_lesson button::after {
  border: none;
}
</style>
