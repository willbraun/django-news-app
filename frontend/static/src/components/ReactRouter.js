import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Header from './Header';
import CreateAccount from './CreateAccount';
import MyArticles from './MyArticles';
import CreateArticle from './CreateArticle';
import Review from './Review';
import ArticleDetail from './ArticleDetail';
import EditArticle from './EditArticle';


const ReactRouter = ({appState, setAppState}) => {

    return (
        <BrowserRouter>
            <Header key={0} appState={appState} setAppState={setAppState}/>
            <Routes key={1}>
                <Route path='/'>
                    <Route index element={<Home />}/>
                    <Route path='login' element={<Login appState={appState} setAppState={setAppState}/>}/>
                    <Route path='create-account' element={<CreateAccount appState={appState} setAppState={setAppState}/>}/>
                    <Route path='article/:id/*' element={<ArticleDetail {...appState}/>}/>
                    <Route path='my-articles'>
                        <Route index element={<MyArticles appState={appState}/>}/>
                        <Route path='create' element={<CreateArticle appState={appState}/>}/>
                    </Route>
                    <Route path='review' element={<Review />}/>
                    <Route
                        path='*'
                        element={
                            <main style={{ padding: "1rem" }}>
                            <p>Page not found</p>
                            </main>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default ReactRouter;

