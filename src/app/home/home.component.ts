import { Component, OnInit } from "@angular/core";
import { ArticlesService } from "../services/articles/articles.service";
import { ArticleListConfig } from "../services/models/model";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  tags: Array<string>;
  tagsLoaded = false;
  listConfig: ArticleListConfig = new ArticleListConfig();

  constructor(private articles: ArticlesService, private router: Router) {}

  ngOnInit() {
    this.authenticated();
    this.getTags();
  }
  authenticated() {
    if (localStorage.getItem("userToken")) {
      this.setListTo("feed");
      return true;
    } else {
      this.setListTo("all");
      return false;
    }
  }
  getTags() {
    this.articles.getAllTags().subscribe(data => {
      this.tags = data.tags;
      this.tagsLoaded = true;
    });
  }
  setListTo(type: string = "", filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login  && !this.isAuthenticated
    if (type === "feed" && !this.authenticated) {
      this.router.navigateByUrl("/login");
      return;
    }

    // Otherwise, set the list object
    this.listConfig = { type: type, filters: filters };
    // console.log(this.listConfig);
  }
}
