<template>
  <div class="bbs">
    <div>
      <div class="error">
        {{ articleNameError }}
      </div>
      投稿者名：
      <input type="text" v-model="articleName" />
    </div>
    <div>
      <div class="error">
        {{ articleContentError }}
      </div>
      投稿内容：
      <textarea cols="30" rows="10" v-model="articleContent"></textarea>
    </div>
    <button type="button" v-on:click="addArticle">記事投稿</button>
    <hr />

    <div v-for="(article, i) of currentArticleList" v-bind:key="article.id">
      <div>投稿者名：{{ article.name }}</div>
      <div>投稿内容：</div>
      <pre><div>{{ article.content }}</div></pre>
      <button type="button" v-on:click="deleteArticle(i)">記事削除</button>
      <div v-for="comment of article.commentList" v-bind:key="comment.id">
        <div>コメント者名：{{ comment.name }}</div>
        <div>コメント内容：{{ comment.content }}</div>
      </div>

      <CompCommentForm v-bind:article-id="article.id"></CompCommentForm>

      <!-- <div>名前：</div>
      <input type="text" v-model="commentName" />
      <div>コメント：</div>
      <div>
        <textarea cols="30" rows="10" v-model="commentContent"></textarea>
      </div>
      <button type="button" v-on:click="addComment(article.id)">
        コメント投稿
      </button> -->
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "@/types/article";
import CompCommentForm from "@/components/CommentForm.vue";

@Component({
  components: {
    CompCommentForm,
  },
})
export default class Bbs extends Vue {
  // 最新の投稿記事一覧
  private currentArticleList = [];
  // 入力された記事投稿者氏名
  private articleName = "";
  // 入力された記事内容
  private articleContent = "";
  // 名前入力エラー
  private articleNameError = "";
  // 記事内容エラー
  private articleContentError = "";
  // エラー有無
  private noError = true;

  // // 入力されたコメント投稿者氏名
  // private commentName = "";
  // // 入力されたコメント内容
  // private commentContent = "";

  /**
   * Vuexストア内の投稿記事の情報を取得しcurrentArticleListに格納する.
   */
  created() {
    this.currentArticleList = this["$store"].getters.getArticles;
  }

  /**
   * Vuexストア内のミューテーションを使って同期処理（新規記事追加）.
   *
   * @remarks
   * Vuexストア内のミューテーションを呼ぶ前に入力値のエラーチェックを行う.
   */
  addArticle() {
    this.articleNameError = "";
    this.articleContentError = "";
    this.noError = true;
    if (this.articleName === "") {
      this.articleNameError = "名前を入力してください";
      this.noError = false;
    } else if (this.articleName.length > 50) {
      this.articleNameError = "名前は50字以内で⼊⼒してください";
      this.noError = false;
    }

    if (this.articleContent === "") {
      this.articleContentError = "内容を入力してください";
      this.noError = false;
    }

    if (!this.noError) {
      return;
    }
    this.articleNameError = "";
    this.articleContentError = "";
    this.noError = true;
    if (this.articleName === "") {
      this.articleNameError = "名前を入力してください";
      this.noError = false;
    } else if (this.articleName.length > 50) {
      this.articleNameError = "名前は50字以内で⼊⼒してください";
      this.noError = false;
    }

    if (this.articleContent === "") {
      this.articleContentError = "内容を入力してください";
      this.noError = false;
    }

    if (!this.noError) {
      return;
    }
    this["$store"].commit("addArticle", {
      article: new Article(
        this["$store"].getters.getArticles[0].id + 1,
        this.articleName,
        this.articleContent,
        []
      ),
    });
    this.articleName = "";
    this.articleContent = "";
  }

  // /**
  //  * Vuexストア内のミューテーションを使って同期処理（新規コメント追加）.
  //  *
  //  * @param articleId - 対象の記事ID
  //  */
  // addComment(articleId: number) {
  //   this["$store"].commit("addComment", {
  //     comment: new Comment(
  //       -1,
  //       this.commentName,
  //       this.commentContent,
  //       articleId
  //     ),
  //   });
  //   this.commentName = "";
  //   this.commentContent = "";
  // }

  /**
   * Vuexストア内のミューテーションを使って同期処理（記事削除）.
   *
   * @articleIndex - 対象記事のindex番号
   */
  deleteArticle(articleIndex: number) {
    this["$store"].commit("deleteArticle", {
      articleIndex: articleIndex,
    });
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
