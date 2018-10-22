import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUserDetails(username: any, password: any) {
    console.log(username);

    return this.http.post(
      "https://conduit.productionready.io/api/users/login/",
      {
        user: {
          email: username,
          password: password
        }
      }
    );
  }
}
