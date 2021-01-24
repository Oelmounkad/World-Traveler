import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ChakraProvider} from "@chakra-ui/react"
import customTheme from './utils/theme'

ReactDOM.render(
  <ChakraProvider theme={customTheme}>
    <App />
    </ChakraProvider>
,
  document.getElementById('root')
);

