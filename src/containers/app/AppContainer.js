/* @flow */
import React from 'react'
import { connect } from 'react-redux'
import HomeContainer from '../home/HomeContainer'

function AppContainer ({ location, dispatch }) {
  switch (location) {
    case 'home':
      return <HomeContainer/>
    default:
      return <span>error</span>
  }
}

export default connect(({ app }) => app)(AppContainer)
