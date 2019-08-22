<template>
  <web-view :src="url"></web-view>
</template>

<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  onLoad(option) {
    console.log(option),
    this.url = option.url;
  }
};
</script>

<style>
</style>