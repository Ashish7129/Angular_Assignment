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
  @Input()
  limit: number;
  Article: Article;
  totalPages: Array<number> = [1];
  loading = false;
  currentPage = 1;
  query: ArticleListConfig;
  isSubmitting: boolean = false;
  constructor(private articles: ArticlesService) {}

  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      // console.log(config);
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

  onToggleFavorite(Article) {
    console.log(Article.favorited);
    console.log(Article.slug);
    this.isSubmitting = true;
    //console.log(favorited.target.innerText);
    if (!Article.favorited) {
      this.articles.FavoriteArticle(Article.slug).subscribe(data => {
        console.log(data);
        Article.favorited = true;
        this.isSubmitting = false;
        Article.favoritesCount++;
      });
    } else {
      this.articles.UnFavoriteArticle(Article.slug).subscribe(data => {
        console.log(data);
        this.isSubmitting = false;
        Article.favorited = false;
        Article.favoritesCount--;
      });
    }
  }
}
