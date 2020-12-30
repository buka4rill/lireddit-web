// 'rh' for react-typescript snippet
import React from 'react';
import { Form, Formik } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';

interface registerProps {

}

// REGISTER GQL MUTATION
const REGISTER_MUT = `mutation Register($username: String!, $password: String!) {
    register(input: { username: $username, password: $password }) {
      errors {
        field
        message
      }
      
      user {
        id
        createdAt
        updatedAt
        username
      }
    }
  }
  `;

const Register: React.FC<registerProps> = ({}) => {

    // URQL Hook
    const [, register] = useMutation(REGISTER_MUT);

    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ username: "", password: "" }} 
                onSubmit={(values) => {
                    console.log(values);
                    return register(values);
                }}
            >
                {({ isSubmitting }) => (
                    // <Form>
                    //     <FormControl>
                    //         <FormLabel htmlFor="username">Username</FormLabel>
                    //         <Input value={values.username} onChange={handleChange} id="username" placeholder="username" />
                    //         {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                    //     </FormControl>
                    // </Form>

                    <Form>
                        <InputField 
                            name= "username"
                            placeholder="Your username please"
                            label="Username"
                        />
                        
                        <Box mt={4}>
                            <InputField 
                                name= "password"
                                placeholder="Your password please"
                                label="Password"
                                type="password"
                            />
                        </Box>

                        <Button 
                            mt={4} 
                            type="submit" 
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        > 
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        
    );
}

export default Register;