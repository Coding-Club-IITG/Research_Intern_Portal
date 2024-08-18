import { DatePicker } from 'antd';
import react from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Root from './components/Root';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Root/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
