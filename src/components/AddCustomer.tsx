import React, {useState, useContext, ChangeEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {addCustomer, Customer, ErrorResponse, US_STATES} from '../api';
import MessageContext from '../context/MessageContext';
import axios from 'axios';

// Regex patterns for validation
const dateOfBirthPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19[2-9]\d|20[01]\d|3000)$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ssnPattern = /^\d{3}-\d{2}-\d{4}|d{9}$/;
const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}|d{10}$/;

const AddCustomer: React.FC = () => {
    const [customer, setCustomer] = useState<Customer>({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        ssn: '',
        phoneNumber: '',
        address: {
            street: '',
            city: '',
            state: 'IL',
            zipCode: '',
        },
    });


    // Access to the global success and error message handlers
    const {setSuccessMessage, setErrorMessage} = useContext(MessageContext);

    //use navigate to programmatically navigate
    const navigate = useNavigate();

    //function to handle input changes to the form data
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setCustomer({...customer, [name]: value})
    };


    //function to handle address change
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setCustomer({...customer, address: {...customer.address, [name]: value}});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("handling submit - just entered")
        e.preventDefault();
        console.log("handling submit")
        if (!dateOfBirthPattern.test(customer.dateOfBirth)) {
            setErrorMessage('Invalid Date of Birth. Use MM/dd/yyyy.');
            setSuccessMessage('');
            alert('Invalid Date of Birth. Use MM/dd/yyyy.')
            return;
        }

        // Validate Email
        if (!emailPattern.test(customer.email)) {
            setErrorMessage('Invalid email format.');
            setSuccessMessage('');
            alert('Invalid email format.')
            return;
        }

        // Validate SSN
        if (!ssnPattern.test(customer.ssn)) {
            setErrorMessage('Invalid SSN format. Use xxx-xx-xxxx.');
            setSuccessMessage('');
            alert('Invalid SSN format. Use xxx-xx-xxxx.')
            return;
        }

        // Validate Phone Suffix
        if (!phoneNumberPattern.test(customer.phoneNumber)) {
            setErrorMessage('Invalid phone number format. Use xxx-xxx-xxxx.');
            setSuccessMessage('');
            alert('Invalid phone number format. Use xxx-xxx-xxxx.')
            return;
        }


        try {
            const response = await addCustomer(customer);
            console.log(response);
            const {accountKey, accountNumber} = response.data;
            if (accountKey.length === 9 && accountNumber.length === 12) {
                setSuccessMessage("Customer added successfully!");
                setErrorMessage('');
            } else {
                console.error('Account Key or Account Number cannot be retrieved.');
                setErrorMessage('Customer account key or account number cannot be retrieved. Please verify.');
                setSuccessMessage('');
            }
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                console.log(errorResponse);
                let httpStatus = error.response.status;
                if (httpStatus === 500 ) {
                    console.error('Failed to add customer due to server error.', errorResponse.errorMessage)
                    setErrorMessage('Server error. Our technical team is working on it. Thank you for your patience');
                    setSuccessMessage('');
                }
                setErrorMessage(`Failed to add customer due to -> ${errorResponse.errorMessage}`);
                setSuccessMessage('');

            } else {
                console.error('Failed to add customer due to unknown error.', error)
                setErrorMessage('Unknown error occurred. Please try again after sometime');
                setSuccessMessage('');
            }
            navigate('/');
        }
    }

    const resetForm = () => {
        setCustomer({
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: '',
            ssn: '',
            phoneNumber: '',
            address: {
                street: '',
                city: '',
                state: 'IL', // Default or reset to initial state
                zipCode: '',
            },
        });
        setErrorMessage('');
        setSuccessMessage('');
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Customer</h2>
            <table>
                <tbody>
                <tr>
                    <td><label>First Name:</label></td>
                    <td><input name="firstName" value={customer.firstName} onChange={handleInputChange}/></td>
                </tr>
                <tr>
                    <td><label>Last Name:</label></td>
                    <td><input name="lastName" value={customer.lastName} onChange={handleInputChange}/></td>
                </tr>
                <tr>
                    <td><label>Email:</label></td>
                    <td><input name="email" value={customer.email} onChange={handleInputChange}/></td>
                </tr>
                <tr>
                    <td><label>Date of Birth (MM/dd/yyyy):</label></td>
                    <td><input name="dateOfBirth" value={customer.dateOfBirth} onChange={handleInputChange}/></td>
                </tr>
                <tr>
                    <td><label>SSN (xxx-xx-xxxx):</label></td>
                    <td><input name="ssn" value={customer.ssn} onChange={handleInputChange}/></td>
                </tr>
                <tr>
                    <td><label>Phone Number:</label></td>
                    <td>
                        <div style={{display: 'flex'}}>
                            <input name="phonePrefix" value="+1" readOnly style={{width: '30px', marginRight: '5px'}}/>
                            <input name="phoneNumber" value={customer.phoneNumber} onChange={handleInputChange}/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label>State:</label></td>
                    <td>
                        <select name="state" value={customer.address.state} onChange={handleAddressChange}>
                            {US_STATES.map(state => (
                                <option key={state.code} value={state.code}>{state.name}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label>Street:</label></td>
                    <td><input name="street" value={customer.address.street} onChange={handleAddressChange}/></td>
                </tr>
                <tr>
                    <td><label>City:</label></td>
                    <td><input name="city" value={customer.address.city} onChange={handleAddressChange}/></td>
                </tr>
                <tr>
                    <td><label>Zip Code:</label></td>
                    <td><input name="zipCode" value={customer.address.zipCode} onChange={handleAddressChange}/></td>
                </tr>
                </tbody>
            </table>
            <button type="submit">Add Customer</button>
            <button type="button" onClick={resetForm}>Reset</button>
        </form>
    );
};
export default AddCustomer;
