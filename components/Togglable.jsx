import { useState } from 'react'
import './login.css';  // Assume you have styles in Login.css or move your CSS here

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div >
      <div style={hideWhenVisible}>
        <button className='togglable' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='togglable' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable