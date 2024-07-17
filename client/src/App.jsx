import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Collections from './pages/Collections';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import CreateProduct from './pages/CreateProduct';
import Product from './pages/Product';
import EditProduct from './pages/EditProduct';

export default function App() {
  return (
    <BrowserRouter>

      <Header/>

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/collections' element={<Collections />} />

        <Route path='/cart' element={<Cart />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/create-product' element={<CreateProduct />}></Route>
          <Route path='/edit-product/:productId' element={<EditProduct />}></Route>
        </Route>

        <Route path='/product/:productId' element={<Product />} />

      </Routes>

    </BrowserRouter>
  )
}
