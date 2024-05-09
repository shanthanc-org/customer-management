import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MessageProvider} from './context/MessageContext';
import Home from './components/Home';
import AddCustomer from './components/AddCustomer';
import Navbar from "./components/Navbar";
import './App.css';
import UpdateCustomer from "./components/UpdateCustomer";
import GetCustomer from "./components/GetCustomer";
import GetCustomerList from "./components/GetCustomerList";
import DeleteCustomer from "./components/DeleteCustomer";

function App() {
    return (

        <BrowserRouter>
            <Navbar/>
            <MessageProvider>
                <Routes>
                    {<Route path="/" element={<Home />}/>}
                    {<Route path="/add-customer" element={<AddCustomer />}/>}
                    {<Route path="/update-customer" element={<UpdateCustomer />} />}
                    {<Route path="/get-customer" element={<GetCustomer />} />}
                    {<Route path="/get-customer-list" element={<GetCustomerList />} />}
                    {<Route path="/delete-customer" element={<DeleteCustomer />} />}
                    // You can add more routes here as needed
                </Routes>
            </MessageProvider>
        </BrowserRouter>
    );
}

export default App;
