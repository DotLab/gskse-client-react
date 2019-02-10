import React from 'react';

import {formatDate, formatNumber, formatNumberShort, onTextareaChange, avatarIconUrl} from './utils';
import {UP_VOTE, DOWN_VOTE} from './consts';

export class ReplyListItem extends React.Component {
  constructor(props) {
    super(props);

    this.onReplyClick = this.onReplyClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpVoteClick = this.onUpVoteClick.bind(this);
    this.onDownVoteClick = this.onDownVoteClick.bind(this);

    this.onTextareaChange = onTextareaChange.bind(this);

    this.state = {...props.comment, commentText: props.comment.text, isReplying: false, text: `@${this.props.comment.creatorName} `, textLineCount: 1};
  }

  onReplyClick() {
    if (!this.state.isReplying) {
      this.setState({isReplying: !this.state.isReplying, text: `@${this.props.comment.creatorName} `, textLineCount: 1});
    } else {
      this.setState({isReplying: !this.state.isReplying});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({text: '', textLineCount: 1, isReplying: false});
    this.props.sendReply(this.state.text);
  }

  onUpVoteClick() {
    this.props.postFlag({collection: 'Comment', intent: UP_VOTE, targetId: this.state.id}).then((adjustment) => {
      this.setState({
        didUpVote: adjustment.didUpVote,
        didDownVote: adjustment.didDownVote,
        voteCount: this.state.voteCount + adjustment.voteCount,
      });
    });
  }

  onDownVoteClick() {
    this.props.postFlag({collection: 'Comment', intent: DOWN_VOTE, targetId: this.state.id}).then((adjustment) => {
      this.setState({
        didUpVote: adjustment.didUpVote,
        didDownVote: adjustment.didDownVote,
        voteCount: this.state.voteCount + adjustment.voteCount,
      });
    });
  }

  render() {
    const {creatorName, date, commentText, voteCount} = this.state;
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
        <p className="Mb(5px) Whs(pw)">{commentText}</p>
        {/* vote & reply */}
        <div className="C(gray)">
          <span className={'Cur(p) C(limegreen):h Mend(20px) ' + (this.state.didUpVote ? 'C(limegreen)' : '')} onClick={this.onUpVoteClick}><b>U</b> {voteCount > 0 && <span>{formatNumberShort(voteCount, 1)}</span>}</span>
          <span className={'Cur(p) C(orange):h Mend(20px) ' + (this.state.didDownVote ? 'C(orange)' : '')} onClick={this.onDownVoteClick}><b>D</b></span>
          <span className="Cur(p) C(black):h" onClick={this.onReplyClick}>Reply</span>
        </div>
        {/* reply box */}
        {this.state.isReplying && <div className="My(5px) Cf">
          {/* left avatar */}
          <div className="W(10%) Fl(start)">
            <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
          </div>
          {/* right content */}
          <form className="W(90%) Fl(start) Pstart(20px)" onSubmit={this.onSubmit}>
            {/* textarea */}
            <textarea className="W(100%)" required placeholder="Add a public replay..." name="text" rows={this.state.textLineCount} value={this.state.text} onChange={this.onTextareaChange}/>
            {/* buttons */}
            <div className="Fl(end)">
              <button className="Mend(5px)" onClick={this.onReplyClick}>Cancel</button>
              <button type="submit">Comment</button>
            </div>
          </form>
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
    this.onSubmit = this.onSubmit.bind(this);
    this.sendReply = this.sendReply.bind(this);
    this.onUpVoteClick = this.onUpVoteClick.bind(this);
    this.onDownVoteClick = this.onDownVoteClick.bind(this);

    this.onTextareaChange = onTextareaChange.bind(this);

    this.state = {...props.comment, commentText: props.comment.text, isReplying: false, doShowReplies: false, text: '', textLineCount: 1};
  }

  onReplyClick() {
    this.setState({isReplying: !this.state.isReplying});
  }

  onShowReplyClick() {
    if (!this.state.replies) {
      this.props.getComments({targetId: this.state.id}).then((replies) => this.setState({replies, doShowReplies: !this.state.doShowReplies}));
    } else {
      this.setState({doShowReplies: !this.state.doShowReplies});
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const text = this.state.text.trim();
    if (text) {
      this.props.postComment({collection: 'Comment', targetId: this.state.id, text}).then((replies) => this.setState({
        text: '', textLineCount: 1, isReplying: false,
        commentCount: replies.length, replies, doShowReplies: true,
      }));
    }
  }

  sendReply(text) {
    text = text.trim();
    if (text) {
      this.props.postComment({collection: 'Comment', targetId: this.state.id, text}).then((replies) => this.setState({commentCount: replies.length, replies, doShowReplies: true}));
    }
  }

  onUpVoteClick() {
    this.props.postFlag({collection: 'Comment', intent: UP_VOTE, targetId: this.state.id}).then((adjustment) => {
      this.setState({
        didUpVote: adjustment.didUpVote,
        didDownVote: adjustment.didDownVote,
        voteCount: this.state.voteCount + adjustment.voteCount,
      });
    });
  }

  onDownVoteClick() {
    this.props.postFlag({collection: 'Comment', intent: DOWN_VOTE, targetId: this.state.id}).then((adjustment) => {
      this.setState({
        didUpVote: adjustment.didUpVote,
        didDownVote: adjustment.didDownVote,
        voteCount: this.state.voteCount + adjustment.voteCount,
      });
    });
  }

  render() {
    const {creatorName, date, commentText, voteCount} = this.state;
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
        <p className="Mb(5px) Whs(pw)">{commentText}</p>
        {/* vote & reply */}
        <div className="C(gray)">
          <span className={'Cur(p) C(limegreen):h Mend(20px) ' + (this.state.didUpVote ? 'C(limegreen)' : '')} onClick={this.onUpVoteClick}><b>U</b> {voteCount > 0 && <span>{formatNumberShort(voteCount, 1)}</span>}</span>
          <span className={'Cur(p) C(orange):h Mend(20px) ' + (this.state.didDownVote ? 'C(orange)' : '')} onClick={this.onDownVoteClick}><b>D</b></span>
          <span className="Cur(p) C(black):h" onClick={this.onReplyClick}>Reply</span>
        </div>
        {/* reply box */}
        {this.state.isReplying && <div className="My(5px) Cf">
          {/* left avatar */}
          <div className="W(10%) Fl(start)">
            <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
          </div>
          {/* right content */}
          <form className="W(90%) Fl(start) Pstart(20px)" onSubmit={this.onSubmit}>
            {/* textarea */}
            <textarea className="W(100%)" required placeholder="Add a public comment..." name="text" rows={this.state.textLineCount} value={this.state.text} onChange={this.onTextareaChange}/>
            {/* buttons */}
            <div className="Fl(end)">
              <button className="Mend(5px)" onClick={this.onReplyClick}>Cancel</button>
              <button type="submit">Comment</button>
            </div>
          </form>
        </div>}
        {/* view reply */}
        {this.state.commentCount > 0 && <span className="Cur(p) Td(u):h Fw(b) My(5px)" onClick={this.onShowReplyClick}>
          {this.state.doShowReplies ? 'Hide replies ^' : (this.state.commentCount === 1 ? 'View a reply' : `View ${formatNumber(this.state.commentCount)} replies v`)}
        </span>}
        {/* reply list */}
        {this.state.commentCount > 0 && this.state.doShowReplies && this.state.replies && <div className="Mt(10px)">
          {this.state.replies.map((reply, i) => <ReplyListItem
            comment={reply}
            key={i}
            sendReply={this.sendReply}
            postFlag={this.props.postFlag}
          />)}
        </div>}
      </div>
    </div>;
  }
}
