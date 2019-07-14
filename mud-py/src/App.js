import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import Landing from './Components/Landing';
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import About from './Components/About';
import DungeonPage from './Components/DungeonPage';
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentRoom: {}
    };

    this.content = {
      headers: {
        Authorization: ''
      }
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('Authorization');
    this.content.headers.Authorization = 'Token ' + token;
    if (token) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  componentDidUpdate() {
    axios
      .get('https://lambda-mud-test.herokuapp.com/api/adv/init/', this.content)
      .then(data => {
        this.setState({ currentRoom: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  tempChangeLogin = () => {
    this.setState(prev => {
      return { loggedIn: !prev.loggedIn };
    });
  };

  login = () => {
    if (localStorage.getItem('Authorization')) {
      this.setState({ loggedIn: true });
      this.props.history.push('/dungeon')
    }
  };

  logout = () => {
    localStorage.removeItem('Authorization');
    this.setState({ loggedIn: false });
    this.props.history.push('/login')
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <NavBar tempChangeLogin={this.tempChangeLogin} />
        <Route exact path="/" component={Landing} />
        <Route path="/about" component={About} />
        <Route path="/login" render={() => <Login login={this.login} /> }  />
        <Route path="/dungeon" render={() => <DungeonPage state={this.state} />} />
      </div>
    );
  }
}

export default withRouter(App);
