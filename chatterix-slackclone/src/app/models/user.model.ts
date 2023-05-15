export class User {
  firstname: string;
  lastname: string;
  email: string;
  userId: string;
  userStatus: string;


  constructor(obj?: any) {
    this.firstname = obj ? obj.firstname : '';
    this.lastname = obj ? obj.lastname : '';
    this.email = obj ? obj.email : '';
    this.userId = obj ? obj.userId : '';
    this.userStatus = obj ? obj.userStatus : '';
  }

  /*public toJSON() {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      userId: this.userId,
      userStatus: this.userStatus
    };
  }*/
}
