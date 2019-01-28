import React from 'react';

export default function({login}) {
  return <div className="Mt(10px) Maw(1280px) Mx(a)">
    <div className="W(50%)">
      <h2 className="Fw(lr)">Sign in to Gensokyo Stock Exchange</h2>
      <label className="Fw(b) Mb(5px)">Username or email address</label>
      <input id="login-name-or-email" className="D(b) W(100%) Mb(10px)" type="text"/>

      <label className="Fw(b) Mb(5px)">Password</label>
      <input id="login-password" className="D(b) W(100%) Mb(10px)" type="password"/>

      <button onClick={login}>Sign in</button>
    </div>
  </div>;
}
