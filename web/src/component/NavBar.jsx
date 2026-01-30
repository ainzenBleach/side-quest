import "./CSS/NavBar.css"

import {Link, NavLink} from "react-router-dom"

const navBar = () => {
  return (
    <nav className="bar">
      <div className="home">
        <NavLink to="/"><span>Home</span></NavLink>
      </div>
      
      <div className="pages"> 
        <NavLink to="/store"><span>Store</span></NavLink>
        <NavLink to="/tasks"><span>Tasks</span></NavLink>
      </div>
    </nav>
  )
}

export default navBar