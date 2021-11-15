<template>
  <div class="commentForm">
    <div class="error">
      {{ commentNameError }}
    </div>
    <div>名前：</div>
    <input type="text" v-model="commentName" />
    <div class="error">
      {{ commentContentError }}
    </div>
    <div>コメント：</div>
    <div>
      <textarea cols="30" rows="10" v-model="commentContent"></textarea>
    </div>
    <button type="button" v-on:click="addComment(articleId)">
      コメント投稿
    </button>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { Comment } from "@/types/comment";

@Component
export default class CompCommentForm extends Vue {
  // 入力されたコメント投稿者氏名
  private commentName = "";
  // 入力されたコメント内容
  private commentContent = "";
  // コメント投稿者名エラー
  private commentNameError = "";
  // コメント内容エラー
  private commentContentError = "";
  // エラー有無
  private noError = true;

  // Bbs.vueからもらってくる記事ID
  @Prop()
  private articleId!: number;

  /**
   * Vuexストア内のミューテーションを使って同期処理（新規コメント追加）.
   *
   * @remarks
   * Vuexストア内のミューテーションを呼ぶ前に入力値のエラーチェックを行う.
   *
   * @param articleId - 対象の記事ID
   */
  addComment(articleId: number) {
    this.commentNameError = "";
    this.commentContentError = "";
    this.noError = true;
    if (this.commentName === "") {
      this.commentNameError = "名前を入力してください";
      this.noError = false;
    } else if (this.commentName.length > 50) {
      this.commentNameError = "名前は50字以内で⼊⼒してください";
      this.noError = false;
    }

    if (this.commentContent === "") {
      this.commentContentError = "内容を入力してください";
      this.noError = false;
    }

    if (!this.noError) {
      return;
    }

    this["$store"].commit("addComment", {
      comment: new Comment(
        -1,
        this.commentName,
        this.commentContent,
        articleId
      ),
    });
    this.commentName = "";
    this.commentContent = "";
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
