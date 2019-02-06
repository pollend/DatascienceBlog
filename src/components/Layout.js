require('../style.scss')
import React from 'react'
import { Link } from 'gatsby'
import Header from './Header'


class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div>
        <Header title={title}/>
        {children}
        <footer className="uk-container uk-container-small">
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
