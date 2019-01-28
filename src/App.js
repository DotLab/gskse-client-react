import React, {Component} from 'react';
import {Route, Link, NavLink, Switch, withRouter} from 'react-router-dom';
import io from 'socket.io-client';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import Error from './Error';

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

    const socket = io('http://localhost:3001');
    this.socket = socket;
    socket.on('connect', () => {
      this.setState({connected: true});
    });

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);

    this.state = {
      connected: false,
      user: null,
    };
  }

  error(err) {
    const message = JSON.stringify(err, null, '  ');
    this.setState({error: message});
    this.history.push('/error');
  }

  register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    this.socket.emit('cl_register', {name, email, password}, (res) => {
      if (res.err) return this.error(res.err);
      this.history.push('/login');
    });
  }

  login() {
    const nameOrEmail = document.getElementById('login-name-or-email').value;
    const password = document.getElementById('login-password').value;

    this.socket.emit('cl_login', {nameOrEmail, password}, (res) => {
      if (res.err) return this.error(res.err);
      this.setState({user: res.data});
      this.history.push('/');
    });
  }

  logout() {
    this.setState({user: null});
    this.history.push('/');
  }

  render() {
    const history = this.props.history;
    const {connected, user} = this.state;

    return <div>
      {/* header */}
      <div className="Bgc(azure) Pos(st) T(0) Z(1) Bxsh($cardShadow)">
        <div className="Maw(1280px) Mx(a) Pos(r)">
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
            <span className="Fw(b) Mstart(20px) Pos(r) C(dodgerblue):h">
                New v
              <select className="Pos(a) Start(0) W(100%) Op(0) Cur(p)" onChange={(e) => history.push(e.target.value)}>
                <option value="/articles/new">New article</option>
                <option value="/companies/new">New private company</option>
              </select>
            </span>
            <span className="Fw(b) Mstart(20px) Pos(r) C(dodgerblue):h">
                Kailang v
              <select className="Pos(a) Start(0) W(100%) Op(0) Cur(p)" onChange={(e) => {
                const value = e.target.value;
                if (value === 'logout') {
                  this.logout();
                } else {
                  history.push(e.target.value);
                }
              }}>
                <option value="profile">My profile</option>
                <option value="articles">My articles</option>
                <option value="companies">My companies</option>
                <option value="loves">My loves</option>
                <option value="comments">My comments</option>
                <option value="logout">Sign out</option>
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
        <Route path="/" exact component={Home} />
        <PropsRoute path="/register" exact component={Register} register={this.register} />
        <PropsRoute path="/login" exact component={Login} login={this.login} />
        <PropsRoute path="/error" exact component={Error} error={this.state.error} />
        <Route />
      </Switch>
    </div>;
  }
}

export default withRouter(App);
