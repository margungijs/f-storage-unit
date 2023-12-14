import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserAdd from "./components/UserAdd";
import UserOutput from "./components/UserOutput";
import UserEdit from "./components/UserEdit";
import TabComponent from './components/Tab';
import Company  from './components/Company';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/UserAdd" element = {<UserAdd />}/>
        <Route path = "/UserOutput" element = {<UserOutput />}/>
        <Route path = "/UserEdit" element = {<UserEdit />}/>
      </Routes>
    </Router>
  );
}

export default App;
