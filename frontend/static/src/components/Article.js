const Article = ({title, author_username, image}) => {
    
    return (
        <article>
            <p>{title}</p>
            <p>By: {author_username}</p>
            <img src={image} alt={title} />
        </article>
    )
}

export default Article;