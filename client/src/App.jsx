import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Collections from './pages/Collections';
import Cart from './pages/Cart';

export default function App() {
  return (
    <BrowserRouter>

      <Header/>

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/collections' element={<Collections />} />

        <Route path='/cart' element={<Cart />} />

      </Routes>

    </BrowserRouter>
  )
}
