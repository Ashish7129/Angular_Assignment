import { Component, OnInit } from "@angular/core";
import { UserService } from "../../shared/user.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/services/models/model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  username: string = this.userService.getUsername();
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.authenticated();
  }
  authenticated() {
    if (localStorage.getItem("userToken")) {
      this.username = this.userService.getUsername();
      return true;
    } else {
      return false;
    }
  }
  Logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    this.router.navigateByUrl("/login");
  }
}
