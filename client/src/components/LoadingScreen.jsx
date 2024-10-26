import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
    background-color: #f4f4f4;
`;

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 5px solid #ccc;
    border-top: 5px solid #333;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
`;

const LoadingScreen = () => (
    <Container>
        <Spinner />
        <p>Procesando...</p>
    </Container>
);

export default LoadingScreen;
