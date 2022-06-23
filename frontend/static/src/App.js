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
		page: 'home', // Remove this and pages object when all routing works
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
			<ReactRouter appState={state} setAppState={setState}/>


		{/* {['home','myArticles','review'].includes(state.page) ?  */}
		
		 {/* : undefined}
		{pages[state.page]} */}
		</>
	);
}

export default App;
