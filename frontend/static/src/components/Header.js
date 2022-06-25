import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { handleError } from '../helpers';
import './../styles/header.css';

const Header = ({appState, setAppState}) => {

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

    const homeLink = <Link key={0} to={''} >Home</Link>;
    const myArticlesLink = <Link key={1} to={'my-articles'} >My Articles</Link>;
    const reviewsLink = <Link key={2} to={'review'} >Review</Link>;
    const logInLink = <Link key={3} to={'login'}>Log In</Link>;
    const logOutButton = <button className="logout looks-like-link" key={4} type="button" onClick={logOut}>Log Out</button>;

    const setHeaderOptions = () => {
        if (appState.superUser) {
            return [homeLink, myArticlesLink, reviewsLink, logOutButton];
        }
        else if (appState.auth) {
            return [homeLink, myArticlesLink, logOutButton];
        }
        else {
            return logInLink;
        }
    }

    const headers = setHeaderOptions();

    return (
        <nav className="header">
            <Link to={'/'}>
                <h1>Food News</h1>
            </Link>
            {headers}
        </nav>
    )
}

export default Header;