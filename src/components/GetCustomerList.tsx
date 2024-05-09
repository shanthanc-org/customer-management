import React, {useContext, useState} from "react";
import {Customer, ErrorResponse, getCustomerList} from "../api";
import '../App.css'
import MessageContext from '../context/MessageContext';
import axios from "axios";

const GetCustomerList: React.FC = () => {
    const [searchType, setSearchType] =
        useState<'firstName' | 'lastName'>('firstName');
    const [searchValue, setSearchValue] = useState('');
    const [customers, setCustomers] = useState<Customer[]>([]);
    const {successMessage, setSuccessMessage, errorMessage, setErrorMessage} =
        useContext(MessageContext);


    const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchType(e.target.value as 'firstName' | 'lastName');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };


    const handleFetchCustomerList = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        if(!NAME_PATTERN.test(searchValue)) {
            setErrorMessage('Invalid value entered for search value. Please correct and try again');
            setSuccessMessage('');
            return;
        }
        try {
            // Replace with the actual endpoint for fetching customer lists by first or last name
            const response = await getCustomerList(searchType, searchValue);
            console.log(response);
            setCustomers(response.data);
        } catch (error) {
            setSearchValue('');
            if (axios.isAxiosError(error) && error.response) {
                setSearchValue('');
                const errorResponse = error.response.data as ErrorResponse;
                const httpStatus = error.response.status;

                if (httpStatus === 500) {
                    console.error('Server error:', errorResponse.errorMessage);
                    setErrorMessage('Server error. Please try again later.');
                } else {
                    setErrorMessage(`Failed to get customer list: ${errorResponse.errorMessage}`);
                }
                setSuccessMessage('');
            } else {
                console.error('Unknown error:', error);
                setErrorMessage('An unknown error occurred. Please try again later.');
                setSuccessMessage('');
            }
        }

    };

    const resetSearch = () => {
        setSearchType('firstName'); // Assuming there's a state like this
        setSearchValue('');
        setCustomers([]); // Assuming you store fetched customer data in this state
        setErrorMessage('');
        setSuccessMessage('');
    };


    return (
        <div>
            <div>
                {errorMessage && <div className="Error-message"><span>{errorMessage}</span>
                    <button
                        onClick={() => setErrorMessage('')}
                        className='Close-Button'>
                        Close
                    </button>
                </div>}
            </div>
            <form onSubmit={handleFetchCustomerList}>
                <label htmlFor="searchType">Search By:</label>
                <select id="searchType" value={searchType} onChange={handleSearchTypeChange}>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                </select>

                <input
                    id="searchValue"
                    name="searchValue"
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Get Customer List</button>
                <button type="button" onClick={resetSearch}>Reset Search</button>
            </form>


            {!errorMessage && customers.length > 0 && (
                <table className="CustomerTable">
                    <thead>
                    <tr>
                        <th>Account Key</th>
                        <th>Account Number</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>SSN</th>
                        <th>Phone Number</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.accountKey}</td>
                            <td>{customer.accountNumber}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.dateOfBirth}</td>
                            <td>{customer.ssn}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.address.street}</td>
                            <td>{customer.address.city}</td>
                            <td>{customer.address.state}</td>
                            <td>{customer.address.zipCode}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};


export default GetCustomerList;