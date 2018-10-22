import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/user.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  userClaims: any;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.authenticated();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.user(data.user);
      //console.log(this.userClaims);
    });
  }
  authenticated() {
    if (localStorage.getItem("userToken")) {
      return true;
    } else {
      return false;
    }
  }
  user(data) {
    this.userClaims = data;
  }
  Logout() {
    localStorage.removeItem("userToken");
    this.router.navigateByUrl("/login");
  }
}
