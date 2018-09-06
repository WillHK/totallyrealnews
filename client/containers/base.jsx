import React from 'react';

const Article = (article) => (
  <div className="article">
    <div className="title">
      <a link={article.url}>{article.title}</a>
    </div>
    <div> className="date">
      {article.date}
    </div>
    <div className="excerpt">
      {article.excerpt}
    </div>
    <div className="site">
      {article.site}
    </div>
  </div>
);

class Base extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    fetch.get('/articles/top')
    .then((articles) => {
      this.setState(articles);
    });
  }

  render() {
    return (
      <div>
        <h1>Totally Real News for a Totally Real World</h1>
      </div>
      {this.state.articles ? this.state.articles.forEach((article) => {
        return (<Article article={article} />);
      })}
    );
  }
}

export default Base;
