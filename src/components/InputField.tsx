import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react'

// Props
type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & { 
    name: string; 
    label: string;
    // placeholder: string;
}

// ERROR
// '' => false
// 'the error message' => true

export const InputField: React.FC<InputFieldProps> = ({ size, ...props}) => {
    // Hook from Formik
    const [field, { error }] = useField(props);
    console.log({ error });
    
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input 
                {...field} 
                {...props} 
                id={field.name} 
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}

/**
     * !! converts string to boolean
 */