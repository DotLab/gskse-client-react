import React from 'react';

export default function(props) {
  const {imageUrl, category, source, time, title, excerpt} = props;
  return <div className="Mb(10px)">
    {imageUrl && <div className="Fl(start) W(20%) Pend(10px) Mt(6px) Cur(p)">
      <img className="W(100%) Bxsh($cardShadow) Bdrs(4px)" src={imageUrl} alt={title}/>
    </div>}
    <div className={'Fl(start) ' + (imageUrl ? 'W(75%)' : 'W(95%)')}>
      <div className="Mb(0)">
        <span className="C(dodgerblue) Fw(b) Mend(10px) Cur(p) Td(u):h">{category}</span>
        <span className="C(dimgray)">{source} • {time}</span>
      </div>
      <h3 className="Lh(1.15) Mb(4px) Cur(p) C(dodgerblue):h">{title}</h3>
      <p className="Lh(1.15) Mb(0)">{excerpt}</p>
    </div>
    <div className="Fl(start) W(5%) Pos(r)">
      <div className="Pos(a) T(6px) End(0)">
        <div className="C(darkgray) Fw(b) Fz(1.25em) Cur(p) C(deepskyblue):h">C</div>
        <div className="C(darkgray) Fw(b) Fz(1.25em) Cur(p) C(red):h">L</div>
        <div className="C(darkgray) Fw(b) Fz(1.25em) Cur(p) C(gainsboro):h">S</div>
      </div>
    </div>
    <div className="Cf"></div>
  </div>;
}
