import React from 'react';
import ReactMarkdown from 'react-markdown';

export default class NewArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.openEditor = this.openEditor.bind(this);
    this.saveEditor = this.saveEditor.bind(this);
    this.cancelEditor = this.cancelEditor.bind(this);

    this.state = {
      doShowEditor: false,
    };
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onCheckboxChange(e) {
    this.setState({[e.target.name]: e.target.checked});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.newArticle(this.state);
  }

  openEditor() {
    this.setState({editedMarkdown: this.state.markdown, doShowEditor: true});
  }

  saveEditor() {
    this.setState({markdown: this.state.editedMarkdown, doShowEditor: false});
  }

  cancelEditor() {
    this.setState({doShowEditor: false});
  }

  render() {
    return <div className="Mt(10px)">
      <div className="W(1280px) Mx(a) ">
        <h2 className="Fw(lr)">Publish a new article</h2>
        <form onSubmit={this.onSubmit}>
          {/* left */}
          <div className="W(50%) Fl(start) Pend(10px)">
            <div className="Mb(10px)">
              <label className="Fw(b)">Title <span className="C(red)">*</span></label>
              <input className="D(b) W(100%)" required type="text" name="title" onChange={this.onChange}/>
              <label className="D(b) Fz(.8em)">The title of the article.</label>
            </div>

            <div className="Mb(10px)">
              <label className="Fw(b)">Excerpt <span className="C(red)">*</span></label>
              <textarea className="D(b) W(100%)" required rows="3" name="excerpt" onChange={this.onChange}/>
              <label className="D(b) Fz(.8em)">The initial few sentences of the article.</label>
            </div>

            <div className="Mb(10px)">
              <label className="Fw(b)">Cover URL</label>
              <input className="D(b) W(100%)" type="text" name="coverUrl" onChange={this.onChange}/>
              <label className="D(b) Fz(.8em)">Do you have a picture? Articles without a cover will not get featured.</label>
            </div>

            <button className="Mend(10px)" type="button" onClick={this.openEditor}>Edit article</button>
            <button type="submit">Submit</button>
          </div>
          {/* right */}
          <div className="W(50%) Fl(start)">
            <div className="Mb(10px)">
              <div className="Fw(b)"><input type="checkbox" name="isOriginal" onChange={this.onCheckboxChange}/> I wrote this article myself!</div>
              <label className="D(b) Fz(.8em)">If you copied the article from elsewhere, leave this unchecked. If you wrote the article yourself, check this.</label>
            </div>

            {!this.state.isOriginal && <div className="Mb(10px)">
              <label className="Fw(b)">Source Name <span className="C(red)">*</span></label>
              <input className="D(b) W(100%)" required={!this.state.isOriginal} type="text" name="sourceName" onChange={this.onChange}/>
              <label className="D(b) Fz(.8em)">You copied the article from another place. What's the place called?</label>
            </div>}

            {!this.state.isOriginal && <div className="Mb(10px)">
              <label className="Fw(b)">Source Title <span className="C(red)">*</span></label>
              <input className="D(b) W(100%)" required={!this.state.isOriginal} type="text" name="sourceTitle" onChange={this.onChange}/>
              <label className="D(b) Fz(.8em)">What's the title of the original article?</label>
            </div>}

            {!this.state.isOriginal && <div className="Mb(10px)">
              <label className="Fw(b)">Source URL <span className="C(red)">*</span></label>
              <input className="D(b) W(100%)" required={!this.state.isOriginal} type="text" name="sourceUrl" onChange={this.onChange}/>
              <label className="D(b) Fz(.8em)">Give a link to the source article.</label>
            </div>}
          </div>
          <div className="Cf"></div>
        </form>

        <hr className="Op(.2) My(10px)"/>
        <h2>{this.state.title}</h2>
        <p className="C(gray)">{this.state.excerpt}</p>
        <hr className="Op(.2)"/>
        <div className="article">
          <ReactMarkdown source={this.state.markdown}/>
        </div>
      </div>

      <div className={'StretchedBox Bgc(white) Z(1) ' + (this.state.doShowEditor ? '' : 'D(n)')}>
        <textarea
          className="W(50%) H(100%) Fl(start) Rsz(n) Ovy(s) Bgc(black) C(white) Ff($monoFonts)"
          name="editedMarkdown"
          onChange={this.onChange}
        />
        <div className="W(50%) H(100%) Fl(start) P(10px) Ovy(s)">
          <h2>{this.state.title}</h2>
          <hr className="Op(.2)"/>
          <div className="article">
            <ReactMarkdown source={this.state.editedMarkdown}/>
          </div>
          <hr className="Op(.2)"/>
          <button className="Mend(10px)" onClick={this.saveEditor}>Save</button>
          <button onClick={this.cancelEditor}>Cancel</button>
        </div>
      </div>
    </div>;
  }
}
