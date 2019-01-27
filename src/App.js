import React, {Component} from 'react';
import {Route, Link, Switch, withRouter} from 'react-router-dom';

import Home from './Home';
import Join from './Join';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  render() {
    const history = this.props.history;
    const user = this.state.user;

    return <div className="Mih(1000px)">
      {/* header */}
      <div className="Bgc(azure) Pos(st) T(0) Z(1) Bxsh($cardShadow)">
        <div className="Maw(1280px) Mx(a) Pos(r)">
          <Link className="Pend(40px) Fz(1.5em) Fw(b) Lh(2)" to="/">GSKSE</Link>
          <span className="Va(tb)">
            <input
              className="W(350px)"
              type="text"
              placeholder="Search for news, symbols or companies"/>
            <button>Go</button>
          </span>
          {user ? <span className="Pos(a) End(40px) B(10px)">
            <span className="Fw(b) Mstart(20px) Pos(r) C(dodgerblue):h">
                New v
              <select className="Pos(a) Start(0) W(100%) Op(0) Cur(p)" onChange={(e) => history.push(e.target.value)}>
                <option value="/articles/new">New article</option>
                <option value="/companies/new">New private company</option>
              </select>
            </span>
            <span className="Fw(b) Mstart(20px) Pos(r) C(dodgerblue):h">
                Kailang v
              <select className="Pos(a) Start(0) W(100%) Op(0) Cur(p)" onChange={(e) => history.push(e.target.value)}>
                <option value="profile">My profile</option>
                <option value="articles">My articles</option>
                <option value="companies">My companies</option>
                <option value="loves">My loves</option>
                <option value="comments">My comments</option>
                <option value="logout">Sign out</option>
              </select>
            </span>
          </span> : <span className="Pos(a) End(40px) B(10px)">
            <Link className="Fw(b) Mstart(20px)" to="/login">Sign in</Link>
            <Link className="Fw(b) Mstart(20px)" to="/join">Sign up</Link>
          </span>}
        </div>
      </div>

      {/* navbar */}
      <div className="Bgc(aliceblue) Bxsh($cardShadow)">
        <div className="Maw(1280px) Mx(a)">
          <Link className="Fw(b) Lh(2) Mend(30px)" to="/">Finance Home</Link>
          <Link className="Fw(b) Lh(2) Mend(30px)" to="/watchlists">Watchlists</Link>
          <Link className="Fw(b) Lh(2) Mend(30px)" to="/portfolios">My Portfolios</Link>
          <Link className="Fw(b) Lh(2) Mend(30px)" to="/screeners">Screeners</Link>
        </div>
      </div>

      {/* main */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/join" exact component={Join} />
        <Route path="/login" exact component={Login} />
        <Route />
      </Switch>
    </div>;
  }
}

export default withRouter(App);
