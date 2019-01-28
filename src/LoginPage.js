import React from 'react';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {};
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }

  render() {
    return <div className="Mt(10px) Maw(1280px) Mx(a)">
      <form className="W(50%)" onSubmit={this.onSubmit}>
        <h2 className="Fw(lr) Mb(10px)">Sign in to Gensokyo Stock Exchange</h2>
        <div className="Mb(10px)">
          <label className="Fw(b)">Username or email address</label>
          <input className="D(b) W(100%) Mb(10px)" required type="text" name="nameOrEmail" onChange={this.onChange}/>
        </div>

        <div className="Mb(10px)">
          <label className="Fw(b)">Password</label>
          <input className="D(b) W(100%) Mb(10px)" required type="password" name="password" onChange={this.onChange}/>
        </div>

        <button type="submit">Sign in</button>
      </form>
    </div>;
  }
}
