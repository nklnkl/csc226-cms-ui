import { Entity } from './entity';

export class Account extends Entity {
  private status: number;
  private role: number;
  private email: string;
  private password: string;
  private username: string;
  private bio: string;
  private location: string;

  constructor (object?: any) {
    if (object) {
      super(object);
      this.status = Number(object.status);
      this.role = Number(object.role);
      this.email = object.email;
      this.password = object.password;
      this.username = object.username;
      this.bio = object.bio;
      this.location = object.location;
    }
    else {
      super();
    }
  }

  public toObject () : any {
    let object: any;
    object.status = this.status;
    object.role = this.role;
    object.email = this.email;
    object.password = this.password;
    object.username = this.username;
    object.bio = this.bio;
    object.location = this.location;
    let superObject: any = super.toObject();
    return { ...superObject, ...object };
  }

  public getStatusString () : string {
    switch (this.status) {
      case 0: return 'active';
      case 1: return 'inactive';
      default: return 'error';
    }
  }

  public getRoleString () : string {
    switch (this.role) {
      case 0: return 'member';
      case 1: return 'admin';
      default: return 'error';
    }
  }

  public getStatus() : number {
    return this.status;
  }
  public getRole() : number {
    return this.role;
  }
  public getEmail() : string {
    return this.email;
  }
  public getPassword() : string {
    return this.password;
  }
  public getUsername () : string {
    return this.username;
  }
  public getBio () : string {
    return this.bio;
  }
  public getLocation () : string {
    return this.location;
  }

  public setStatus (status: number) : number {
    this.status = status;
    return this.status;
  }
  public setRole (role: number) : number {
    this.role = role;
    return this.role;
  }
  public setEmail (email: string) : string {
    this.email = email;
    return this.email;
  }
  public setPassword (password: string) : string {
    this.password = password;
    return this.password;
  }
  public setUsername (username: string) : string {
    this.username = username;
    return this.username;
  }
  public setBio (bio: string) : string {
    this.bio = bio;
    return this.bio;
  }
  public setLocation (location: string) : string {
    this.location = location;
    return this.location;
  }
}
