<template>
  <div class="lesson_all">
    <span>{{title}}</span>
    <span v-if="lessonCount>0">({{lessonCount}})</span>
    <span @click="$emit('click')" class="look_all">查看全部</span>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    lessonCount: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style>
.lesson_all {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  overflow: hidden;
}
.lesson_all .look_all {
  font-size: 12px;
  color: #aaa;
  float: right;
}
</style>