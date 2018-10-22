import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router
} from "@angular/router";
import { UserService } from "../shared/user.service";
import { Profile, User, ArticleListConfig } from "../services/models/model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  constructor(private route: Router, private userService: UserService) {}

  profile: Profile;
  currentUser: User;
  // isUser: boolean;
  articleConfig: ArticleListConfig = new ArticleListConfig();
  ngOnInit() {
    //console.log(this.route.url.split("/")[2]);
    this.userService
      .getprofile(this.route.url.split("/")[2])
      .subscribe((data: Profile) => {
        //console.log(data);
        this.profile = data.profile;
        this.articleConfig.filters.author = this.profile.username;
      });
    // Load the current user's data.
    this.userService.getUserClaims().subscribe((userData: User) => {
      this.currentUser = userData;
      //  this.isUser = this.currentUser.username === this.profile.username;
    });
  }
}
