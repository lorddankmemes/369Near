import { createContext, useContext, useEffect, useState } from "react";

const ValidateContext = createContext()

export const ValidateProvider = ({ children }) => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
      if (!isValid) {
        setErrorMessage('Please enter a value');
      } else {
        setErrorMessage('');
      }
    }, [isValid]);
  
    const handleChange = event => {
      const inputValue = event.target.value;
      const isValid = validateInput(inputValue);
      setInputValue(inputValue);
      setIsValid(isValid);
    };
  
    const validateInput = inputValue => {
      // Add your validation logic here, for example:
      return inputValue.length > 0;
    };
  
    const value = { inputValue, isValid, errorMessage, handleChange };
    
    return <ValidateContext.Provider value={value}>{children}</ValidateContext.Provider>
}

export const useValidate = () => {
    return useContext(ValidateContext)
}
