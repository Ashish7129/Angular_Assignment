import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user.model";
import { Profile } from "../services/models/model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  rootURL = environment.ApiUrl;
  constructor(private http: HttpClient) {}
  registerUser(user: User) {
    const body: any = {
      user: {
        username: user.username,
        password: user.password,
        email: user.email
      }
    };
    console.log(body);
    return this.http.post(this.rootURL + "/users", body);
  }

  userAuthentication(form: any) {
    const data: any = {
      user: form
    };
    console.log(data);

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "No-Auth": "True"
    });
    if (form.username) {
      return this.http.post(this.rootURL + "/users", data, {
        headers: reqHeader
      });
    } else {
      return this.http.post(this.rootURL + "/users/login", data, {
        headers: reqHeader
      });
    }
  }

  getUserClaims() {
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem("userToken")
    });
    return this.http.get(this.rootURL + "/user/", { headers: reqHeader });
  }

  getprofile(username: string) {
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem("userToken")
    });
    return this.http
      .get(this.rootURL + "/profiles/" + username, {
        headers: reqHeader
      })
      .pipe(map(data => data));
  }

  getUsername() {
    return window.localStorage["username"];
  }
}
