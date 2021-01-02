// 'rh' for react-typescript snippet
import React from 'react';
import { Form, Formik } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
// import { useMutation } from 'urql';
import { FieldError, useRegisterMutation } from '../generated/graphql'; // generate graphql queries & hooks
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from "next/router";

interface registerProps {

}

/**
 * Graph QL Code generator to generate graphql queries and hooks
 * yarn add -D @\graphql-codegen/cl
 * yarn graphql-codegen init
 */

// REGISTER GQL MUTATION- Consuming GQL Query in Register UI
// const REGISTER_MUT = `mutation Register($username: String!, $password: String!) {
//     register(input: { username: $username, password: $password }) {
//       errors {
//         field
//         message
//       }
      
//       user {
//         id
//         createdAt
//         updatedAt
//         username
//       }
//     }
//   }
//   `;

const Register: React.FC<registerProps> = ({}) => {

    // URQL Hook
    // const [, register] = useMutation(REGISTER_MUT);
    const [, register] = useRegisterMutation();

    // NextJS router
    const router = useRouter();

    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ username: "", password: "" }} 
                onSubmit={async (values, {setErrors}) => {
                    console.log(values);

                    // Response from GraphQl query
                    const response = await register(values);
                    
                    // If error
                    if (response.data?.register.errors) {
                        // console.log(setErrors)
                        // ? - return undefined if no data
                        // Using Formik Props - setErrors
                        // setErrors({
                        //     username: "Invalid Username",
                        //     password: "Invalid password"
                        // });
                        setErrors(toErrorMap(response.data.register.errors)); // ? not needed, Typescript inferred
                    } else if (response.data?.register.user) {
                        // works - route to a different page
                        router.push("/"); // back to homepage
                    }
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