import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as header from './header.module.scss'
import Container from '../Container'
import Row from '../Row'
import logo from '../../images/paw-icon.png'
import SearchBar from '../SearchBar'
import { ReactComponent as SearchSVG } from '../../images/Search.svg'
import { H2 } from '../Typography'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      isNavFixed: false,
      isNavActive: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fixSiteHeader);
    window.addEventListener('resize', this.deactivateSiteHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixSiteHeader);
    window.addEventListener('resize', this.deactivateSiteHeader);
  }

  fixSiteHeader = () => {
    const siteHeader = document.querySelector(`.${header.site__header}`);
    const breakpoint = window.innerWidth >= 993 ? 90 : 60; // 993 == min-tablet

    if (window.scrollY >= breakpoint) { // window y >= header height
      document.body.style.paddingTop = breakpoint + 'px';
      siteHeader.classList.add(header.state_fixed);
      this.setState({
        isNavFixed: true,
      });
    } else {
      siteHeader.classList.remove(header.state_fixed);
      document.body.style.paddingTop = 0;
      this.setState({
        isNavFixed: false,
      })
    }
  }

  deactivateSiteHeader = () => {
    if (window.innerWidth >= 993) {
      this.setState({
        isNavActive: false,
      })
    }
  }

  handleClick = e => {
    this.setState({
      isNavActive: !this.state.isNavActive,
    })
    e.preventDefault();
  }
  
  render() {
    const { isNavActive } = this.state;
    console.log(isNavActive)

    return (
      <section className={header.site__header}>
        <Container className={header.container}>
          <Row className={header.row}>
            <Link to='/'>
              <div
                className={classnames(header.box__left)}
                onClick={() => this.setState({ redirect: true })}
              >
                <img 
                  src={logo} 
                  alt='logo' 
                  className={header.logo}
                />
                <H2 text={`Adopt a Pet`} className={header.site_name} />
              </div>
            </Link>
            <div className={header.box__right } >
              <SearchSVG className={header.search_icon} onClick={this.handleClick}/>
              <div className={classnames(header.search_container, {[header.search_container__active]: isNavActive})}>
                <SearchBar className={classnames({[header.search_bar__active]: isNavActive})} />
              </div>
            </div>
          </Row>
        </Container>
      </section>
    )
  }
}