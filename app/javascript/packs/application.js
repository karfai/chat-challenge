/* eslint no-console:0 */
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const App = props => (
  <div>Hello {props.name}!</div>
)

App.defaultProps = {
  name: 'David'
}

App.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
