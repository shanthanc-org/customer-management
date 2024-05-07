import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MessageProvider} from './context/MessageContext';
import Home from './components/Home';
import AddCustomer from './components/AddCustomer';
import Navbar from "./components/Navbar";
import logo from './logo.svg';
import './App.css';

function App() {
    return (

        <BrowserRouter>
            <Navbar/>
            <MessageProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/add-customer" element={<AddCustomer/>}/>
                    {/*<Route path="/contact" element={<Contact />} />*/}
                    {/*<Route path="/products" element={<Products />} />*/}
                    {/*<Route path="/login" element={<Login />} />*/}
                    // You can add more routes here as needed
                </Routes>
            </MessageProvider>
        </BrowserRouter>
    );
}

export default App;
