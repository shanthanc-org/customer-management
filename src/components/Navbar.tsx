import React from "react";
import { NavLink } from "react-router-dom";
const Navbar: React.FC = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#eee' }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/add-customer">Add New Customer</NavLink>
            <NavLink to="/update-customer">Update Customer Address</NavLink>
            <NavLink to="/get-customer">Get Customer</NavLink>
            <NavLink to="/get-customer-list/first-name">Get Customer List By First Name</NavLink>
            <NavLink to="/get-customer-list/last-name">Get Customer List By Last Name</NavLink>
            <NavLink to="/delete-customer">Delete Customer</NavLink>
        </nav>
    );
};

export default Navbar;