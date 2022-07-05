import './App.css';
import Register from './components/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Main from './components/Main';
import Header from './components/Header';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/home' element={<Main/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
