import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import CreateAccount from './CreateAccount';
import MyArticles from './MyArticles';
import CreateArticle from './CreateArticle';
import Review from './Review';


const ReactRouter = ({appState, setAppState}) => {


    return (
        <BrowserRouter>
            <Header key={0} appState={appState} setAppState={setAppState}/>
            <Routes key={1}>
                <Route path='/' element={<Home />}/>
                <Route path='/login' element={<Login appState={appState} setAppState={setAppState}/>}/>
                <Route path='/create-account' element={<CreateAccount appState={appState} setAppState={setAppState}/>}/>
                <Route path='/my-articles' element={<MyArticles />}/>
                <Route path='/my-articles/create' element={<CreateArticle />}/>
                    {/* <Route path=':id' element={<ArticleDetail />}/> */}
                {/* </Route> */}
                <Route path='/review' element={<Review />}>
                    {/* <Route path=':id' element={<ArticleDetail />}/> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter;

