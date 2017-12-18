import { Entity } from './entity';

export class BlogPost extends Entity {
  private account_id: string;
  private title: string;
  private body: string;
  private privacy: number;

  constructor (object?: any) {
    if (object) {
      super(object);
      this.account_id = object.account_id;
      this.title = object.title;
      this.body = object.body;
      this.privacy = Number(object.privacy);
    }
    else {
      super();
    }
  }

  public toObject () : any {
    let object: any;
    object.account_id = this.account_id;
    object.title = this.title;
    object.body = this.body;
    object.privacy = this.privacy;
    let superObject: any = super.toObject();
    return { ...superObject, ...object };
  }

  public getPrivacyString () : string {
    switch(this.privacy) {
      case 0: return 'public';
      case 1: return 'private';
      default: return 'error';
    }
  }

  public getAccountId () : string {
    return this.account_id;
  }
  public getTitle () : string {
    return this.title;
  }
  public getBody () : string {
    return this.body;
  }
  public getPrivacy () : number {
    return this.privacy;
  }

  public setAccountId (account_id: string) : string {
    this.account_id = account_id;
    return this.account_id;
  }
  public setTitle (title: string) : string {
    this.title = title;
    return this.title;
  }
  public setBody (body: string) : string {
    this.body = body;
    return this.body;
  }
  public setPrivacy (privacy: number) : number {
    this.privacy = privacy;
    return this.privacy;
  }
}
