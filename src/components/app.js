import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchPage from './search_page'
import NavBar from './nav_bar'
import WatchList from '../containers/watch_list';
import ShowPage from '../containers/show_page';
import LoginForm from '../containers/login_form';
import { AuthAdapter } from '../adapters'

export default class App extends Component {
  constructor(){
      super()
      this.state = {
        auth: {
          isLoggedIn: false,
          user: {}
        }
      }
      this.logIn = this.logIn.bind(this)
      this.logOut = this.logOut.bind(this)
    }

    componentDidMount(){
      if (localStorage.getItem('jwt')) {
        AuthAdapter.currentUser()
          .then(user => {
            console.log("getting current",user)
            if (!user.error) {
              this.setState({
                auth: {
                  isLoggedIn: true,
                  user: user
                }
              })
            }
          })
        }
      }

    logIn(loginParams){
      AuthAdapter.login(loginParams)
        .then( user => {
          if (!user.error) {
            this.setState({
              auth: { isLoggedIn: true, user: user}
            })

            localStorage.setItem('jwt', user.jwt )
          }
        })
      }

    logOut(){
    this.setState({
      auth: { isLoggedIn: false, user: {} }
    })
    localStorage.clear()
    }

  render() {
    let title
   if (this.state.auth.isLoggedIn) {
     title = `${this.state.auth.user.username}, Welcome to`
   } else {
     title = 'Welcome to '
   }

    return (
      <div>
        <NavBar title={title} logOut={this.logOut}/>
        <Switch>
          <Route path='/shows/:id' component={ShowPage}></Route>
          <Route path='/shows' component={WatchList}></Route>
          <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
          <Route path='/' render={() => <SearchPage />} />
        </Switch>
      </div>
    );
  }
}
