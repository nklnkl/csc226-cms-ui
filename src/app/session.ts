import { Entity } from './entity';

export class Session extends Entity {
  private account_id: string;

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
    object.account_id = this.account_id;
    let superObject: any = super.toObject();
    return { ...superObject, ...object };
  }

  public getAccountId (): string {
    return this.account_id;
  }

  public setAccountId (account_id: string): string {
    this.account_id = account_id;
    return this.account_id;
  }
}
