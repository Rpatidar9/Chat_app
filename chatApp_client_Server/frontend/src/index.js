import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom"
import ChatProvider from './Context/ChatProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChatProvider>
    <BrowserRouter>
      <ChakraProvider>
        <App />
        <Button colorScheme='blue'>Button</Button>
      </ChakraProvider>
    </BrowserRouter>
  </ChatProvider>
);

