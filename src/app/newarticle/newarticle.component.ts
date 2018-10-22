import { Component, OnInit } from "@angular/core";
import { PostarticleService } from "./postarticle.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-newarticle",
  templateUrl: "./newarticle.component.html",
  styleUrls: ["./newarticle.component.css"]
})
export class NewarticleComponent implements OnInit {
  constructor(
    private postarticleservice: PostarticleService,
    private route: Router
  ) {}

  ngOnInit() {}
  submitArticle(form: NgForm) {
    const obj = {
      article: {
        title: form.value.title,
        description: form.value.description,
        body: form.value.body
      }
    };
    console.log(obj);
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
