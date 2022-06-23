import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetail = () => {
    
    const { id } = useParams();

    useEffect(() => {
        const getDetails = async (id) => {
            // const response = await fetch(`/api_v1/ar`)
        }
    })

    return (
        <div>ArticleDetail</div>
    )
}

export default ArticleDetail;