import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../shared/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  isLoginError: boolean = false;
  authType: string;
  title: string;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("userToken")) {
      this.router.navigate(["home"]);
    }
    if (this.router.url.split("/")[1] == "login") {
      console.log("login");
      this.authType = "login";
      this.title = "Sign In";
    } else {
      console.log("register");
      this.authType = "register";
      this.title = "Sign Up";
    }
  }
  OnSubmit(authform) {
    this.userService.userAuthentication(authform.value).subscribe(
      (data: any) => {
        console.log(data.user.token);
        localStorage.setItem("userToken", data.user.token);
        localStorage.setItem("username", data.user.username);
        this.router.navigate(["home"]);
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.router.navigate(["login"]);
      }
    );
  }
}
