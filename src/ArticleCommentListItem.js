import React from 'react';

import {formatDate, formatNumberShort, onTextareaChange} from './utils';

const avatarIconUrl = 'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2Utd2lkdGg9IjAuNTAxIiBzdHJva2UtbGluZWpvaW49ImJldmVsIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHZlcnNpb249IjEuMSIgb3ZlcmZsb3c9InZpc2libGUiIHZpZXdCb3g9IjAgMCA5NiA5NiIgeD0iMHB4IiB5PSIwcHgiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iYmxhY2siIGZvbnQtZmFtaWx5PSJUaW1lcyBOZXcgUm9tYW4iIGZvbnQtc2l6ZT0iMTYiIHRyYW5zZm9ybT0ic2NhbGUoMSAtMSkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTk2KSI+PGc+PHBhdGggZD0iTSAzMi4xOSwyOS42NzcgTCAzMi4xOSwzMS4yNjIgQyAzMi4xOSwzNS45NjEgMzMuOTc4LDM5LjQzNSAzNi45OTQsNDEuNjg1IEMgMzkuOTQxLDQzLjg4MyA0My44NzUsNDQuNzggNDcuOTk4LDQ0Ljc4IEMgNTIuMTIyLDQ0Ljc4IDU2LjA1OSw0My44ODMgNTkuMDAzLDQxLjY4NSBDIDYyLjAxOCwzOS40MzYgNjMuODA5LDM1Ljk1NyA2My44MDksMzEuMjYyIEwgNjMuODA5LDI5LjY3NyBMIDMyLjE5LDI5LjY3NyBaIE0gMzkuMjE5LDU3LjU0MyBDIDM5LjIxOSw2Mi4zODkgNDMuMTUyLDY2LjMyMyA0Ny45OTcsNjYuMzIzIEMgNTIuODQ0LDY2LjMyMyA1Ni43NzcsNjIuMzg5IDU2Ljc3Nyw1Ny41NDMgQyA1Ni43NzcsNTIuNjk3IDUyLjg0NCw0OC43NjQgNDcuOTk3LDQ4Ljc2NCBDIDQzLjE1Miw0OC43NjQgMzkuMjE5LDUyLjY5NyAzOS4yMTksNTcuNTQzIFoiIHN0cm9rZT0ibm9uZSIgZmlsbD0iIzAwMDAwMCIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2Utd2lkdGg9IjAuNSIgbWFya2VyLXN0YXJ0PSJub25lIiBtYXJrZXItZW5kPSJub25lIiBzdHJva2UtbWl0ZXJsaW1pdD0iNzkuODQwMzE5MzYxMjc3NSI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==';

export class ReplyListItem extends React.Component {
  constructor(props) {
    super(props);

    this.onReplyClick = () => {
      this.setState({isReplying: !this.state.isReplying});
    };

    this.onTextareaChange = onTextareaChange.bind(this);

    this.state = {isReplying: false, text: `@${this.props.authorName} `, textLineCount: 1};
  }

  render() {
    const {authorName, date, text, voteCount} = this.props;
    return <div className="Mb(10px) Cf">
      <div className="W(10%) Fl(start)">
        <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
      </div>
      <div className="W(90%) Fl(start) Pstart(20px)">
        <div className="Lh(1) Mb(5px)">
          <span className="Fw(b) Mend(10px)">{authorName}</span>
          <span className="C(gray)">{formatDate(date)}</span>
        </div>
        <p className="Mb(5px) Whs(pw)">{text}</p>
        <div className="C(gray)">
          <span className="Cur(p) C(limegreen):h Mend(20px)"><b>U</b> {voteCount > 0 && <span>{formatNumberShort(voteCount, 1)}</span>}</span>
          <span className="Cur(p) C(red):h Mend(30px) Fw(b)">D</span>
          <span className="Cur(p) C(black):h" onClick={this.onReplyClick}>Reply</span>
        </div>
        {this.state.isReplying && <div className="Mt(5px) Mb(5px) Cf">
          <div className="W(10%) Fl(start)">
            <img className="W(100%) Bxsh($cardShadow) Bdrs(100%)" src={avatarIconUrl} alt=""/>
          </div>
          <div className="W(90%) Fl(start) Pstart(20px)">
            <textarea className="W(100%)" placeholder="Add a public replay..." name="text" rows={this.state.textLineCount} defaultValue={this.state.text} onChange={this.onTextareaChange}/>
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

export default function() {
  return <div></div>;
}
