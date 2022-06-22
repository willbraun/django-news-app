import { useState } from 'react';
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
		page: 'home',
	}

	const [state, setState] = useState(defaultState);

	const pages = {
		login: <Login appState={state} setAppState={setState}/>,
		createAccount: <CreateAccount appState={state} setAppState={setState}/>,
		home: <Home appState={state} setAppState={setState}/>,
		myArticles: <MyArticles appState={state} setAppState={setState}/>,
		review: <Review appState={state} setAppState={setState}/>,
	}
	
	return (
		<>
		{pages[state.page]}
		</>
	);
}

export default App;
