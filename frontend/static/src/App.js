import { useState } from 'react';
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
		{['home','myArticles','review'].includes(state.page) ? <Header key={1} appState={state} setAppState={setState}/> : undefined}
		{pages[state.page]}
		</>
	);
}

export default App;
