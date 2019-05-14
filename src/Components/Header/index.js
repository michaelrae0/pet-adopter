import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as header from './header.module.scss'
import Container from '../Container'
import Row from '../Row'
import SearchBar from '../SearchBar'
import { ReactComponent as FishSVG } from '../../images/fish.svg'
import { ReactComponent as SearchSVG } from '../../images/search-icon.svg'

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
    window.addEventListener('click', () => this.deactivateSiteHeader(true))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixSiteHeader);
    window.removeEventListener('resize', this.deactivateSiteHeader);
    window.removeEventListener('click', () => this.deactivateSiteHeader(true))
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

  deactivateSiteHeader = (isClick = false) => {
    if (window.innerWidth >= 993 || (isClick && this.state.isNavActive === true)) {
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
    const { persistentZip } = this.props.location.state;

    return (
      <section className={classnames(header.site__header)} onClick={e => e.stopPropagation()} >
        <Container className={header.container}>
          <Row className={header.row}>
            <Link to='/'>
              <div className={classnames(header.box__left)} onClick={() => this.setState({ redirect: true })} >
                <FishSVG className={header.logo} />
              </div>
            </Link>
            <div className={header.box__right } >
              <SearchSVG className={header.search_icon} onClick={this.handleClick}/>
              <div className={classnames(header.search_container, {[header.search_container__active]: isNavActive})}>
                <SearchBar history={this.props.history} persistentZip={persistentZip} />
              </div>
            </div>
          </Row>
        </Container>
      </section>
    )
  }
}