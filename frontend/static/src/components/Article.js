import { Link } from "react-router-dom";

const Article = ({id, title, author_username, phase, image}) => {
    
    return (
        <Link to={`/article/${id}`}>
            <article>
                <p>{title}</p>
                <p>By: {author_username}</p>
                <p>Phase: {phase}</p> 
                {/* keep phase temporary here until I group by it on each page */}
                <img src={image} alt={title} />
            </article>
        </Link>
    )
}

export default Article;