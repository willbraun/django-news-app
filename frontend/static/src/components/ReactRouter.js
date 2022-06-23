import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import CreateAccount from './CreateAccount';
import MyArticles from './MyArticles';
import Review from './Review';


const ReactRouter = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/create-account' element={<CreateAccount />}/>
                <Route path='/my-articles' element={<MyArticles />}>
                    {/* <Route path='/create' element={<CreateArticle />}/> */}
                    {/* <Route path=':id' element={<ArticleDetail />}/> */}
                </Route>
                <Route path='/review' element={<Review />}>
                    {/* <Route path=':id' element={<ArticleDetail />}/> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter;

