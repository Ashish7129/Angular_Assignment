import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AuthGuard } from "./auth/auth.guard";
import { Component } from "@angular/core";
import { NewarticleComponent } from "./newarticle/newarticle.component";
import { ProfileComponent } from "./profile/profile.component";
import { ArticlePageComponent } from "./article-page/article-page.component";

export const appRoutes: Routes = [
  { path: "login", component: SignInComponent },
  { path: "register", component: SignInComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "newarticle/:slug", component: NewarticleComponent },
  { path: "newarticle", component: NewarticleComponent },
  { path: "profile/:username", component: ProfileComponent },
  { path: "article/:slug", component: ArticlePageComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] }
  
];
