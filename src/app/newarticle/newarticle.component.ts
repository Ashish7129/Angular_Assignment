import { Component, OnInit, ViewChild } from "@angular/core";
import { PostarticleService } from "./postarticle.service";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Article } from "../services/models/model";
import { ArticlesService } from "../services/articles/articles.service";
@Component({
  selector: "app-newarticle",
  templateUrl: "./newarticle.component.html",
  styleUrls: ["./newarticle.component.css"]
})
export class NewarticleComponent implements OnInit {
  slug: string;
  article: any = { title: "", description: "", body: "", tagsList: [] };
  constructor(
    private postarticleservice: PostarticleService,
    private route: Router,
    private router: ActivatedRoute,
    private articleservice: ArticlesService
  ) {}

  ngOnInit() {
    if (this.router.snapshot.params.hasOwnProperty("slug")) {
      this.slug = this.router.snapshot.params["slug"];
      this.articleservice.getArticle(this.slug).subscribe(data => {
        this.article = data.article;
        console.log(this.article);
      });
    }
  }
  submitArticle(form: NgForm) {
    this.slug = this.router.snapshot.params["slug"];
    let tagslist = [];
    console.log(form.value);
    console.log(form.value.tagsList);
    tagslist = form.value.tagsList ? form.value.tagsList.split(" ") : [];
    const obj = {
      article: {
        title: form.value.title,
        description: form.value.description,
        body: form.value.body,
        tagList: tagslist
      }
    };
    console.log(obj);
    if (this.router.snapshot.params.hasOwnProperty("slug")) {
      console.log("in put");
      let totaltags =
        this.article.tagList.length > 0 ? this.article.tagList : [];
      console.log(totaltags);
      if (totaltags.length > 0) {
        totaltags.forEach(element => {
          obj.article.tagList.push(element);
        });
      }
      console.log(obj);
      this.postarticleservice
        .putArticleRequest(obj, this.slug)
        .subscribe(data => {
          console.log(data);
          this.route.navigateByUrl("/profile/" + this.article.author.username);
        });
    } else {
      this.postarticleservice.postArticleRequest(obj).subscribe(
        data => {
          console.log(data);
          this.route.navigateByUrl("/");
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
