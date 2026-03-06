/* @flow */
import { connect } from 'react-redux'
import React from 'react'
import Home from './components/Home'

function HomeContainer (props) {
  return (
    <Home {...props} dispatch={props.dispatch}/>
  )
}

export default connect(({ home }) => home)(HomeContainer)
