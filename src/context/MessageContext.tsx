import React, { createContext, useState, ReactNode } from 'react';

interface MessageContextType {
    successMessage: string;
    setSuccessMessage: (message: string) => void;
    errorMessage: string;
    setErrorMessage: (message: string) => void;
}

const MessageContext= createContext<MessageContextType>({
    successMessage: '',
    setSuccessMessage: () => {},
    errorMessage: '',
    setErrorMessage: () => {},
});

export const MessageProvider : React.FC <{children: React.ReactNode}> = ({children}) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
      <MessageContext.Provider
          value={{successMessage, setSuccessMessage,errorMessage, setErrorMessage}}>
          {children}
      </MessageContext.Provider>
    );
};
export default MessageContext;