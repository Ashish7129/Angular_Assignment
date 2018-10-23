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
  article: Article;
  constructor(
    private postarticleservice: PostarticleService,
    private route: Router,
    private router: ActivatedRoute,
    private articleservice: ArticlesService
  ) {}

  ngOnInit() {
    this.slug = this.router.snapshot.params["slug"];
    this.articleservice.getArticle(this.slug).subscribe(data => {
      this.article = data.article;
      console.log(this.article);
    });
  }
  submitArticle(form: NgForm) {
    this.slug = this.router.snapshot.params["slug"];
    const obj = {
      article: {
        title: form.value.title,
        description: form.value.description,
        body: form.value.body
      }
    };
    console.log(obj);
    if (this.slug == "") {
      this.postarticleservice.postArticleRequest(obj).subscribe(
        data => {
          console.log(data);
          this.route.navigateByUrl("/");
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.postarticleservice
        .putArticleRequest(obj, this.slug)
        .subscribe(data => {
          console.log(data);
          this.route.navigateByUrl("/profile/" + this.article.author.username);
        });
    }
  }
}
