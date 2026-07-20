import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from "react";
import Protected from './components/Protected.jsx';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Loading from './components/Loading.jsx';
import ProfileEdit from './pages/ProfileEdit.jsx';
import PublicRoute from './components/PublicRoute.jsx';
const Register = lazy(()=> import("./pages/Register.jsx"))
const Chat = lazy(()=> import ("./pages/Chat.jsx"))
const Login = lazy(()=> import ("./pages/Login.jsx"))

function App() {



  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000}/>
        <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={
          <PublicRoute>
          <Register /> </PublicRoute>} />
        <Route path='/login' element={ <PublicRoute> <Login /> </PublicRoute>} />
        <Route path='/chat' element={
          <Protected>
            <Chat />
          </Protected>} />

          <Route path='/edit' element={
            <Protected>
            <ProfileEdit/></Protected>} />
      </Routes>
</Suspense>
    </div>

  )
}

export default App