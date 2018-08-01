import React from 'react';

class Base extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {
    //get articles
  }

  render() {
    return (
      <div>
        <h1>Totally Real News for a Totally Real World</h1>
      </div>
    );
  }
}

export default Base;