import React from 'react';

export default function(props) {
  const {links} = props;
  const width = (100 / links.length) + '%';

  return <div className="Pos(r) Mb(20px) Mend(-10px)">
    {links.map((link, i) => (<div className="HomeShowcaseLinksItem Fl(start) Pend(10px) Cur(p)" style={{width}} key={i}>
      <img className="W(100%) Mb(4px) Bxsh($cardShadow)" src={link.imageUrl} alt={link.title}/>
      <h4 className="Fz(.8em) Lh(1.15) HomeShowcaseLinksItem:h_C(dodgerblue)">{link.title}</h4>
    </div>))}
    <div className="Cf"></div>
  </div>;
}
