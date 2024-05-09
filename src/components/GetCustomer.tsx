import React, {ChangeEvent, useContext, useState} from "react";
import {getCustomer, Customer, ACCOUNT_KEY_PATTERN, ErrorResponse} from "../api";
import MessageContext from "../context/MessageContext";
import axios from "axios";

const GetCustomer: React.FC = () => {

    const [accountKey, setAccountKey] = useState('');
    const [customer, setCustomer] = useState<Customer | null>(null);

    const {successMessage, setSuccessMessage, errorMessage, setErrorMessage} = useContext(MessageContext);
    setSuccessMessage('');
    setErrorMessage('');
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccountKey(e.target.value);
    };

    const handleReset = () => {
        setCustomer(null);
        setAccountKey('');
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission

        // Validate account key before making the API call
        if (!ACCOUNT_KEY_PATTERN.test(accountKey)) {
            setErrorMessage('Invalid Account Key. Must start with a digit between 1-5 and contain a total of nine numeric characters.');
            setSuccessMessage('');
            setAccountKey('');
            return;
        }

        try {
            const response = await getCustomer(accountKey);
            if (response.data) {
                setCustomer(response.data); // Update the state with the fetched customer data
                setSuccessMessage('');
                setErrorMessage('');
            } else {
                setErrorMessage('Customer with account key ' + accountKey + 'does not exist ');
                setSuccessMessage('');
                setAccountKey('');
                return;
            }
        } catch (error) {
            setAccountKey('');
            if (axios.isAxiosError(error) && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const httpStatus = error.response.status;

                if (httpStatus === 500) {
                    console.error('Server error:', errorResponse.errorMessage);
                    setErrorMessage('Server error. Please try again later.');
                } else {
                    setErrorMessage(`Failed to get customer: ${errorResponse.errorMessage}`);
                }
                setSuccessMessage('');
            } else {
                console.error('Unknown error:', error);
                setErrorMessage('An unknown error occurred. Please try again later.');
                setSuccessMessage('');
            }
        }
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="account-key">Account Key:</label>
                <input
                    id="accountKey"
                    name="accountKey"
                    type="text"
                    value={accountKey}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Get Customer</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>
            <div>
                {customer && !errorMessage && (
                    <table className="CustomerTable">
                        <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Account Key</td>
                            <td>{customer.accountKey}</td>
                        </tr>
                        <tr>
                            <td>Account Number</td>
                            <td>{customer.accountNumber}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{customer.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{customer.lastName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{customer.email}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth</td>
                            <td>{customer.dateOfBirth}</td>
                        </tr>
                        <tr>
                            <td>SSN</td>
                            <td>{customer.ssn}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{customer.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td>Street</td>
                            <td>{customer.address.street}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{customer.address.city}</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>{customer.address.state}</td>
                        </tr>
                        <tr>
                            <td>Zip Code</td>
                            <td>{customer.address.zipCode}</td>
                        </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default GetCustomer;
