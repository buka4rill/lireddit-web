// 'rh' for react-typescript snippet
import React from 'react';
import { Form, Formik } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ username: "", password: "" }} 
                onSubmit={(values) => console.log(values)}
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