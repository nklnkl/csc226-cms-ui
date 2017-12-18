import * as Moment from 'moment';

export class Entity {
  private id: string;
  private created: number;
  private updated: number;

  constructor (object?: any) {
    if (object) {
      this.setId(object.id);
      this.setCreated(Number(object.created));
      this.setUpdated(Number(object.updated));
    }
  }

  public toObject () : any {
    let object: any;
    object.id = this.id;
    object.created = this.created;
    object.updated = this.updated;
    return object;
  }

  public getCreatedString () : string {
    return Moment(this.created * 1000).format("dddd, MMMM Do YYYY, h:mm a");
  }

  public getUpdatedString () : string {
    return Moment(this.updated * 1000).format("dddd, MMMM Do YYYY, h:mm a");
  }

  public getId () : string {
    return this.id;
  }
  public getCreated () : number {
    return this.created;
  }
  public getUpdated () : number {
    return this.updated;
  }

  public setId (id: string) : string {
    this.id = id;
    return this.id;
  }
  public setCreated (created: number) : number {
    this.created = created;
    return this.created;
  }
  public setUpdated (updated: number) : number {
    this.updated = updated;
    return this.updated;
  }
}
