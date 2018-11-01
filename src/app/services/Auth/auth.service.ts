import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUserDetails(username: any, password: any) {
    console.log(username);

    return this.http.post(environment.ApiUrl + "/users/login/", {
      user: {
        email: username,
        password: password
      }
    });
  }
}
