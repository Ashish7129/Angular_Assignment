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

  constructor(private http: HttpClient) {}

  getAllGlobalArticles(config: ArticleListConfig): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token" + " " + localStorage.getItem("userToken")
      })
    };
    return this.http
      .get(
        this.URLarticles +
          (config.type === "feed" ? "/feed" : "") +
          (config.filters.limit ? "?limit=" + config.filters.limit : "") +
          (config.filters.offset ? "&offset=" + config.filters.offset : "") +
          (config.filters.tag ? "&tag=" + config.filters.tag : "") +
          (config.filters.author ? "&author=" + config.filters.author : ""),
        httpOptions
      )
      .pipe(map(data => data));
  }
  getAllTags(): Observable<any> {
    return this.http.get(this.URLtags).pipe(map(data => data));
  }
}
