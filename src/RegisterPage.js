import React from 'react';

export default function({register}) {
  return <div className="Mt(10px) Maw(1280px) Mx(a)">
    <div className="W(50%)">
      <h2 className="Fw(lr)">Create your personal account</h2>
      <label className="Fw(b) Mb(5px)">Username <span className="C(red)">*</span></label>
      <input id="register-name" className="D(b) W(100%)" type="text"/>
      <label className="D(b) Fz(.8em)">This will be your username.</label>

      <label className="Fw(b) Mb(5px)">Email address <span className="C(red)">*</span></label>
      <input id="register-email" className="D(b) W(100%)" type="email"/>
      <label className="D(b) Fz(.8em)">We'll never share your email address with anyone.</label>

      <label className="Fw(b) Mb(5px)">Password <span className="C(red)">*</span></label>
      <input id="register-password" className="D(b) W(100%)" type="password"/>
      <label className="D(b) Fz(.8em)">Make sure it's more than 15 characters OR at least 8 characters including a number and a lowercase letter.</label>

      <hr className="Op(.2)"/>
      <div>By clicking “Create an account” below, you agree to our terms of service and privacy statement.</div>
      <hr className="Op(.2)"/>
      <button onClick={register}>Create an account</button>
    </div>
  </div>;
}
