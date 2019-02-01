import React from 'react';

import {formatDate, formatNumber, formatNumberShort, onTextareaChange, avatarIconUrl} from './utils';

export class ReplyListItem extends React.Component {
  constructor(props) {
    super(props);

    this.onReplyClick = () => this.setState({isReplying: !this.state.isReplying});

    this.onTextareaChange = onTextareaChange.bind(this);

    this.state = {isReplying: false, text: `@${this.props.authorName} `, textLineCount: 1};
  }

  render() {
    const {authorName, date, text, voteCount} = this.props;
    return <div className="Mb(10px) Cf">
      {/* left avatar icon */}
      <div className="W(10%) Fl(start)">
        <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
      </div>
      {/* right content */}
      <div className="W(90%) Fl(start) Pstart(20px)">
        {/* name & date */}
        <div className="Lh(1) Mb(5px)">
          <span className="Fw(b) Mend(10px)">{authorName}</span>
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
            <textarea className="W(100%)" placeholder="Add a public replay..." name="text" rows={this.state.textLineCount} defaultValue={this.state.text} onChange={this.onTextareaChange}/>
            {/* buttons */}
            <div className="Fl(end)">
              <button className="Mend(5px)" onClick={this.onReplyClick}>Cancel</button>
              <button>Comment</button>
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

    this.onReplyClick = () => this.setState({isReplying: !this.state.isReplying});

    this.onShowReplyClick = () => this.setState({doShowReplies: !this.state.doShowReplies});

    this.onTextareaChange = onTextareaChange.bind(this);

    this.state = {isReplying: false, doShowReplies: false, text: '', textLineCount: 1};
  }

  render() {
    const {authorName, date, text, voteCount, replyCount} = this.props;
    return <div className="Mb(20px) Cf">
      {/* left avatar icon */}
      <div className="W(10%) Fl(start)">
        <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
      </div>
      {/* right content */}
      <div className="W(90%) Fl(start) Pstart(20px)">
        {/* name & date */}
        <div className="Lh(1) Mb(5px)">
          <span className="Fw(b) Mend(10px)">{authorName}</span>
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
            <textarea className="W(100%)" placeholder="Add a public replay..." name="text" rows={this.state.textLineCount} defaultValue={this.state.text} onChange={this.onTextareaChange}/>
            {/* buttons */}
            <div className="Fl(end)">
              <button className="Mend(5px)" onClick={this.onReplyClick}>Cancel</button>
              <button>Comment</button>
            </div>
          </div>
        </div>}
        {/* view reply */}
        {replyCount > 0 && <span className="Cur(p) Td(u):h Fw(b) My(5px)" onClick={this.onShowReplyClick}>
          {this.state.doShowReplies ? 'Hide replies ^' : (replyCount === 1 ? 'View a reply' : `View ${formatNumber(replyCount)} replies v`)}
        </span>}
        {/* reply list */}
        {this.state.doShowReplies && <div className="Mt(10px)">
          <ReplyListItem
            authorName="Kailang"
            text="Halksdjf laks dfkas djf."
            date={new Date()}
            voteCount={0}
          />
          <ReplyListItem
            authorName="Kailang"
            text="Halksdjf laks dfkas djf."
            date={new Date()}
            voteCount={12342}
          />
          <ReplyListItem
            authorName="Kailang"
            text="Halksdjf laks dfkas djf."
            date={new Date()}
            voteCount={121435}
          />
        </div>}
      </div>
    </div>;
  }
}
