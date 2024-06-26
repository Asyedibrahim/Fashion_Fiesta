import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Collections from './pages/Collections';
import Cart from './pages/Cart';

export default function App() {
  return (
    <BrowserRouter>

      <Header/>

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/collections' element={<Collections />} />

        <Route path='/sign-up' element={<SignUp />} />

        <Route path='/sign-in' element={<SignIn />} />

        <Route path='/cart' element={<Cart />} />
      </Routes>

    </BrowserRouter>
  )
}
