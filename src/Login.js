import React from 'react';

export default function Login() {
  return <div className="Mt(10px) Maw(1280px) Mx(a)">
    <div className="W(50%)">
      <h2 className="Fw(lr)">Sign in to Gensokyo Stock Exchange</h2>
      <label className="Fw(b) Mb(5px)">Username or email address</label>
      <input className="D(b) W(100%) Mb(10px)" type="text"/>

      <label className="Fw(b) Mb(5px)">Password</label>
      <input className="D(b) W(100%) Mb(10px)" type="text"/>

      <button>Sign in</button>
    </div>
  </div>;
}
