/* eslint "flowtype/require-valid-file-annotation": 0 */
import './styles/init.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './containers/Root'

const container = document.querySelector('.main')
const root = createRoot(container)
root.render(<Root/>)
