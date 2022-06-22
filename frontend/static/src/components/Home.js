import { useState, useEffect } from 'react';
import { handleError } from './../helpers';
import Article from './Article';

const Home = ({appState, setAppState}) => {
    const [state, setState] = useState({
        articles: [],
    })

    useEffect(() => {
        const getPubArticles = async () => {
            const response = await fetch(`/api_v1/articles/`).catch(handleError);
            
            if (!response.ok) {
                throw new Error('Network response was not ok!');
            }
    
            const data = await response.json();
            setState({...state, articles: data})
        }

        getPubArticles();
    }, [])

    const articleList = state.articles.map(article => <Article key={article.id} {...article}/>)

    return (
        <main>
            <div>Home</div>
            {articleList}
        </main>
    )
}

export default Home;