import React from 'react';
import ReactMarkdown from 'react-markdown';

import ArticleCommentListItem from './ArticleCommentListItem';

import {avatarIconUrl, onTextareaChange, formatDate, formatNumber, formatNumberShort} from './utils';

const text = `0:00 Flowering Night (Night of Nights ver.)
2:32 Theme of Eastern Story (Title theme melody specifically)
2:45 Native Faith
3:05 Beloved Tomboyish Girl`;

export default class ArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.onTextareaChange = onTextareaChange.bind(this);

    this.onCancelClick = () => this.setState({text: '', textLineCount: 1});
    this.onSendClick = this.onSendClick.bind(this);

    this.state = {text: '', textLineCount: 1};
  }

  componentWillMount() {
    const title = this.props.match.params.title;
    this.props.getArticle({title}).then((article) => {
      console.log(article);
      this.setState(article);
      return this.props.getComments({targetId: article.id});
    }).then((comments) => {
      console.log(comments);
      this.setState({comments});
    });
  }

  onSendClick() {
    const text = this.state.text.trim();
    if (text) {
      this.props.postComment({targetId: this.state.id, text}).then((comments) => this.setState({commentCount: comments.length, comments}));
    }
  }

  render() {
    return <div className="Mt(20px)">
      <div className="W(600px) Mx(a)">
        <div className="Lh(1.15) Mb(40px)">
          <div className="C(dodgerblue)">Update</div>
          <div className="C(gray)">{formatDate(this.state.date)}</div>
        </div>
        <h2 className="Fz(3em) Lh(1.15) Mb(40px)">{this.state.title}</h2>
        <hr className="Op(.3) Mb(40px)"/>
        <div className="Mb(40px) Fz(1.5em)">{this.state.excerpt}</div>
      </div>

      <img className="W(800px) D(b) Mx(a) Bxsh($cardShadow) Bdrs(5px) Mb(40px)" src={this.state.coverUrl} alt=""/>

      <div className="article W(600px) Mx(a)">
        <ReactMarkdown source={this.state.markdown}/>
      </div>

      <div className="W(800px) Mx(a)">
        {/* views */}
        <hr className="Op(.3) Mb(20px)"/>
        <div className="Fl(end) C(gray) Lh(1.875em)">
          <span className="Cur(p) C(limegreen):h Mend(20px)"><b>U</b> {formatNumberShort(this.state.upVoteCount || 0)}</span>
          <span className="Cur(p) C(orange):h Mend(20px)"><b>D</b> {formatNumberShort(this.state.downVoteCount || 0)}</span>
          <span className="Cur(p) C(red):h"><b>L</b> {formatNumberShort(this.state.loveCount || 0)}</span>
        </div>
        <div className="Fz(1.25em) Mb(20px)">{formatNumber(this.state.viewCount || 0)} Views</div>
        {/* creator */}
        <div className="Mb(20px) Cf">
          <div className="W(10%) Fl(start)">
            <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
          </div>
          <div className="W(90%) Fl(start) Pstart(20px)">
            <div className="Fw(b)">{this.state.creatorName}</div>
            <div className="C(gray)">Published {formatDate(this.state.date)}</div>
          </div>
        </div>
        {/* comments */}
        <hr className="Op(.3) Mb(20px)"/>
        <div className="Fz(1.25em) Mb(20px)">{formatNumber(this.state.commentCount || 0)} Comments</div>
        <div className="Mb(20px) Cf">
          {/* left avatar */}
          <div className="W(10%) Fl(start)">
            <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
          </div>
          {/* right content */}
          <div className="W(90%) Fl(start) Pstart(20px)">
            {/* textarea */}
            <textarea className="W(100%)" placeholder="Add a public replay..." name="text" rows={this.state.textLineCount} value={this.state.text} onChange={this.onTextareaChange}/>
            {/* buttons */}
            <div className="Fl(end)">
              <button className="Mend(5px)" onClick={this.onCancelClick}>Cancel</button>
              <button onClick={this.onSendClick}>Comment</button>
            </div>
          </div>
        </div>
        {this.state.comments && <div>
          {this.state.comments.map((comment, i) => <ArticleCommentListItem {...comment} key={i} getComments={this.props.getComments} postComment={this.props.postComment}/>)}
        </div>}
      </div>
    </div>;
  }
}
