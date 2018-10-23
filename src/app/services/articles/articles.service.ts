import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ArticleListConfig } from "../models/model";

@Injectable({
  providedIn: "root"
})
export class ArticlesService {
  URLarticles: string = "https://conduit.productionready.io/api/articles";
  URLtags: string = "https://conduit.productionready.io/api/tags";
  httpOptions: any = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Token" + " " + localStorage.getItem("userToken")
    })
  };
  constructor(private http: HttpClient) {}

  getAllGlobalArticles(config: ArticleListConfig): Observable<any> {
    return this.http.get(
      this.URLarticles +
        (config.type === "feed" ? "/feed" : "") +
        (config.filters.limit ? "?limit=" + config.filters.limit : "") +
        (config.filters.offset ? "&offset=" + config.filters.offset : "") +
        (config.filters.tag ? "&tag=" + config.filters.tag : "") +
        (config.filters.author ? "&author=" + config.filters.author : ""),
      this.httpOptions
    );
  }
  getAllTags(): Observable<any> {
    return this.http.get(this.URLtags);
  }

  getArticle(slug): Observable<any> {
    return this.http.get(this.URLarticles + "/" + slug);
  }
  getComments(slug): Observable<any> {
    return this.http.get(this.URLarticles + "/" + slug + "/comments");
  }

  postComment(slug, comment) {
    return this.http.post(
      this.URLarticles + "/" + slug + "/comments",
      comment,
      this.httpOptions
    );
  }
  deleteComment(id, slug) {
    console.log(id + "" + slug);
    return this.http.delete(
      this.URLarticles + "/" + slug + "/comments/" + id,
      this.httpOptions
    );
  }
  deleteArticle(slug) {
    console.log(slug);
    return this.http.delete(this.URLarticles + "/" + slug, this.httpOptions);
  }

  FavoriteArticle(slug): Observable<any> {
    return this.http.post(
      this.URLarticles + "/" + slug + "/favorite",
      "",
      this.httpOptions
    );
  }
  UnFavoriteArticle(slug): Observable<any> {
    return this.http.delete(
      this.URLarticles + "/" + slug + "/favorite",
      this.httpOptions
    );
  }
}
