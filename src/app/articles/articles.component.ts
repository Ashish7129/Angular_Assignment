import { Component, OnInit, Input } from "@angular/core";
import { ArticlesService } from "../services/articles/articles.service";
import { from } from "rxjs";
import { ArticleListConfig, Article } from "../services/models/model";
@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.css"]
})
export class ArticlesComponent implements OnInit {
  results: Article[];
  article: Article;
  @Input()
  limit: number;
  totalPages: Array<number> = [1];
  loading = false;
  currentPage = 1;
  query: ArticleListConfig;
  constructor(private articles: ArticlesService) {}

  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      console.log(config);
      this.query = config;
      this.currentPage = 1;
      this.runquery();
    }
  }
  ngOnInit() {}
  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    console.log(pageNumber);
    this.runquery();
  }
  runquery() {
    this.loading = true;
    this.results = [];
    this.query.filters.limit = this.limit;
    this.query.filters.offset = this.limit * (this.currentPage - 1);
    console.log(this.query);
    this.articles.getAllGlobalArticles(this.query).subscribe(data => {
      this.results = data.articles;
      this.loading = false;
      this.totalPages = Array.from(
        new Array(Math.ceil(data.articlesCount / this.limit)),
        (val, index) => index + 1
      );
    });
  }

  onToggleFavorite(favorited) {
    //  this.article.favorited = favorited;
    console.log(favorited.target.value);
    // if (favorited) {
    //   this.article.favoritesCount++;
    // } else {
    //   this.article.favoritesCount--;
    // }
  }
}
