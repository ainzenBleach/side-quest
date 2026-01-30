

//Style
import './App.css'

//Config router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//pages
import ListTask from './pages/ListTask'

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
