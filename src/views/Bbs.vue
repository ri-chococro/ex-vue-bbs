<template>
  <div class="bbs">
    <div v-for="article of currentArticleList" v-bind:key="article">
      <div>投稿者名：{{ article.name }}</div>
      <div>投稿内容：</div>
      <div>{{ article.content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Bbs extends Vue {
  currentArticleList = [];

  created() {
    this.currentArticleList = this["$store"].getters.getArticle;
  }
}
</script>

<style></style>
