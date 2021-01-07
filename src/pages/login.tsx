// 'rh' for react-typescript snippet
import React from 'react';
import { Form, Formik } from "formik";
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
// import { useMutation } from 'urql';
import { useLoginMutation } from '../generated/graphql'; // generate graphql queries & hooks
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";

// interface loginProps {

// }

/**
 * Login Page Notes
 * 
 * 
 */


const Login: React.FC<{}> = ({}) => {
    // URQL Hook
    const [, login] = useLoginMutation();

    // NextJS router
    const router = useRouter();

    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ username: "", password: "" }} 
                onSubmit={async (values, {setErrors}) => {
                    // console.log(values);

                    // Response from GraphQl query
                    const response = await login({ input: values });
                    
                    // If error
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors)); // ? not needed, Typescript inferred
                    } else if (response.data?.login.user) {
                        // works - route to a different page
                        router.push("/"); // back to homepage
                    }
                }}
            >
                {({ isSubmitting }) => (                 
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
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
        
    );
}

export default Login;