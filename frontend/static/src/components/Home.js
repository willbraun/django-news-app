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
            setState({...state, articles: data})
        }

        getPubArticles();
    }, [])

    const articleList = state.articles.map(article => <Article key={article.id} {...article}/>)

    return (
        <main>
            <h2>Home</h2>
            <div>
                <button type="button">Recipes</button>
                <button type="button">Restaurants</button>
                <button type="button">Food Science</button>
                <button type="button">Debate</button>
                <button type="button">Stories</button>
            </div>
            {articleList}
        </main>
    )
}

export default Home;