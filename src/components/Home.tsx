import React, {useContext} from 'react';
import MessageContext from '../context/MessageContext';
import '../App.css';

const Home: React.FC = () => {
    const {successMessage, setSuccessMessage, errorMessage, setErrorMessage} = useContext(MessageContext);
    return (
        <div>
            {/* Success Message */}
            {successMessage && (
                <div className= 'Success-message'>
                    <span>{successMessage}</span>
                    <button
                        onClick={() => setSuccessMessage('')}
                       className='Close-Button'>
                        Close
                    </button>
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div className="Error-Message">
                    <span>{errorMessage}</span>
                    <button
                        onClick={() => setErrorMessage('')}
                        className='Close-Button'>
                        Close
                    </button>
                </div>
            )}
            <h1>Welcome to Customer Administration</h1>
        </div>
    );
};
export default Home;