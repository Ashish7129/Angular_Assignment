import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class PostarticleService {
  rootURL = environment.ApiUrl + "/articles";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Token" + " " + localStorage.getItem("userToken")
    })
  };
  constructor(private http: HttpClient) {}
  postArticleRequest(body) {
    return this.http.post(this.rootURL, body, this.httpOptions);
  }
  putArticleRequest(body, slug) {
    return this.http.put(this.rootURL + "/" + slug, body, this.httpOptions);
  }
}
