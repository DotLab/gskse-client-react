import React, {Component} from 'react';
import {Route, Link, NavLink, Switch, withRouter} from 'react-router-dom';
import io from 'socket.io-client';

import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';

import ArticleListPage from './ArticleListPage';
import NewArticlePage from './NewArticlePage';
import ArticlePage from './ArticlePage';

import ErrorPage from './ErrorPage';

import {formatNumber} from './utils';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({component, ...rest}) => {
  return <Route {...rest} render={(routeProps) => renderMergedProps(component, routeProps, rest)}/>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.history = props.history;

    const socket = io(process.env.NODE_ENV === 'development' ? 'http://localhost:6001' : 'https://gskse.com');
    this.socket = socket;
    socket.on('connect', () => {
      this.setState({connected: true});
    });

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getProfile = this.genericApi0.bind(this, ['cl_get_profile']);

    // this.repayLoan = this.genericApi1.bind(this, ['cl_repay_loan']);
    // this.applyLoan = this.genericApi1.bind(this, ['cl_apply_loan']);
    this.repayLoan = this.repayLoan.bind(this);
    this.applyLoan = this.applyLoan.bind(this);

    this.newArticle = this.newArticle.bind(this);
    this.getArticles = this.genericApi1.bind(this, ['cl_get_articles']);
    this.getArticle = this.genericApi1.bind(this, ['cl_get_article']);
    this.getComments = this.genericApi1.bind(this, ['cl_get_comments']);
    this.postComment = this.genericApi1.bind(this, ['cl_post_comment']);
    this.postFlag = this.genericApi1.bind(this, ['cl_flag']);

    this.state = {
      connected: false,
      user: null,
    };

    if (process.env.NODE_ENV === 'development') {
      this.login({nameOrEmail: 'Kailang', password: '123'});
    }
  }

  error(err) {
    const message = JSON.stringify(err, null, '  ');
    this.setState({error: message});
    this.history.push('/error');
  }

  genericApi0(event) {
    return new Promise((resolve) => {
      this.socket.emit(event, (res) => {
        if (res.err) return this.error(res.err);
        resolve(res.data);
      });
    });
  }

  genericApi1(event, arg1) {
    return new Promise((resolve) => {
      this.socket.emit(event, arg1, (res) => {
        if (res.err) return this.error(res.err);
        resolve(res.data);
      });
    });
  }

  register({name, email, password}) {
    return this.genericApi1('cl_register', {name, email, password}).then(() => {
      this.history.push('/login');
    });
  }

  login({nameOrEmail, password, redirect}) {
    return this.genericApi1('cl_login', {nameOrEmail, password}).then((user) => {
      this.setState({user});
      if (redirect) this.history.push(redirect);
    });
  }

  logout() {
    return this.genericApi0('cl_logout').then(() => {
      this.setState({user: null});
      this.history.push('/');
    });
  }

  repayLoan({loanId}) {
    return this.genericApi1('cl_repay_loan', {loanId}).then((user) => {
      this.setState({user});
    });
  }

  applyLoan({amount}) {
    return this.genericApi1('cl_apply_loan', {amount}).then((user) => {
      this.setState({user});
    });
  }

  newArticle({title, excerpt, coverUrl, isOriginal, sourceTitle, sourceName, sourceUrl, markdown}) {
    this.socket.emit('cl_new_article', {title, excerpt, coverUrl, isOriginal, sourceTitle, sourceName, sourceUrl, markdown}, (res) => {
      if (res.err) return this.error(res.err);
      this.history.push(`/articles/${title}`);
    });
  }

  render() {
    const history = this.props.history;
    const {connected, user} = this.state;

    return <div>
      {/* header */}
      <div className="Bgc(azure) Pos(st) T(0) Z(1) Bxsh($cardShadow)">
        <div className="Maw(1280px) Mx(a) Pos(r)">
          <span className="Pos(a) End(100%) Pend(10px) T(10px) Va(tb) Op(.5) Fz(.8em)">{process.env.NODE_ENV}</span>
          <Link className="Mend(40px) Fz(1.5em) Fw(b) Lh(2)" to="/">GSKSE</Link>
          <span className="Va(tb) Mend(10px)">
            <input
              className="W(350px)"
              type="text"
              placeholder="Search for news, symbols or companies"/>
            <button>Go</button>
          </span>
          {!connected && <span className="Va(tb) C(red)">Connecting...</span>}
          {user ? <span className="Pos(a) End(40px) B(10px)">
            <span className="Mstart(20px) Fs(i) Op(.6)">${formatNumber(user.cash)}</span>
            <span className="Fw(b) Mstart(20px) Pos(r) C(dodgerblue):h">
              New v
              <select className="Pos(a) Start(0) W(100%) Op(0) Cur(p)" defaultValue="none" onChange={(e) => {
                history.push(e.target.value);
                e.target.value = 'none';
              }}>
                <option value="none" disabled>New...</option>
                <option value="/articles/new">New article</option>
                <option value="/companies/new">New private company</option>
              </select>
            </span>
            <span className="Fw(b) Mstart(20px) Pos(r) C(dodgerblue):h">
              {user.name} v
              <select className="Pos(a) Start(0) W(100%) Op(0) Cur(p)" defaultValue="none" onChange={(e) => {
                const value = e.target.value;
                if (value === '/logout') {
                  this.logout();
                } else {
                  history.push(e.target.value);
                }
                e.target.value = 'none';
              }}>
                <option value="none" disabled>Signed in as {user.name}</option>
                <option value="/profile">My profile</option>
                <option value="/articles">My articles</option>
                <option value="/companies">My companies</option>
                <option value="/loves">My loves</option>
                <option value="/comments">My comments</option>
                <option value="/logout">Sign out</option>
              </select>
            </span>
          </span> : <span className="Pos(a) End(40px) B(10px)">
            <NavLink className="Fw(b) Mstart(20px)" activeClassName="C(dodgerblue)" to="/login">Sign in</NavLink>
            <NavLink className="Fw(b) Mstart(20px)" activeClassName="C(dodgerblue)" to="/register">Sign up</NavLink>
          </span>}
        </div>
      </div>

      {/* navbar */}
      <div className="Bgc(aliceblue) Bxsh($cardShadow)">
        <div className="Maw(1280px) Mx(a)">
          <NavLink className="Fw(b) Lh(2) Mend(30px)" activeClassName="C(dodgerblue)" exact to="/">Finance Home</NavLink>
          <NavLink className="Fw(b) Lh(2) Mend(30px)" activeClassName="C(dodgerblue)" to="/watchlists">Watchlists</NavLink>
          <NavLink className="Fw(b) Lh(2) Mend(30px)" activeClassName="C(dodgerblue)" to="/portfolios">My Portfolios</NavLink>
          <NavLink className="Fw(b) Lh(2) Mend(30px)" activeClassName="C(dodgerblue)" to="/screeners">Screeners</NavLink>
        </div>
      </div>

      {/* main */}
      <Switch>
        <Route path="/" exact component={HomePage} />

        <PropsRoute path="/register" exact component={RegisterPage} register={this.register} />
        <PropsRoute path="/login" exact component={LoginPage} login={this.login} />
        <PropsRoute
          path="/profile" exact
          component={ProfilePage}
          user={this.state.user}
          getProfile={this.getProfile}
          repayLoan={this.repayLoan}
          applyLoan={this.applyLoan}
        />

        <PropsRoute path="/articles" exact component={ArticleListPage} user={this.state.user} getArticles={this.getArticles} />
        <PropsRoute path="/articles/new" exact component={NewArticlePage} newArticle={this.newArticle} />
        <PropsRoute
          path="/articles/:title" exact
          component={ArticlePage}
          getArticle={this.getArticle}
          getComments={this.getComments}
          postComment={this.postComment}
          postFlag={this.postFlag}
        />

        <PropsRoute path="/error" exact component={ErrorPage} error={this.state.error} />
        <Route />
      </Switch>
    </div>;
  }
}

export default withRouter(App);
