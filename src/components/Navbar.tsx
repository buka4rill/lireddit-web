import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavbarProps {
 
}

export const Navbar: React.FC<NavbarProps> = ({}) => {

    // Logout hook
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

    // UseMeQuery Hook
    const [{ data, fetching }] = useMeQuery();

    let body = null;

    // data is loading
    if (fetching) {
        body = null
        // user not logged in
    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link color="white" mr={2}> login </Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color="white"> register </Link>
                </NextLink> 
            </>
        );
        // user is logged in
    } else {
        // Display user's username
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button 
                onClick={() => logout()} 
                isLoading={logoutFetching} // ***
                variant="link">logout</Button>
            </Flex>
            
        );
    }


    return (
        <Flex bg="tomato" p={4}>
            <Box  ml={"auto "}>
                {body}
            </Box> 
        </Flex>
        
    );
}
