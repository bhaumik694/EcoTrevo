import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './Routes';
import Navbar from './components/Navbar';
import './App.css'

function App() {

    return (
      <>
       <Router>
      <div>
        <Navbar />
        <AllRoutes  />
      </div> 
      </Router>  
      </>
  );
};

export default App
