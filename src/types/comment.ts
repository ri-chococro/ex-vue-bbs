export class Comment {
  /**
   * コメントを表すクラス.
   */

  constructor(
    // id
    private _id: number,
    // コメント投稿者名
    private _name: string,
    // コメント内容
    private _content: string,
    // 記事id
    private _articleId: number
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get content(): string {
    return this._content;
  }

  public set content(content: string) {
    this._content = content;
  }

  public get articleId(): number {
    return this._articleId;
  }

  public set articleId(articleId: number) {
    this._articleId = articleId;
  }
}
