import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import * as header from './header.module.scss'
import Container from '../Container'
import Row from '../Row'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      isNavFixed: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fixSiteHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixSiteHeader);
  }

  fixSiteHeader = () => {
    const siteHeader = document.querySelector(`.${header.site__header}`);
    if (window.scrollY >= siteHeader.offsetHeight) { // window y >= header height
      document.body.style.paddingTop = siteHeader.offsetHeight + 'px';
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
  
  render() {
    return (
      <section className={header.site__header}>
        <Container className={header.container}>
          <Row className={header.row}>
            <Link to='/'>
              <div
                className={classnames(header.image_container)}
                onClick={() => this.setState({ redirect: true })}
              >
                <img 
                  src='http://placekitten.com/60/60' 
                  alt='' 
                  className={header.logo}
                />
              </div>
            </Link>
            <div className={header.categories}>
              <h2 className={header.link} >All</h2>
              <h2 className={header.link} >Dogs</h2>
              <h2 className={header.link} >Cats</h2>
              <h2 className={header.link} >Search</h2>
            </div>
          </Row>
        </Container>
      </section>
    )
  }
}