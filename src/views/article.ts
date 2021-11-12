export class Article {
  /**
   * 記事を表すクラス.
   *
   * @param _id
   * @param _name
   * @param _content
   * @param _commentList
   */
  constructor(
    // id
    private _id: number,
    // 投稿者名
    private _name: string,
    // 記事内容
    private _content: string,
    // コメント
    private _commentList: Array<Comment>
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

  public get commentList(): Array<Comment> {
    return this._commentList;
  }

  public set commentList(commentList: Array<Comment>) {
    this._commentList = commentList;
  }
}
