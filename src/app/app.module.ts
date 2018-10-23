import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { ArticlesComponent } from "./articles/articles.component";
import { HomeComponent } from "./home/home.component";
import { appRoutes } from "./routes";
import { SignInComponent } from "./sign-in/sign-in.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HeaderComponent } from "./layout/header/header.component";
import { NewarticleComponent } from "./newarticle/newarticle.component";
import { ProfileComponent } from "./profile/profile.component";
import { ArticlePageComponent } from "./article-page/article-page.component";

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    HomeComponent,
    SignInComponent,
    FooterComponent,
    HeaderComponent,
    NewarticleComponent,
    ProfileComponent,
    ArticlePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
