import React from 'react';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.getProfile().then((profile) => {

    });
  }

  render() {
    return <div>hi</div>;
  }
}
