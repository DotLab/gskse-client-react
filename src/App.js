import React, {Component} from 'react';

class App extends Component {
  render() {
    return <div className="Mih(1000px)">
      <div className="Bgc(azure) Pos(st) T(0) Z(1)">
        <div className="Maw(1280px) Mx(a) Pos(r)">
          <span className="Pend(40px) Fz(1.5em) Lh(2)">Gensokyo Stock Exchange</span>
          <span className="Va(tb)">
            <input
              className="W(350px)"
              type="text"
              placeholder="Search for news, symbols or companies"/>
            <button>Go</button>
          </span>
          <span className="Pos(a) End(40px) B(10px)">
            <span className="Cur(p) C(dodgerblue):h Fw(b) Mend(20px)">Kailang</span>
            <span className="Cur(p) C(dodgerblue):h Fw(b)">Mail</span>
          </span>
        </div>
      </div>

      <div className="Bgc(aliceblue)">
        <div className="Maw(1280px) Mx(a)">
          <span className="Cur(p) C(dodgerblue):h Fw(b) Lh(2) Mend(30px)">Finance Home</span>
          <span className="Cur(p) C(dodgerblue):h Fw(b) Lh(2) Mend(30px)">Watchlists</span>
          <span className="Cur(p) C(dodgerblue):h Fw(b) Lh(2) Mend(30px)">My Portfolio</span>
          <span className="Cur(p) C(dodgerblue):h Fw(b) Lh(2) Mend(30px)">Screeners</span>
          <span className="Cur(p) C(dodgerblue):h Fw(b) Lh(2) Mend(30px)">Markets</span>
          <span className="Cur(p) C(dodgerblue):h Fw(b) Lh(2) Mend(30px)">Industries</span>
        </div>
      </div>

      <div className="Mt(10px)">
        <div className="Maw(1280px) Mx(a)">
          <div className="Fl(start) W(75%) Pend(40px)">
            <div>
              <img className="Fl(start) W(20%) Pend(10px) Mt(10px)" src="https://s.yimg.com/uu/api/res/1.2/HZn428GLaMxVpKZ3MlYzAA--~B/Zmk9c3RyaW07aD0xMjM7cHlvZmY9MDtxPTgwO3c9MjIwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/homerun/ibd.com/1eca04fa1c2e999f92cbe7d3db997d7e" alt=""/>
              <div className="Fl(start) W(75%)">
                <div className="Mb(0)">
                  <span className="C(dodgerblue) Fw(b) Mend(10px)">Business</span>
                  <span className="C(dimgray)">CNBC • yesterday</span>
                </div>
                <h3 className="Lh(1.15) Mb(4px)">Intel CEO: The government shutdown and US-China trade war curtail consumer and business spending</h3>
                <p className="Lh(1.15)">A number of "geopolitical dynamics" are going to weigh on "ultimate consumers and enterprise desires to buy" this year, Intel's interim CEO, Robert Swan, says. "We expect those clouds to dissipate over time and get back to a more healthy environment, but right now we're a little bit cautious," he says.</p>
              </div>
              <div className="Fl(start) W(5%) Pos(r)">
                <div className="Pos(a) T(10px) End(0)">
                  <div className="C(darkgray) Fw(b) Fz(1.25em)">C</div>
                  <div className="C(darkgray) Fw(b) Fz(1.25em)">L</div>
                  <div className="C(darkgray) Fw(b) Fz(1.25em)">S</div>
                </div>
              </div>
            </div>
            <div>
              <div className="Fl(start) W(95%)">
                <div className="Mb(0)">
                  <span className="C(dodgerblue) Fw(b) Mend(10px)">Business</span>
                  <span className="C(dimgray)">CNBC • yesterday</span>
                </div>
                <h3 className="Lh(1.15) Mb(4px)">Intel CEO: The government shutdown and US-China trade war curtail consumer and business spending</h3>
                <p className="Lh(1.15)">A number of "geopolitical dynamics" are going to weigh on "ultimate consumers and enterprise desires to buy" this year, Intel's interim CEO, Robert Swan, says. "We expect those clouds to dissipate over time and get back to a more healthy environment, but right now we're a little bit cautious," he says.</p>
              </div>
              <div className="Fl(start) W(5%) Pos(r)">
                <div className="Pos(a) T(10px) End(0)">
                  <div className="C(darkgray) Fw(b) Fz(1.25em)">C</div>
                  <div className="C(darkgray) Fw(b) Fz(1.25em)">L</div>
                  <div className="C(darkgray) Fw(b) Fz(1.25em)">S</div>
                </div>
              </div>
            </div>
          </div>
          <div className="Fl(start) W(25%)">
            <h2 className="Fz(1em)">My Portfolio & Markets</h2>
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
                  <tr className="BdB Bdbc(gainsboro)"><td className="Fz(.75em) Lh(1) Pb(5px)" colspan="4">McDonald's Corporation</td></tr>
                  <tr className="Lh(1.5)">
                    <td className="Fw(b) C(dodgerblue)">MCD</td>
                    <td className="Ta(end)">184.00</td>
                    <td className="Ta(end) C(red)">-3.37</td>
                    <td className="Ta(end) C(green)">-1.80%</td>
                  </tr>
                  <tr className="BdB Bdbc(gainsboro)"><td className="Fz(.75em) Lh(1) Pb(5px)" colspan="4">McDonald's Corporation</td></tr>
                </tbody>
              </table>
            </div>
            <div className="Bd Ta(c) Fz(.9em) Py(4px) Bdrs(4px) C(dodgerblue) Mb(10px)">DotLab Small Business</div>
            <div className="C(gray) Ta(c) Fz(.9em) Mb(5px)">
              <span className="D(ib) Whs(nw) Mx(5px)">Data Disclaimer</span>
              <span className="D(ib) Whs(nw) Mx(5px)">Help</span>
              <span className="D(ib) Whs(nw) Mx(5px)">Suggestions</span>
              <span className="D(ib) Whs(nw) Mx(5px)">Privacy</span>
              <span className="D(ib) Whs(nw) Mx(5px)">About Our Ads</span>
              <span className="D(ib) Whs(nw) Mx(5px)">Terms</span>
            </div>
            <div className="C(dimgray) Ta(c) Fw(b) Fz(.9em) Mb(20px)">
              <span className="Mx(5px)">Tw</span>
              <span className="Mx(5px)">Fa</span>
              <span className="Mx(5px)">Tb</span>
            </div>
            <div className="C(gray) Ta(c) Fz(.9em)">© 2019 Kailang Fu. All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default App;
