import { Entity } from './entity';

export class BlogPost extends Entity {
  private accountId: string;
  private title: string;
  private body: string;
  private privacy: number;

  constructor (object?: any) {
    if (object) {
      super(object);
      this.accountId = object.account_id;
      this.title = object.title;
      this.body = object.body;
      this.privacy = object.privacy;
    }
    else {
      super();
    }
  }

  public toObject () : any {
    let object: any;
    object.account_id = this.accountId;
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
    return this.accountId;
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

  public setAccountId (accountId: string) : string {
    this.accountId = accountId;
    return this.accountId;
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
