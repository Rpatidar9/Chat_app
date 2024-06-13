import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Login = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [confirmpassword, setConfirmpassword] = useState()
    const [password, setPassword] = useState()
    const [pic, setPic] = useState()
    const handleClick = () => setShow(!show)
    const postDetails = (pics) => { };
    const submitHandler = () => { };

    return (
        <VStack spacing='5px'>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}></Input>
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Your Password'
                        onChange={(e) => setConfirmpassword(e.target.value)}></Input>
                    <InputRightElement width={'4.5rem'}>
                        <Button h='1.75rem' size={'sm'} onClick={handleClick}>
                            {show ? 'Hide' : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button colorScheme='blue'
                width="100%"
                color='white'
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >login</Button>
            <Button
                variant='solid'
                colorScheme='red'
                width='100%'
                onClick={() => {
                    setEmail('guest@example.com')
                    setPassword('123456')
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login
