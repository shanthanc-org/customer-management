import React, {ChangeEvent, useContext, useState} from "react";
import {deleteCustomer, ACCOUNT_KEY_PATTERN, ErrorResponse} from "../api";
import MessageContext from "../context/MessageContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const DeleteCustomer: React.FC = () => {

    const [accountKey, setAccountKey] = useState('');
    const navigate = useNavigate();

    const {successMessage, setSuccessMessage, errorMessage, setErrorMessage} = useContext(MessageContext);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccountKey(e.target.value);
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
            const response = await deleteCustomer(accountKey);
            if (response.data) {
                setSuccessMessage(response.data.message);
                setErrorMessage('');
            } else {
                setErrorMessage('Customer with account key ' + accountKey + 'could not be deleted ');
                setSuccessMessage('');
                setAccountKey('');
                return;
            }
            navigate('/');

        } catch (error) {
            setAccountKey('');
            if (axios.isAxiosError(error) && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                const httpStatus = error.response.status;

                if (httpStatus === 500) {
                    console.error('Server error:', errorResponse.errorMessage);
                    setErrorMessage('Server error. Please try again later.');
                } else {
                    setErrorMessage(`Failed to delete customer: ${errorResponse.errorMessage}`);
                }
                setSuccessMessage('');
            } else {
                console.error('Unknown error:', error);
                setErrorMessage('An unknown error occurred. Please try again later.');
                setSuccessMessage('');
            }
        }
    };

    const handleReset = () => {
        setAccountKey('');
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
                <button type="submit">Delete Customer</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>
        </div>
    );
};

export default DeleteCustomer;
