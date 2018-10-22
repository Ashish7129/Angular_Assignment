import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user.model";
import { Profile } from "../services/models/model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  rootURL = "https://conduit.productionready.io";
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
    return this.http.post(this.rootURL + "/api/users", body);
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
      return this.http.post(this.rootURL + "/api/users", data, {
        headers: reqHeader
      });
    } else {
      return this.http.post(this.rootURL + "/api/users/login", data, {
        headers: reqHeader
      });
    }
  }

  getUserClaims() {
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem("userToken")
    });
    return this.http.get(this.rootURL + "/api/user/", { headers: reqHeader });
  }

  getprofile(username: string) {
    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Token " + localStorage.getItem("userToken")
    });
    return this.http
      .get(this.rootURL + "/api/profiles/" + username, {
        headers: reqHeader
      })
      .pipe(map(data => data));
  }
}
