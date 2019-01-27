import React from 'react';

import HomeShowcase from './HomeShowcase';
import HomeShowcaseLinkBar from './HomeShowcaseLinkBar';
import HomeArticleListItem from './HomeArticleListItem';

export default function Home() {
  return <div className="Mt(10px)">
    <div className="Maw(1280px) Mx(a)">
      {/* left column */}
      <div className="Fl(start) W(75%) Pend(40px)">
        {/* hero */}
        <HomeShowcase
          imageUrl="https://s.yimg.com/uu/api/res/1.2/jRxdoNfkaFrT3doRCfN06A--~B/Zmk9c3RyaW07aD00MDQ7cHlvZmY9MDtxPTk1O3c9NzIwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2019-01/680225a0-218c-11e9-8f7f-4ed91474e269"
          title="Tax updates, retail sales, and food recalls you can't miss this weekend"
          description="IRS workers, taxes, and travel affected by shutdown"
          actionText="Read >"
        />

        {/* hero links */}
        <HomeShowcaseLinkBar
          links={[
            {title: 'Earning, FOMC, Jobs - The week ahead in markets', imageUrl: 'https://s.yimg.com/uu/api/res/1.2/RF.pxZnk28qRNRQXnMrFBg--~B/Zmk9c3RyaW07aD0xNjA7cHlvZmY9MDtxPTgwO3c9MzQwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/https://img.huffingtonpost.com/asset/5c4dc3ea23000059011fa21d.jpg.cf.jpg'},
            {title: 'Sweethearts spike in popularity on Amazon', imageUrl: 'https://s.yimg.com/uu/api/res/1.2/CDEEeNmRp4sI8rqZeeoMcQ--~B/Zmk9c3RyaW07aD0xNjA7cHlvZmY9MDtxPTgwO3c9MzQwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/https://img.huffingtonpost.com/asset/5c4a2cc323000059011fa178.jpg.cf.jpg'},
            {title: 'World economy faces some pivotal heath checkups', imageUrl: 'https://s.yimg.com/uu/api/res/1.2/DjwMQdBkUqHNwrZpiW2kkA--~B/Zmk9c3RyaW07aD0xNjA7cHlvZmY9MDtxPTgwO3c9MzQwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/homerun/bloomberg_markets_842/44d044697179b5d84aa2d21658164907'},
            {title: 'Maduro cancels demand that US diplomats leave', imageUrl: 'https://s.yimg.com/uu/api/res/1.2/Kw67xUEawwQ5UC7Bv_L09Q--~B/Zmk9c3RyaW07aD0xNjA7cHlvZmY9MDtxPTgwO3c9MzQwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/homerun/bloomberg_markets_842/e9ee4509144af3520502691e12a89ccd'},
            {title: 'Sabic profit misses as product prices decline', imageUrl: 'https://s.yimg.com/uu/api/res/1.2/RG9vmtE1c5tDTyLe3X9vyA--~B/Zmk9c3RyaW07aD0xNjA7cHlvZmY9MDtxPTgwO3c9MzQwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/homerun/bloomberg_markets_842/c5b9dcee42606ddc1dd4599e04e8f4da'},
          ]}
        />

        {/* news with picture */}
        <HomeArticleListItem
          imageUrl="https://s.yimg.com/uu/api/res/1.2/HZn428GLaMxVpKZ3MlYzAA--~B/Zmk9c3RyaW07aD0xMjM7cHlvZmY9MDtxPTgwO3c9MjIwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/homerun/ibd.com/1eca04fa1c2e999f92cbe7d3db997d7e"
          category="Business"
          source="CNBC"
          time="yesterday"
          title="Intel CEO: The government shutdown and US-China trade war curtail consumer and business spending"
          excerpt={'A number of "geopolitical dynamics" are going to weigh on "ultimate consumers and enterprise desires to buy" this year, Intel\'s interim CEO, Robert Swan, says. "We expect those clouds to dissipate over time and get back to a more healthy environment, but right now we\'re a little bit cautious," he says.'}
        />

        {/* news without picture */}
        <HomeArticleListItem
          category="Business"
          source="ETF Trends"
          time="yesterday"
          title={'Why The S&P 500\'s Long-Term Performance Is So Confusion To Investors'}
          excerpt={'Above you see the rolling 10-year return of the S&P 500 Index.  At the far right, you can see a spike in this figure, such that in the past couple of years, the trailing 10-year experience for an investor went from solid (around 6% a year) to over 11% a year.'}
        />
      </div>

      {/* right column */}
      <div className="Fl(start) W(25%)">
        <h2 className="Fz(1em)">My Portfolio & Markets</h2>

        {/* portfolio sidebar */}
        <div className="Mb(20px)">
          <h3 className="Mb(0) Fz(1em) D(ib)">Main ></h3>
          <span className="Mb(0) Fl(end) C(dodgerblue)">+ Add Symbol</span>
          <table className="W(100%)">
            <thead>
              <tr className="BdB Bdbc(gainsboro) Lh(2)">
                <td className="Fz(.75em)">Symbol</td>
                <td className="Fz(.75em) Ta(end)">Last Price</td>
                <td className="Fz(.75em) Ta(end)">Change</td>
                <td className="Fz(.75em) Ta(end)">% Change</td>
              </tr>
            </thead>
            <tbody>
              <tr className="Lh(1.5)">
                <td className="Fw(b) C(dodgerblue)">MCD</td>
                <td className="Ta(end)">184.00</td>
                <td className="Ta(end) C(red)">-3.37</td>
                <td className="Ta(end) C(green)">-1.80%</td>
              </tr>
              <tr className="BdB Bdbc(gainsboro)"><td className="Fz(.75em) Lh(1) Pb(5px)" colSpan="4">McDonald's Corporation</td></tr>
              <tr className="Lh(1.5)">
                <td className="Fw(b) C(dodgerblue)">MCD</td>
                <td className="Ta(end)">184.00</td>
                <td className="Ta(end) C(red)">-3.37</td>
                <td className="Ta(end) C(green)">-1.80%</td>
              </tr>
              <tr className="BdB Bdbc(gainsboro)"><td className="Fz(.75em) Lh(1) Pb(5px)" colSpan="4">McDonald's Corporation</td></tr>
            </tbody>
          </table>
        </div>
        <div className="Bd Ta(c) Fz(.9em) Py(4px) Bdrs(4px) C(dodgerblue) Mb(10px)">DotLab Small Business</div>

        {/* sidebar links */}
        <div className="C(gray) Ta(c) Fz(.9em) Mb(5px)">
          <span className="D(ib) Whs(nw) Mx(5px)">Data Disclaimer</span>
          <span className="D(ib) Whs(nw) Mx(5px)">Help</span>
          <span className="D(ib) Whs(nw) Mx(5px)">Suggestions</span>
          <span className="D(ib) Whs(nw) Mx(5px)">Privacy</span>
          <span className="D(ib) Whs(nw) Mx(5px)">About Our Ads</span>
          <span className="D(ib) Whs(nw) Mx(5px)">Terms</span>
        </div>

        {/* sidebar shares */}
        <div className="C(dimgray) Ta(c) Fw(b) Fz(.9em) Mb(20px)">
          <span className="Mx(5px)">Tw</span>
          <span className="Mx(5px)">Fa</span>
          <span className="Mx(5px)">Tb</span>
        </div>
        <div className="C(gray) Ta(c) Fz(.9em)">© 2019 Kailang Fu. All rights reserved.</div>
      </div>
    </div>
  </div>;
}
