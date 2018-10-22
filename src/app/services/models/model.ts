export class Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export class User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export class Article {
  slug: string;
  title = "";
  description = "";
  body = "";
  tagList: Array<string> = [];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
export class Comment {
  id: number;
  body: string;
  createdAt: string;
  author: Profile;
}

export class ArticleListConfig {
  type = "all";

  filters: {
    tag?: any;
    author?: any;
    favorited?: any;
    limit?: any;
    offset?: any;
  } = {};
}
