import React from 'react';

import {formatDate, formatNumber, formatNumberShort, onTextareaChange, avatarIconUrl} from './utils';

export class ReplyListItem extends React.Component {
  constructor(props) {
    super(props);

    this.onReplyClick = this.onReplyClick.bind(this);
    this.onSendClick = this.onSendClick.bind(this);

    this.onTextareaChange = onTextareaChange.bind(this);

    this.state = {isReplying: false, text: `@${this.props.creatorName} `, textLineCount: 1};
  }

  onReplyClick() {
    if (!this.state.isReplying) {
      this.setState({isReplying: !this.state.isReplying, text: `@${this.props.creatorName} `, textLineCount: 1});
    } else {
      this.setState({isReplying: !this.state.isReplying});
    }
  }

  onSendClick() {
    this.props.onReplySendClick(this.state.text);
    this.setState({text: '', textLineCount: 1, isReplying: false});
  }

  render() {
    const {creatorName, date, text, voteCount} = this.props;
    return <div className="Mb(10px) Cf">
      {/* left avatar icon */}
      <div className="W(10%) Fl(start)">
        <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
      </div>
      {/* right content */}
      <div className="W(90%) Fl(start) Pstart(20px)">
        {/* name & date */}
        <div className="Lh(1) Mb(5px)">
          <span className="Fw(b) Mend(10px)">{creatorName}</span>
          <span className="C(gray)">{formatDate(date)}</span>
        </div>
        {/* text */}
        <p className="Mb(5px) Whs(pw)">{text}</p>
        {/* vote & reply */}
        <div className="C(gray)">
          <span className="Cur(p) C(limegreen):h Mend(20px)"><b>U</b> {voteCount > 0 && <span>{formatNumberShort(voteCount, 1)}</span>}</span>
          <span className="Cur(p) C(orange):h Mend(30px)"><b>D</b></span>
          <span className="Cur(p) C(black):h" onClick={this.onReplyClick}>Reply</span>
        </div>
        {/* reply box */}
        {this.state.isReplying && <div className="My(5px) Cf">
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
              <button className="Mend(5px)" onClick={this.onReplyClick}>Cancel</button>
              <button onClick={this.onSendClick}>Comment</button>
            </div>
          </div>
        </div>}
      </div>
    </div>;
  }
}

export default class ArticleCommentListItem extends React.Component {
  constructor(props) {
    super(props);

    this.onReplyClick = this.onReplyClick.bind(this);

    this.onShowReplyClick = this.onShowReplyClick.bind(this);
    this.onSendClick = this.onSendClick.bind(this);
    this.onReplySendClick = this.onReplySendClick.bind(this);

    this.onTextareaChange = onTextareaChange.bind(this);

    this.state = {commentCount: props.commentCount, isReplying: false, doShowReplies: false, text: '', textLineCount: 1};
  }

  onReplyClick() {
    this.setState({isReplying: !this.state.isReplying});
  }

  onShowReplyClick() {
    if (!this.state.replies) {
      this.props.getComments({targetId: this.props.id}).then((replies) => this.setState({replies, doShowReplies: !this.state.doShowReplies}));
    } else {
      this.setState({doShowReplies: !this.state.doShowReplies});
    }
  }

  onSendClick() {
    const text = this.state.text.trim();
    if (text) {
      this.props.postComment({targetId: this.props.id, text}).then((replies) => this.setState({
        text: '', textLineCount: 1, isReplying: false,
        commentCount: replies.length, replies, doShowReplies: true,
      }));
    }
  }

  onReplySendClick(text) {
    text = text.trim();
    if (text) {
      this.props.postComment({targetId: this.props.id, text}).then((replies) => this.setState({commentCount: replies.length, replies, doShowReplies: true}));
    }
  }

  render() {
    const {creatorName, date, text, voteCount} = this.props;
    return <div className="Mb(20px) Cf">
      {/* left avatar icon */}
      <div className="W(10%) Fl(start)">
        <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
      </div>
      {/* right content */}
      <div className="W(90%) Fl(start) Pstart(20px)">
        {/* name & date */}
        <div className="Lh(1) Mb(5px)">
          <span className="Fw(b) Mend(10px)">{creatorName}</span>
          <span className="C(gray)">{formatDate(date)}</span>
        </div>
        {/* text */}
        <p className="Mb(5px) Whs(pw)">{text}</p>
        {/* vote & reply */}
        <div className="C(gray)">
          <span className="Cur(p) C(limegreen):h Mend(20px)"><b>U</b> {voteCount > 0 && <span>{formatNumberShort(voteCount, 1)}</span>}</span>
          <span className="Cur(p) C(orange):h Mend(30px)"><b>D</b></span>
          <span className="Cur(p) C(black):h" onClick={this.onReplyClick}>Reply</span>
        </div>
        {/* reply box */}
        {this.state.isReplying && <div className="My(5px) Cf">
          {/* left avatar */}
          <div className="W(10%) Fl(start)">
            <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
          </div>
          {/* right content */}
          <div className="W(90%) Fl(start) Pstart(20px)">
            {/* textarea */}
            <textarea className="W(100%)" placeholder="Add a public comment..." name="text" rows={this.state.textLineCount} defaultValue={this.state.text} onChange={this.onTextareaChange}/>
            {/* buttons */}
            <div className="Fl(end)">
              <button className="Mend(5px)" onClick={this.onReplyClick}>Cancel</button>
              <button onClick={this.onSendClick}>Comment</button>
            </div>
          </div>
        </div>}
        {/* view reply */}
        {this.state.commentCount > 0 && <span className="Cur(p) Td(u):h Fw(b) My(5px)" onClick={this.onShowReplyClick}>
          {this.state.doShowReplies ? 'Hide replies ^' : (this.state.commentCount === 1 ? 'View a reply' : `View ${formatNumber(this.state.commentCount)} replies v`)}
        </span>}
        {/* reply list */}
        {this.state.commentCount > 0 && this.state.doShowReplies && this.state.replies && <div className="Mt(10px)">
          {this.state.replies.map((reply, i) => <ReplyListItem {...reply} key={i} onReplySendClick={this.onReplySendClick}/>)}
        </div>}
      </div>
    </div>;
  }
}
