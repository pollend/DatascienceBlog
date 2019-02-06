import React from 'react'
import {graphql} from "gatsby";


class Header extends React.Component{
  render() {
    const { title} = this.props

    return(
      <nav className="uk-navbar-container uk-navbar-transparent" uk-navbar="">
        <div className="uk-navbar-right">
          <a className="uk-navbar-item uk-logo" href="#">{title}</a>

        </div>

      </nav>
    )
  }
}
export default Header
