export class User {
  firstname: string;
  lastname: string;
  email: string;
  

  constructor(obj?: any) {
      this.firstname = obj ? obj.firstname : '';
      this.lastname = obj ? obj.lastname : '';
      this.email = obj ? obj.email : '';
  }
}
  