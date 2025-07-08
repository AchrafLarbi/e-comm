import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { HashRouter as Router,Route,Routes} from 'react-router-dom' 
// we used HashRouter instead of BrowserRouter because of the error in the deployment
import Haeder from "./components/Haeder";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductPage from "./screens/ProductPage";
import CartPage from "./screens/CartPage";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage";
import ProfilePage from "./screens/ProfilePage";
import ShippingPage from "./screens/ShippingPage";
import PaymentPage from "./components/PaymentPage";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductsListScreen from "./screens/ProductsListScreen";
import ProductCreateUpdate from "./screens/ProductCreateUpdate";
import OrdersListScreen from "./screens/OrdersListScreen";
import MyOrders from "./screens/MyOrders";


function App() {
  return (
    <Router className="App">
      <Haeder />
      <main className="p-3">
        <Container className=" justify-content-center align-items-center">
          {/* <h1>Welcome to Romyia's Shop</h1> */}
          <Routes>
            <Route path="/" Component={HomeScreen} ></Route>
            <Route path="/product/:id" Component={ProductPage}></Route>
            <Route path="/cart/:id?" Component={CartPage}></Route>
            <Route path="/login" Component={LoginPage}></Route>
            <Route path="/register" Component={RegisterPage}></Route>
            <Route path="/profile" Component={ProfilePage}></Route>
            <Route path="/my-orders" Component={MyOrders}></Route>
            <Route path="/shipping" Component={ShippingPage}></Route>
            <Route path="/payment" Component={PaymentPage}></Route>
            <Route path="/placeorder" Component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" Component={OrderScreen}></Route>
            {/* admin */}
            <Route path="/admin/users" Component={UserListScreen}></Route>
            <Route path='admin/users/:id/edit' Component={UserEditScreen}></Route>
            <Route path="/admin/products" Component={ProductsListScreen}></Route>
            <Route path="/admin/products/:id/edit" Component={ProductCreateUpdate}></Route>
            <Route path="/admin/products/add" Component={ProductCreateUpdate}></Route>
            <Route path="/admin/orders" Component={OrdersListScreen}></Route>



          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
