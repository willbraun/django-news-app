import { useState, useEffect } from 'react';
import { handleError } from './../helpers';
import Article from './Article';

const Home = () => {
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
            setState({...state, articles: data});
        }

        getPubArticles();
    }, [])

    const getPubCatArticles = async (category) => {
        const response = await fetch(`/api_v1/articles/${category}`).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const data = await response.json();
        setState({...state, articles: data});
    }

    const articleList = state.articles.map(article => <Article key={article.id} {...article}/>)

    return (
        <main>
            <h2>Home</h2>
            <div>
                <button type="button" onClick={() => getPubCatArticles('RC')}>Recipes</button>
                <button type="button" onClick={() => getPubCatArticles('RS')}>Restaurants</button>
                <button type="button" onClick={() => getPubCatArticles('FS')}>Food Science</button>
                <button type="button" onClick={() => getPubCatArticles('DB')}>Debate</button>
                <button type="button" onClick={() => getPubCatArticles('ST')}>Stories</button>
                <button type="button" onClick={() => getPubCatArticles('')}>All</button>
            </div>
            {articleList}
        </main>
    )
}

export default Home;