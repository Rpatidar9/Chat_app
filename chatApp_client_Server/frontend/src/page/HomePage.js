import React from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Login from "../components/Authentication/Login.js";
import Signup from "../components/Authentication/Signup.js";
const HomePage = () => {
    return <Container maxW='xl' centerContent>
        <Box d='flex'
            justifyContent='center'
            p={3}
            bg={'white'}
            w='100%'
            m='40px 0 15px 0'
            borderRadius='lg'
            borderWidth='1px'
        >
            <text fontSize='4xl' fontFamily='work sans' color='black'>Talk - A - Live</text>
        </Box>
        <Box
            bg={'white'}
            w='100%'
            m='40px 0 15px 0'
            borderRadius='lg'
            borderWidth='1px'
        ><Tabs variant='soft-rounded' >
                <TabList mb='1em'>
                    <Tab width='50%'>Login</Tab>
                    <Tab width='50%'>Sign up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Signup />
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>
    </Container>
}

export default HomePage
