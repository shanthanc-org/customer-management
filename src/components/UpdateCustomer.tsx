import React, {ChangeEvent, useContext, useState} from "react";
import {ErrorResponse, UpdateAddress, updateCustomerAddress, US_STATES, ACCOUNT_KEY_PATTERN} from "../api";
import MessageContext from '../context/MessageContext';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const UpdateCustomerAddress : React.FC = () => {

    const [updateAddress, setUpdateAddress] = useState<UpdateAddress>({
        accountKey:'',
        address: {
            street: '',
            city: '',
            state: 'IL',
            zipCode: '',
        },
    });

    const {setSuccessMessage, setErrorMessage} = useContext(MessageContext);

    //use navigate to programmatically navigate
    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>)  => {
        const {name, value} = e.target;
        if (name === 'accountKey') {
            setUpdateAddress({...updateAddress, [name]: value});
        } else {
            setUpdateAddress({...updateAddress,
            address: {...updateAddress.address, [name]: value}});
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("handling submit - just entered");
        e.preventDefault();
        console.log("handling submit");
        if(!ACCOUNT_KEY_PATTERN.test(updateAddress.accountKey)) {
            setErrorMessage("Invalid Account Key. Must be numeric with starting digit 1-5 and rest eight digits [0-9]");
            setSuccessMessage('');
            return;
        }

        try {
            const response = await updateCustomerAddress(updateAddress);
            console.log(response);
            const {accountKey, message} = response.data;
            if (accountKey === updateAddress.accountKey) {
                setSuccessMessage(message);
                setErrorMessage('');
            } else {
                console.log(response);
                setErrorMessage('Unexpected error occurred. Please try again.');
                setSuccessMessage('');
            }
            navigate('/');
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                const errorResponse = error.response.data as ErrorResponse;
                let httpStatus = error.response.status;
                if (httpStatus === 500 ) {
                    console.error('Failed to update customer due to server error.', errorResponse.errorMessage)
                    setErrorMessage('Server error. Our technical team is working on it. Thank you for your patience');
                    setSuccessMessage('');
                }
                setErrorMessage(`Failed to update customer due to -> ${errorResponse.errorMessage}`);
                setSuccessMessage('');

            } else {
                console.error('Failed to update customer due to unknown error.', error)
                setErrorMessage('Unknown error occurred. Please try again after sometime');
                setSuccessMessage('');
            }
            navigate('/');
        }
    }

    const resetForm = () => {
        setUpdateAddress({
            accountKey: '',
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
            <table>
                <tbody>
                <tr>
                    <td><label>Account Key</label></td>
                    <td>
                        <input
                            type="text"
                            name="accountKey"
                            value={updateAddress.accountKey}
                            onChange={handleInputChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td><label>Street</label></td>
                    <td>
                        <input
                            type="text"
                            name="street"
                            value={updateAddress.address.street}
                            onChange={handleInputChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td><label>City</label></td>
                    <td>
                        <input
                            type="text"
                            name="city"
                            value={updateAddress.address.city}
                            onChange={handleInputChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td><label>State</label></td>
                    <td>
                        <select
                            name="state"
                            value={updateAddress.address.state}
                            onChange={handleInputChange}
                            required
                        >
                            {US_STATES.map(state => (
                                <option key={state.code} value={state.code}>{state.name}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label>Zip Code</label></td>
                    <td>
                        <input
                            type="text"
                            name="zipCode"
                            value={updateAddress.address.zipCode}
                            onChange={handleInputChange}
                            required
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <button type="submit">Update Customer Address</button>
            <button type="button" onClick={resetForm}>Reset</button>
        </form>
    );
};

export default UpdateCustomerAddress;

