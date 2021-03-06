import React from 'react';

export default function({error}) {
  return <div className="Mt(10px) Maw(1280px) Mx(a)">
    <h2 className="Fw(lr) Mb(10px)">Error</h2>
    {error && <pre className="Bgc(black) C(white) P(5px) Bdrs(5px)">{error}</pre>}
  </div>;
}
