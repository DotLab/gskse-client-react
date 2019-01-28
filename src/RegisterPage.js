import React from 'react';

export default class RegisterPage extends React.Component {
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
    this.props.register(this.state);
  }

  render() {
    return <div className="Mt(10px) Maw(1280px) Mx(a)">
      <form className="W(50%)" onSubmit={this.onSubmit}>
        <h2 className="Fw(lr) Mb(10px)">Create your personal account</h2>
        <div className="Mb(10px)">
          <label className="Fw(b)">Username <span className="C(red)">*</span></label>
          <input className="D(b) W(100%)" required type="text" name="name" onChange={this.onChange}/>
          <p className="Fz(.8em)">This will be your username.</p>
        </div>

        <div className="Mb(10px)">
          <label className="Fw(b)">Email address <span className="C(red)">*</span></label>
          <input className="D(b) W(100%)" required type="email" name="email" onChange={this.onChange}/>
          <p className="Fz(.8em)">We'll never share your email address with anyone.</p>
        </div>

        <div className="Mb(10px)">
          <label className="Fw(b)">Password <span className="C(red)">*</span></label>
          <input className="D(b) W(100%)" required type="password" name="password" onChange={this.onChange}/>
          <p className="Fz(.8em)">Make sure it's more than 15 characters OR at least 8 characters including a number and a lowercase letter.</p>
        </div>

        <hr className="Op(.2)"/>
        <p>By clicking “Create an account” below, you agree to our terms of service and privacy statement.</p>
        <hr className="Op(.2) Mb(10px)"/>

        <button type="submit">Create an account</button>
      </form>
    </div>;
  }
}
