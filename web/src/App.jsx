//Components
import NavBar from './component/NavBar.jsx'

//Style
import './App.css'

//Config router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//pages
import ListTask from './pages/ListTask'
import Home from './pages/Home'
import Store from './pages/Store'

function App() {
  return(
    <div>
      <h1>teste</h1>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<ListTask />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
