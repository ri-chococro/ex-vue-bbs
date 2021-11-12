<template>
  <div class="bbs">
    <div>
      投稿者名：
      <input type="text" v-model="articleName" />
    </div>
    <div>
      投稿内容：
      <textarea cols="30" rows="10" v-model="articleContent"></textarea>
    </div>
    <button type="button" v-on:click="addArticle">記事投稿</button>
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
import { Article } from "@/types/article";

@Component
export default class Bbs extends Vue {
  // 最新の投稿記事一覧
  private currentArticleList = [];
  // 入力された投稿者指名
  private articleName = "";
  // 入力された記事内容
  private articleContent = "";

  /**
   * Vuexストア内の投稿記事の情報を取得しcurrentArticleListに格納する.
   */
  created() {
    this.currentArticleList = this["$store"].getters.getArticles;
  }

  /**
   * Vuexストア内のミューテーションを使って同期処理.
   */
  addArticle() {
    this["$store"].commit("addArticle", {
      article: new Article(
        this.currentArticleList.length + 1,
        this.articleName,
        this.articleContent,
        []
      ),
    });
  }
}
</script>

<style></style>
