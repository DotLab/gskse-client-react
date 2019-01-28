import React from 'react';
const ReactMarkdown = require('react-markdown');

export default class NewArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div className="Mt(10px)">
      <div className="W(1280px) Mx(a) ">
        <h2 className="Fw(lr)">Publish a new article</h2>
        <div>
          <div className="W(50%) Fl(start) Pend(10px)">
            <label className="Fw(b) Mb(5px)">Title <span className="C(red)">*</span></label>
            <input id="register-name" className="D(b) W(100%)" type="text"/>
            <label className="D(b) Fz(.8em)">The title of the article.</label>

            <label className="Fw(b) Mb(5px)">Excerpt <span className="C(red)">*</span></label>
            <textarea id="register-name" rows="3" className="D(b) W(100%)" type="text"/>
            <label className="D(b) Fz(.8em)">The initial few sentences of the article.</label>

            <label className="Fw(b) Mb(5px)">Cover URL</label>
            <input id="register-name" className="D(b) W(100%)" type="text"/>
            <label className="D(b) Fz(.8em)">Do you have a picture? Articles without a cover will not get featured.</label>

          </div>
          <div className="W(50%) Fl(start)">
            <div className="Fw(b)"><input type="checkbox" name="gender" onChange={(e)=>console.log(e.target.checked)}/> I wrote this article myself!</div>
            <label className="D(b) Fz(.8em)">If you copied the article from elsewhere, leave this unchecked. If you wrote the article yourself, check this.</label>

            <label className="D(b) Fw(b) Mb(5px)">Source Name <span className="C(red)">*</span></label>
            <input id="register-name" className="D(b) W(100%)" type="text"/>
            <label className="D(b) Fz(.8em)">You copied the article from another place. What's the place called?</label>

            <label className="D(b) Fw(b) Mb(5px)">Source URL <span className="C(red)">*</span></label>
            <input id="register-name" className="D(b) W(100%)" type="text"/>
            <label className="D(b) Fz(.8em)">Give a link to the source article.</label>
          </div>
          <div className="Cf"></div>
        </div>
        <button className="Mend(10px)">Open article editor</button>
        <button>Submit</button>
        <hr className="Op(.2) My(20px)"/>
      </div>

      <div className="StretchedBox Bgc(white) Z(1)">
        <textarea className="W(50%) H(100%) Fl(start) Rsz(n) Ovy(s) Bgc(black) C(white) Ff($monoFonts)" onChange={(e)=> this.setState({markdown: e.target.value})}/>
        <div className="W(50%) H(100%) Fl(start) P(10px) Ovy(s)">
          <h2>Title</h2>
          <hr className="Op(.2)"/>
          <ReactMarkdown source={this.state.markdown}/>
          <hr className="Op(.2)"/>
          <button className="Mend(10px)">Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>;
  }
}
