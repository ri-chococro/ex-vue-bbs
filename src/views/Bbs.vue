<template>
  <div class="bbs">
    <div>
      投稿者名：
      <input type="text" name="" id="" />
    </div>
    <div>
      投稿内容：
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
    <button type="button">記事投稿</button>
    <hr />
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
  // 最新の投稿記事一覧
  private currentArticleList = [];
  private articleName = "";
  private articleContent = "";
  /**
   * Vuexストア内の投稿記事の情報を取得しcurrentArticleListに格納する.
   */
  created() {
    this.currentArticleList = this["$store"].getters.getArticle;
  }

  addArticle() {
    this["$store"].commit("addArticle", item);
  }
}
</script>

<style></style>
