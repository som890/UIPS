import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): []{
    const rolesData = localStorage.getItem('roles');
    if (rolesData) {
      return JSON.parse(rolesData);
    }
    return []; // Trả về mảng rỗng nếu không tìm thấy dữ liệu
   
  }
  // public getRoles(): [] {
  //   return JSON.parse(localStorage.getItem('roles'));
  // }
  

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | any {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isAdmin() {
    const roles: any[]  = this.getRoles();
    // console.log(roles);
    return roles[0].roleName == 'Admin'
  }
  public isUser() {
    const roles: any[]  = this.getRoles();
    // console.log(roles);
    return roles[0].roleName == 'User'
  }
}