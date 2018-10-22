import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class PostarticleService {
  rootURL = "https://conduit.productionready.io/api/articles";
  constructor(private http: HttpClient) {}
  postArticleRequest(body) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Token" + " " + localStorage.getItem("userToken")
      })
    };
    return this.http.post(this.rootURL, body, httpOptions);
  }
}
