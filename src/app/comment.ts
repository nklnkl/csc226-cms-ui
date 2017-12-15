import { Entity } from './entity';

export class Comment extends Entity {
  private accountId: string;
  private blogPostId: string;
  private body: string;

  constructor (object?: any) {
    if (object) {
      super(object);
      this.accountId = object.account_id;
      this.blogPostId = object.blog_post_id;
      this.body = object.body;
    }
    else {
      super();
    }
  }

  public toObject () : any {
    let object: any;
    object.account_id = this.accountId;
    object.blog_post_id = this.blogPostId;
    object.body = this.body;
    let superObject: any = super.toObject();
    return { ...superObject, ...object };
  }

  public getAccountId () : string {
    return this.accountId;
  }
  public getBlogPostId () : string {
    return this.blogPostId;
  }
  public getBody () : string {
    return this.body;
  }

  public setAccountId (accountId: string) : string {
    this.accountId = accountId;
    return this.accountId;
  }
  public setBlogPostId (blogPostId: string) : string {
    this.blogPostId = blogPostId;
    return this.blogPostId;
  }
  public setBody (body: string) : string {
    this.body = body;
    return this.body;
  }
}
