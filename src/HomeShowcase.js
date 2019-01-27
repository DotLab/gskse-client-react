import React from 'react';

export default function(props) {
  const {imageUrl, title, description, actionText} = props;
  return <div className="H(350px) Bgz(ct) Pos(r) Mb(10px) Cur(p)" style={{backgroundImage: `url(${imageUrl})`}}>
    {/* blurred image */}
    <div className="Pos(a) End(0) W(40%) H(100%) Ov(h)">
      <div className="H(100%) W(100%) Blur(30px) Scale(1.5) Bgp(c)" style={{backgroundImage: `url(${imageUrl})`}}></div>
    </div>
    {/* darkening overlay */}
    <div className="Pos(a) End(0) W(40%) H(100%) Bgc(black) Op(.4)"></div>
    {/* text content */}
    <div className="Pos(a) End(0) W(40%) H(100%) C(white) P(35px) Cur(a)">
      <h3 className="Fz(1.5em) Lh(1.15) Mb(20px)">{title}</h3>
      <p className="Lh(1.15)">{description}</p>
      <span className="Fw(b) Cur(p) Td(u):h">{actionText}</span>
      <div className="Pos(a) B(35px) W(100%)">
        <span className="Fw(b) Fz(1.25em) Mend(20px) Cur(p) C(deepskyblue):h">C</span>
        <span className="Fw(b) Fz(1.25em) Mend(20px) Cur(p) C(red):h">L</span>
        <span className="Fw(b) Fz(1.25em) Mend(20px) Cur(p) C(gainsboro):h">S</span>
      </div>
    </div>
  </div>;
}
