import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Link, Routes,Route} from 'react-router-dom'

import Create from './components/create'
import Edit from './components/edit'
import List from './components/list'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <BrowserRouter>
     <nav className="navbar navbar-expand bg-dark border-bottom border-body" data-bs-theme="dark" >
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">MERN</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/create">Create</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/list">List</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<Routes>
  <Route path ='/' element={<Create/>}  />
  <Route path ='/create' element={<Create/>}  />
  <Route path ='/list' element={<List/>}  />
  <Route path ='/edit/:id' element={<Edit/>}  />
</Routes>
      </BrowserRouter>
      
      
    
  )
}

export default App
