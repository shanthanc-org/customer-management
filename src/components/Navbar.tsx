import React, {useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MessageContext from "../context/MessageContext";

const Navbar: React.FC = () => {
    const{ setSuccessMessage, setErrorMessage } = useContext(MessageContext);
    const navigate = useNavigate();

    const handleResetAndNavigate = (path: string) => {
        // reset messages
        setSuccessMessage('');
        setErrorMessage('');
        // Navigate to target Path
        navigate(path);
    }
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#eee' }}>
            <NavLink to="/" onClick={() => handleResetAndNavigate('/')}>Home</NavLink>
            <NavLink to="/add-customer" onClick={() => handleResetAndNavigate('/add-customer')}>Add New Customer</NavLink>
            <NavLink to="/update-customer" onClick={() => handleResetAndNavigate('/update-customer')}>Update Customer Address</NavLink>
            <NavLink to="/get-customer" onClick={() => handleResetAndNavigate('/get-customer')}>Get Customer</NavLink>
            <NavLink to="/get-customer-list" onClick={() => handleResetAndNavigate('/get-customer-list')}>Get Customer List</NavLink>
            <NavLink to="/delete-customer" onClick={() => handleResetAndNavigate('/delete-customer')}>Delete Customer</NavLink>
        </nav>
    );
};

export default Navbar;