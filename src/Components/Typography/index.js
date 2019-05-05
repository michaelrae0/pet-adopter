import React from 'react';
import classnames from 'classnames';

import * as type from './typography.module.scss';

// Details main title
export const H1 = ({id, className, text}) => ( 
  <h1 className={classnames(className, type.h1)} id={id}>{text}</h1>
)

// Details subtitles
export const H2 = ({id, className, text}) => ( 
  <h2 className={classnames(className, type.h2)} id={id}>{text}</h2>
)

export const H3 = ({id, className, text}) => (
  <h3 className={classnames(className, type.h3)} id={id}>{text}</h3>
)

export const H4 = ({id, className, text, bold}) => (
  <h4 className={classnames(className, type.h4, {[type.bold]: bold})} id={id}>{text}</h4>
)

export const H5 = ({id, className, text, bold}) => (
  <h5 className={classnames(className, type.h5, {[type.bold]: bold})} id={id}>{text}</h5>
)

export const H6 = ({id, className, text, bold}) => (
  <h6 className={classnames(className, type.h6, {[type.bold]: bold})} id={id}>{text}</h6>
)

// Details body text
export const SectionBody = ({id, className, text}) => ( 
  <h3 className={classnames(className, type.sectionBody)} id={id}>{text}</h3>
)