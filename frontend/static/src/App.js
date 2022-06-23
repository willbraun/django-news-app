import { useState } from 'react';
import ReactRouter from './components/ReactRouter';
import Header from './components/Header';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Home from './components/Home';
import MyArticles from './components/MyArticles';
import Review from './components/Review';
import './App.css';

function App() {
	const defaultState = {
		auth: false,
		superUser: false,
	}

	const [state, setState] = useState(defaultState);
	
	return (
		<ReactRouter appState={state} setAppState={setState}/>
	);
}

export default App;
