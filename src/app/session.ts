import { Entity } from './entity';

export class Session extends Entity {
  private accountId: string;

  constructor (object?: any) {
    if (object) {
      super (object);
      this.setAccountId(object.account_id);
    }
    else {
      super();
    }
  }

  public toObject (): any {
    let object: any;
    object.account_id = this.accountId;
    let superObject: any = super.toObject();
    return { ...superObject, ...object };
  }

  public getAccountId (): string {
    return this.accountId;
  }

  public setAccountId (accountId: string): string {
    this.accountId = accountId;
    return this.accountId;
  }
}
