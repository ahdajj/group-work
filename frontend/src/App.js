import './App.css';
import {BrowserRouter , Routes , Route } from 'react-router-dom'

// pages 
import Home from './pages/home'
import About from './pages/about'
import AddNew from './pages/addNew'
import Login from './pages/login'
import SignUp from './pages/signup'


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <div>
      <Routes>
        <Route path='/home' element = {<Home />} />
        <Route path='/about' element = {<About />} />
        <Route path='/post/addnew' element = {<AddNew />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/signup' element = {<SignUp />} />
      </Routes>
     </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
