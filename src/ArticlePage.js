import React from 'react';
import ReactMarkdown from 'react-markdown';

import ArticleCommentListItem from './ArticleCommentListItem';

import {avatarIconUrl, onTextareaChange, formatDate, formatNumber, formatNumberShort} from './utils';
import {UP_VOTE, DOWN_VOTE, LOVE} from './consts';

export default class ArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.onTextareaChange = onTextareaChange.bind(this);

    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onUpVoteClick = this.onUpVoteClick.bind(this);
    this.onDownVoteClick = this.onDownVoteClick.bind(this);
    this.onLoveClick = this.onLoveClick.bind(this);

    this.state = {text: '', textLineCount: 1};
  }

  onCancelClick() {
    this.setState({text: '', textLineCount: 1});
  }

  componentWillMount() {
    const title = this.props.match.params.title;
    this.props.getArticle({title}).then((article) => {
      this.setState(article);
      return this.props.getComments({targetId: article.id});
    }).then((comments) => {
      this.setState({comments});
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const text = this.state.text.trim();
    if (text) {
      this.props.postComment({collection: 'Article', targetId: this.state.id, text}).then((comments) => this.setState({
        text: '', textLineCount: 1,
        commentCount: comments.length, comments,
      }));
    }
  }

  onUpVoteClick() {
    this.props.postFlag({collection: 'Article', intent: UP_VOTE, targetId: this.state.id}).then((adjustment) => {
      this.setState({
        didUpVote: adjustment.didUpVote,
        didDownVote: adjustment.didDownVote,
        upVoteCount: this.state.upVoteCount + adjustment.upVoteCount,
        downVoteCount: this.state.downVoteCount + adjustment.downVoteCount,
      });
    });
  }

  onDownVoteClick() {
    this.props.postFlag({collection: 'Article', intent: DOWN_VOTE, targetId: this.state.id}).then((adjustment) => {
      this.setState({
        didUpVote: adjustment.didUpVote,
        didDownVote: adjustment.didDownVote,
        upVoteCount: this.state.upVoteCount + adjustment.upVoteCount,
        downVoteCount: this.state.downVoteCount + adjustment.downVoteCount,
      });
    });
  }

  onLoveClick() {
    this.props.postFlag({collection: 'Article', intent: LOVE, targetId: this.state.id}).then((adjustment) => {
      this.setState({
        didLove: adjustment.didLove,
        loveCount: this.state.loveCount + adjustment.loveCount,
      });
    });
  }

  render() {
    return <div className="Mt(20px)">
      <div className="W(600px) Mx(a)">
        <div className="Lh(1.15) Mb(40px)">
          <div className="C(dodgerblue) Fw(b)">Update</div>
          <div className="C(gray)">{formatDate(this.state.date)}</div>
        </div>
        <h2 className="Fz(3em) Lh(1.15) Mb(50px)">{this.state.title}</h2>
        <div className="C(gray) Mb(40px) Fw(2em)">
          <span className="Mend(20px)"><b>Vi</b> {formatNumberShort(this.state.viewCount || 0)}</span>
          <span className={'Cur(p) C(limegreen):h Mend(20px) ' + (this.state.didUpVote ? 'C(limegreen)' : '')} onClick={this.onUpVoteClick}><b>Up</b> {formatNumberShort(this.state.upVoteCount || 0)}</span>
          <span className={'Cur(p) C(orange):h Mend(20px) ' + (this.state.didDownVote ? 'C(orange)' : '')} onClick={this.onDownVoteClick}><b>Do</b> {formatNumberShort(this.state.downVoteCount || 0)}</span>
          <span className={'Cur(p) C(red):h ' + (this.state.didLove ? 'C(red)' : '')} onClick={this.onLoveClick}><b>Lo</b> {formatNumberShort(this.state.loveCount || 0)}</span>
        </div>
        <hr className="Op(.3) Mb(40px)"/>
        <div className="Mb(40px) Fz(1.5em)">{this.state.excerpt}</div>
      </div>
      {/* cover */}
      {this.state.coverUrl && <img className="W(800px) D(b) Mx(a) Bxsh($cardShadow) Bdrs(5px) Mb(40px)" src={this.state.coverUrl} alt=""/>}
      {/* markdown */}
      <div className="article Maw(600px) Mx(a)">
        <ReactMarkdown source={this.state.markdown}/>
      </div>

      <div className="W(800px) Mx(a)">
        <hr className="Op(.3) Mb(20px)"/>
        {/* views */}
        <div className="Fl(end) C(gray) Lh(1.875em)">
          <span className={'Cur(p) C(limegreen):h Mend(20px) ' + (this.state.didUpVote ? 'C(limegreen)' : '')} onClick={this.onUpVoteClick}><b>Up</b> {formatNumberShort(this.state.upVoteCount || 0)}</span>
          <span className={'Cur(p) C(orange):h Mend(20px) ' + (this.state.didDownVote ? 'C(orange)' : '')} onClick={this.onDownVoteClick}><b>Do</b> {formatNumberShort(this.state.downVoteCount || 0)}</span>
          <span className={'Cur(p) C(red):h ' + (this.state.didLove ? 'C(red)' : '')} onClick={this.onLoveClick}><b>Lo</b> {formatNumberShort(this.state.loveCount || 0)}</span>
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
            {this.state.isOriginal ? <div>
              Original Content
            </div> : <div>
              Reproduced from <a className="C(dodgerblue) Td(u):h" href={this.state.sourceUrl}>{this.state.sourceName}</a>
            </div>}
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
          <form className="W(90%) Fl(start) Pstart(20px)" onSubmit={this.onSubmit}>
            {/* textarea */}
            <textarea className="W(100%)" placeholder="Add a public replay..." required name="text" rows={this.state.textLineCount} value={this.state.text} onChange={this.onTextareaChange}/>
            {/* buttons */}
            <div className="Fl(end)">
              <button className="Mend(5px)" onClick={this.onCancelClick}>Cancel</button>
              <button type="submit">Comment</button>
            </div>
          </form>
        </div>
        {this.state.comments && <div>
          {this.state.comments.map((comment, i) => <ArticleCommentListItem
            comment={comment}
            key={i}
            getComments={this.props.getComments}
            postComment={this.props.postComment}
            postFlag={this.props.postFlag}
          />)}
        </div>}
      </div>
    </div>;
  }
}
