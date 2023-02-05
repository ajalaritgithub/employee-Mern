
import './App.css';

import Home from './components/Home';
import Create from './components/create/Create';
import Update from './components/update/Update';
import Login from './components/login/Login';
import { Routes,Route ,BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
   
          
    
          
    <div className="App">
         <Routes>
        
        <Route path='/create'  element={<Create/>} />
        <Route path='/update' element={<Update/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
       
        </Routes>
    </div></Router>
     

     </div>
  );
}

export default App;
