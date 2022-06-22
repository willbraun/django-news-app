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
		login: <Login key={1} appState={state} setAppState={setState}/>,
		createAccount: <CreateAccount key={1} appState={state} setAppState={setState}/>,
		home: <Home key={1} appState={state} setAppState={setState}/>,
		myArticles: <MyArticles key={1} appState={state} setAppState={setState}/>,
		review: <Review key={1} appState={state} setAppState={setState}/>,
	}
	
	return (
		<>
		{['home','myArticles','review'].includes(state.page) ? <Header key={0} appState={state} setAppState={setState}/> : undefined}
		{pages[state.page]}
		</>
	);
}

export default App;
