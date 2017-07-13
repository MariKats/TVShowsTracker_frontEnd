import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted>
        <Menu.Header>
          <Menu.Item
            name='logo'
            active={activeItem === 'logo'}
            onClick={this.handleItemClick}>
            <Link to="/" className='navbar-brand'>ShowsTracker</Link>
          </Menu.Item>
        </Menu.Header>

        <Menu.Menu position='right'>
          <Menu.Item
            name='watchlist'
            active={activeItem === 'watchlist'}
            onClick={this.handleItemClick}>
            <Link to="/shows">Watchlist</Link>
          </Menu.Item>

        </Menu.Menu>
      </Menu>
    )
  }
}


// <Menu.Item
// name='log_in'
// active={activeItem === 'log_in'}
// onClick={this.handleItemClick}>
// <Link to="/login">Log In</Link>
// </Menu.Item>
//
// <Menu.Item
// name='log_out'
// active={activeItem === 'log_out'}
// onClick={this.props.logOut}>
// Log Out
// </Menu.Item>
