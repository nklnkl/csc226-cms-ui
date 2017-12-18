import { Entity } from './entity';

export class Comment extends Entity {
  private account_id: string;
  private blog_post_id: string;
  private body: string;

  constructor (object?: any) {
    if (object) {
      super(object);
      this.account_id = object.account_id;
      this.blog_post_id = object.blog_post_id;
      this.body = object.body;
    }
    else {
      super();
    }
  }

  public toObject () : any {
    let object: any;
    object.account_id = this.account_id;
    object.blog_post_id = this.blog_post_id;
    object.body = this.body;
    let superObject: any = super.toObject();
    return { ...superObject, ...object };
  }

  public getAccountId () : string {
    return this.account_id;
  }
  public getBlogPostId () : string {
    return this.blog_post_id;
  }
  public getBody () : string {
    return this.body;
  }

  public setAccountId (account_id: string) : string {
    this.account_id = account_id;
    return this.account_id;
  }
  public setBlogPostId (blog_post_id: string) : string {
    this.blog_post_id = blog_post_id;
    return this.blog_post_id;
  }
  public setBody (body: string) : string {
    this.body = body;
    return this.body;
  }
}
