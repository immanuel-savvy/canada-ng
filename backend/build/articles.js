"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update_article_image_hash = exports.update_article_category = exports.update_article = exports.trending_articles = exports.search_articles = exports.remove_trending_article = exports.remove_article_category = exports.remove_article = exports.new_reply = exports.new_comment = exports.new_article = exports.get_replies = exports.comments = exports.comment_rating = exports.comment_like = exports.comment_heart = exports.comment_dislike = exports.articles = exports.article_viewed = exports.article_categories = exports.article = exports.add_article_category = exports.GLOBAL_trending_articles = void 0;
var _conn = require("../ds/conn");
var _utils = require("./utils");
const articles = (req, res) => {
  let {
    limit,
    skip,
    total_articles
  } = req.body;
  let articles_ = _conn.ARTICLES.read(null, {
    limit: Number(limit),
    skip
  });
  if (total_articles) articles_ = {
    articles: articles_,
    total_articles: _conn.ARTICLES.config.total_entries
  };
  res.json({
    ok: true,
    message: "articles fetched",
    data: articles_
  });
};
exports.articles = articles;
const search_articles = (req, res) => {
  let {
    search_param,
    limit,
    exclude
  } = req.body;
  let articles = _conn.ARTICLES.read(null, {
    limit: Number(limit),
    search_param,
    exclude
  });
  res.json({
    ok: true,
    message: "article search results",
    data: articles
  });
};
exports.search_articles = search_articles;
const update_article_image_hash = (req, res) => {
  let {
    article,
    image_hash
  } = req.body;
  _conn.ARTICLES.update(article, {
    image_hash
  });
  res.end();
};
exports.update_article_image_hash = update_article_image_hash;
const new_article = (req, res) => {
  let article = req.body;
  article.image = (0, _utils.save_image)(article.image);
  article.views = 0;
  article.categories = article.categories.map(cat => cat._id);
  let result = _conn.ARTICLES.write(article);
  article._id = result._id;
  article.created = result.created;
  if (article.trending) article.trending = _conn.TRENDING_ARTICLES.write({
    article: article._id
  })._id;
  _conn.ARTICLE_CATEGORIES.update_several(article.categories, {
    articles: {
      $push: article._id
    }
  });
  res.json({
    ok: true,
    message: "article created",
    data: article
  });
};
exports.new_article = new_article;
const remove_trending_article = (req, res) => {
  let {
    trending
  } = req.params;
  _conn.TRENDING_ARTICLES.remove(trending);
  res.json({
    ok: true,
    message: "article removed from trending",
    data: trending
  });
};
exports.remove_trending_article = remove_trending_article;
const trending_articles = (req, res) => {
  let {
    limit
  } = req.params;
  let articles = _conn.TRENDING_ARTICLES.read(null, {
    limit: Number(limit)
  });
  res.json({
    ok: true,
    message: "trending articles",
    data: articles.map(art => art.article)
  });
};
exports.trending_articles = trending_articles;
const update_article = (req, res) => {
  let article = req.body;
  let {
    image,
    title,
    sections,
    categories,
    _id
  } = article;
  image = (0, _utils.save_image)(image);
  categories = categories && categories.map(cat => cat._id);
  _conn.ARTICLES.update(_id, {
    image,
    title,
    sections,
    categories
  });
  res.json({
    ok: true,
    message: "article updated",
    data: article
  });
};
exports.update_article = update_article;
const remove_article = (req, res) => {
  let {
    article
  } = req.params;
  let result = _conn.ARTICLES.remove(article);
  (0, _utils.remove_image)(result.image);
  _conn.ARTICLE_CATEGORIES.update_several(result.categories, {
    articles: {
      $splice: article
    }
  });
  res.json({
    ok: true,
    message: "article removed",
    data: result
  });
};
exports.remove_article = remove_article;
const article_categories = (req, res) => {
  res.json({
    ok: true,
    message: "article categories",
    data: _conn.ARTICLE_CATEGORIES.read()
  });
};
exports.article_categories = article_categories;
const add_article_category = (req, res) => {
  let cat = req.body;
  let result = _conn.ARTICLE_CATEGORIES.write(cat);
  cat._id = result._id;
  cat.created = result.created;
  res.json({
    ok: true,
    message: "article category added",
    data: cat
  });
};
exports.add_article_category = add_article_category;
const update_article_category = (req, res) => {
  let category = req,
    body;
  let result = _conn.ARTICLE_CATEGORIES.update(category._id, {
    title: category.title,
    tags: category.tags
  });
  res.json({
    ok: true,
    message: "article category updated",
    data: result
  });
};
exports.update_article_category = update_article_category;
const remove_article_category = (req, res) => {
  let {
    category
  } = req.params;
  let result = _conn.ARTICLE_CATEGORIES.remove(category);
  _conn.ARTICLES.update_several(result.articles, {
    categories: {
      $splice: category
    }
  });
  res.json({
    ok: true,
    message: "article category removed",
    data: category
  });
};
exports.remove_article_category = remove_article_category;
const comments = (req, res) => {
  let {
    article,
    skip,
    limit
  } = req.params;
  let comments_ = _conn.COMMENTS.read({
    item: article
  }, {
    skip,
    limit
  });
  res.json({
    ok: true,
    message: "article comments",
    data: comments_
  });
};
exports.comments = comments;
const new_comment = (req, res) => {
  let comment = req.body;
  let result = _conn.COMMENTS.write(comment);
  comment._id = result._id;
  comment.created = result.created;
  comment.item.startsWith("article") && _conn.ARTICLES.update(comment.item, {
    comments: {
      $inc: 1
    }
  });
  res.json({
    ok: true,
    message: "commented",
    data: comment
  });
};
exports.new_comment = new_comment;
const get_replies = (req, res) => {
  let {
    replies
  } = req.body;
  replies = _conn.REPLIES.read(replies);
  res.json({
    ok: true,
    message: "replies fetched",
    data: replies
  });
};
exports.get_replies = get_replies;
const new_reply = (req, res) => {
  let reply = req.body;
  let result = _conn.REPLIES.write(reply);
  reply._id = result._id;
  reply.created = result.created;
  _conn.COMMENTS.update(reply.comment, {
    replies: {
      $inc: 1
    }
  }, {
    subfolder: reply.article
  });
  reply.item.startsWith("article") && _conn.ARTICLES.update(reply.article, {
    comments: {
      $inc: 1
    }
  });
  res.json({
    ok: true,
    message: "replied",
    data: reply
  });
};
exports.new_reply = new_reply;
const GLOBAL_trending_articles = exports.GLOBAL_trending_articles = "trending_articles";
const article_viewed = (req, res) => {
  let {
    article
  } = req.params;
  let result = _conn.ARTICLES.update(article, {
    views: {
      $inc: 1
    }
  });
  if (result) {
    let trending_articles = _conn.GLOBALS.readone({
      global: GLOBAL_trending_articles
    });
    if (!trending_articles) {
      trending_articles = {
        global: GLOBAL_trending_articles,
        articles: new Array()
      };
      _conn.GLOBALS.write(trending_articles);
    }
    trending_articles = trending_articles.articles;
    if (trending_articles.length < 5) _conn.GLOBALS.update({
      global: GLOBAL_trending_articles
    }, {
      articles: {
        $push: {
          article,
          views: result.views
        }
      }
    });else {
      trending_articles = trending_articles.map(article_ => {
        if (article_.views < result.views) return {
          article,
          views: result.views
        };
        return article_;
      });
      _conn.GLOBALS.update({
        global: GLOBAL_trending_articles
      }, {
        articles: trending_articles
      });
    }
  }
  res.end();
};
exports.article_viewed = article_viewed;
const article = (req, res) => res.json({
  ok: true,
  message: "article",
  data: _conn.ARTICLES.readone(req.params.article)
});
exports.article = article;
const comment_like = (req, res) => {
  let {
    comment,
    item
  } = req.body;
  (comment.startsWith("comment") ? _conn.COMMENTS : _conn.REPLIES).update({
    _id: comment,
    [comment.startsWith("comment") ? "item" : "comment"]: item
  }, {
    likes: {
      $inc: 1
    }
  });
  res.end();
};
exports.comment_like = comment_like;
const comment_dislike = (req, res) => {
  let {
    comment,
    item
  } = req.body;
  (comment.startsWith("comment") ? _conn.COMMENTS : _conn.REPLIES).update({
    _id: comment,
    [comment.startsWith("comment") ? "item" : "comment"]: item
  }, {
    dislikes: {
      $inc: 1
    }
  });
  res.end();
};
exports.comment_dislike = comment_dislike;
const comment_heart = (req, res) => {
  let {
    comment,
    item
  } = req.body;
  (comment.startsWith("comment") ? _conn.COMMENTS : _conn.REPLIES).update({
    _id: comment,
    [comment.startsWith("comment") ? "item" : "comment"]: item
  }, {
    hearts: {
      $inc: 1
    }
  });
  res.end();
};
exports.comment_heart = comment_heart;
const comment_rating = (req, res) => {
  let {
    comment,
    item,
    rating
  } = req.body;
  (comment.startsWith("comment") ? _conn.COMMENTS : _conn.REPLIES).update({
    _id: comment,
    [comment.startsWith("comment") ? "item" : "comment"]: item
  }, {
    [String(rating)]: {
      $inc: 1
    }
  });
  res.end();
};
exports.comment_rating = comment_rating;