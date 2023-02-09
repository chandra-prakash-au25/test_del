import Home from "./component/Home";
import Hotel from "./component/Hotel";
import Login from "./component/Login";
import Wrong from "./component/Wrong";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< Login />}></Route>
        <Route exact path='/home' element={< Home />}></Route>
        <Route exact path='/hotel' element={< Hotel />}></Route>
      </Routes>
    </Router>
      );
}

export default App;
