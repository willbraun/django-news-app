import Cookies from 'js-cookie';
import { handleError } from './../helpers';

const Home = ({appState, setAppState}) => {
    
    const logOut = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
        }

        const response = await fetch("/dj-rest-auth/logout/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        Cookies.remove("Authorization");
        setAppState({...appState, auth: false, superUser: false, page: 'home'});
    }

    const logInButton = <button type="button" onClick={() => setAppState({...appState, page: 'login'})}>Log In</button>;
    const logOutButton = <button type="button" onClick={logOut}>Log Out</button>;

    return (
        <>
            <div>Home</div>
            {appState.auth ? logOutButton : logInButton}
        </>
    )
}

export default Home;