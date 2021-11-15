<template>
  <div class="commentForm">
    <div>名前：</div>
    <input type="text" v-model="commentName" />
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

  @Prop()
  private articleId!: number;

  /**
   * Vuexストア内のミューテーションを使って同期処理（新規コメント追加）.
   *
   * @param articleId - 対象の記事ID
   */
  addComment(articleId: number) {
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

<style></style>
