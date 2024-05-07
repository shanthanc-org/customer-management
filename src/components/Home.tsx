import React, {useContext} from 'react';
import MessageContext from '../context/MessageContext';

const Home: React.FC = () => {
    const {successMessage, setSuccessMessage, errorMessage, setErrorMessage} = useContext(MessageContext);
    return (
        <div>
            {/* Success Message */}
            {successMessage && (
                <div style={{backgroundColor: 'green', color: 'white', padding: '10px', marginBottom: '20px'}}>
                    <span>{successMessage}</span>
                    <button
                        onClick={() => setSuccessMessage('')}
                        style={{
                            float: 'right',
                            backgroundColor: 'red',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                        Close
                    </button>
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div style={{backgroundColor: 'red', color: 'white', padding: '10px', marginBottom: '20px'}}>
                    <span>{errorMessage}</span>
                    <button
                        onClick={() => setErrorMessage('')}
                        style={{
                            float: 'right',
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                        Close
                    </button>
                </div>
            )}
            <h1>Welcome to Customer Administration</h1>
        </div>
    );
};
export default Home;