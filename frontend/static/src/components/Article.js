import { Link } from "react-router-dom";
import './../styles/article.css'

const Article = ({id, title, author_username, phase, image}) => {
    
    return (
        <Link to={`/article/${id}`}>
            <article className="article">
                <p>{title}</p>
                <p>By: {author_username}</p>
                <p>Phase: {phase}</p> 
                <img src={image} alt={title} />
            </article>
        </Link>
    )
}

export default Article;