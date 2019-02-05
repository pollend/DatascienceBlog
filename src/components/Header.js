import React from 'react'


class Header extends React.Component{
  render() {
    return(
      <nav className="uk-navbar-container" uk-navbar="">

        <div className="uk-navbar-left">

          <ul className="uk-navbar-nav">
            <li className="uk-active"><a href="#">Active</a></li>
            <li>
              <a href="#">Parent</a>
              <div className="uk-navbar-dropdown">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  <li className="uk-active"><a href="#">Active</a></li>
                  <li><a href="#">Item</a></li>
                  <li><a href="#">Item</a></li>
                </ul>
              </div>
            </li>
            <li><a href="#">Item</a></li>
          </ul>

        </div>

        <div className="uk-navbar-right">

          <ul className="uk-navbar-nav">
            <li className="uk-active"><a href="#">Active</a></li>
            <li>
              <a href="#">Parent</a>
              <div className="uk-navbar-dropdown">
                <ul className="uk-nav uk-navbar-dropdown-nav">
                  <li className="uk-active"><a href="#">Active</a></li>
                  <li><a href="#">Item</a></li>
                  <li><a href="#">Item</a></li>
                </ul>
              </div>
            </li>
            <li><a href="#">Item</a></li>
          </ul>

        </div>

      </nav>
    )
  }
}
export default Header

/*<div className="uk-navbar-left">
  <ul className="uk-navbar-nav">
    <li className="uk-active"><a href=""></a></li>
    <li className="uk-parent"><a href=""></a></li>
    <li><a href=""></a></li>
  </ul>
</div>*/