import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext'; 
import MainPage from './pages/MainPage';
import './styles/index.css'; 

/**
 * Main App component
 * Sets up routing and context providers
 */
export default function App() {
    return (
        <div>
            <h1>Hello, World!</h1>
            <p>调试信息：App 已加载</p>
        </div>
    );
}
