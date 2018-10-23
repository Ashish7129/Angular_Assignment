import { Component, OnInit } from "@angular/core";
import { Article } from "../services/models/model";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticlesService } from "../services/articles/articles.service";
import { UserService } from "../shared/user.service";
import { injectComponentFactoryResolver } from "@angular/core/src/render3";

@Component({
  selector: "app-article-page",
  templateUrl: "./article-page.component.html",
  styleUrls: ["./article-page.component.css"]
})
export class ArticlePageComponent implements OnInit {
  article: Article;
  comments: any;
  isSubmitting: boolean = false;
  currentUser: any;
  canModify: any;
  constructor(
    private route: Router,
    private articleservice: ArticlesService,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.articleservice
      .getArticle(this.route.url.split("/")[2])
      .subscribe(data => {
        this.article = data.article;
        this.populateComments();
      });
    this.userservice.getUserClaims().subscribe((data: any) => {
      this.currentUser = data.user;
      console.log(this.currentUser);
      console.log(this.article);
    });
    // this..subscribe((data: { article: Article }) => {
    //   this.article = data.article;
    //   console.log(data.article);
    // Load the comments on this article
    // console.log(this.canModify);
  }

  populateComments() {
    this.articleservice
      .getComments(this.route.url.split("/")[2])
      .subscribe(data => {
        this.comments = data.comments;
        console.log(this.comments);
      });
  }

  addComment(commentBody) {
    const body = { comment: { body: commentBody.value } };
    console.log(body);
    this.isSubmitting = true;
    console.log("submitting the comment");
    commentBody.value = "";
    this.articleservice
      .postComment(this.route.url.split("/")[2], body)
      .subscribe(data => {
        console.log(data);
        this.isSubmitting = false;
        this.populateComments();
      });
  }
  deleteClicked(comment) {
    console.log(comment);
    this.articleservice
      .deleteComment(comment.id, this.route.url.split("/")[2])
      .subscribe(data => {
        console.log(data);
        this.populateComments();
      });
  }
  deleteArticle(slug) {
    console.log(slug);
    this.articleservice.deleteArticle(slug).subscribe(data => {
      console.log("deleted");
      this.route.navigateByUrl("/profile/" + this.currentUser.username);
    });
  }
}
