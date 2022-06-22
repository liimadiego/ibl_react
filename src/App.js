import { Route, Routes, Link } from 'react-router-dom';

import './css/global.css';

import Header from './layout/header';
import HomePage from './pages/index';
import CreatePage from './pages/create';
import EditPage from './pages/edit';

function App() {

  return (
    <>
      <div className='area_load'>
        <div className="lds-roller">
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <Header />
      <ul className='MenuTemporario'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/cadastrar'>Cadastrar</Link></li>
        <li><Link to='/editar'>Editar</Link></li>
      </ul>
      <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/cadastrar' element={ <CreatePage /> }/>
        <Route path='/editar/:id' element={ <EditPage /> }/>
        <Route path='*' element={ <h1>404 Not found</h1> }/>
      </Routes>
    </>
  );
}

export default App;
