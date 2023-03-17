import { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[]
    };
  };

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users });
      })
  };

  render() {
    return (
      <ul>{
        this.state.users.map(user => (
          <li>Username {user.username}, Age: {user.age}</li>
        ))
      }</ul>
    );
  };
};

export default Test;