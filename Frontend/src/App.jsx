import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Chat from './pages/Chat.jsx';
import Protected from './components/Protected.jsx';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App() {



  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000}/>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={
          <Protected>
            <Chat />
          </Protected>} />
      </Routes>

    </div>

  )
}

export default App