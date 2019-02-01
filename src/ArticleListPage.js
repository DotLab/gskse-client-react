import React from 'react';
import update from 'immutability-helper';

import {formatDate} from './utils';

function ArticleListItem({title, sourceName, date}) {
  return <div className="Mb(10px)">
    <div>
      <span className="Fw(b) C(dodgerblue) Cur(p) Td(u):h">MCD</span>
      <span className="Op(.5)"> | </span>
      <span className="Fw(b) C(dodgerblue) Cur(p) Td(u):h Mend(10px)">MSFT</span>
      <span className="C(dimgray)">{sourceName} • {formatDate(date)}</span>
    </div>
    <h3 className="Lh(1) Fz(1em) Mb(4px) Cur(p) C(dodgerblue):h">{title}</h3>
  </div>;
}

export default class ArticleListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {articles: []};
  }

  componentDidMount() {
    this.props.getArticles({creatorId: this.props.user.id}).then((articles) => {
      this.setState(update(this.state, {articles: {$push: articles}}));
    });
  }

  render() {
    return <div className="Mt(10px) W(1280px) Mx(a)">
      <h2 className="Fw(lr) Mb(10px)">My Articles</h2>
      <div className="W(50%)">
        {this.state.articles.map((article, i) => <ArticleListItem {...article} key={i}/>)}
      </div>
    </div>;
  }
}
