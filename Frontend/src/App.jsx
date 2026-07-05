import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from "react";
// import Register from './pages/Register.jsx';
const Register = lazy(()=> import("./pages/Register.jsx"))
const Chat = lazy(()=> import ("./pages/Chat.jsx"))
const Login = lazy(()=> import ("./pages/Login.jsx"))
import Protected from './components/Protected.jsx';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Loading from './components/Loading.jsx';

function App() {



  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000}/>
        <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={
          <Protected>
            <Chat />
          </Protected>} />
      </Routes>
</Suspense>
    </div>

  )
}

export default App