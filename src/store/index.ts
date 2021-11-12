import Vue from "vue";
import Vuex from "vuex";
import { Article } from "@/types/article";
import { Comment } from "@/types/comment";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  }, // end state
  mutations: {
    addArticle(state, payload) {},
  },
  actions: {},
  /**
   * 投稿記事の情報を返す.
   *
   * @param state - stateを利用するための引数
   * @returns 投稿記事の情報
   */
  getters: {
    getArticle(state) {
      return state.articles;
    },
  },
  modules: {},
});
