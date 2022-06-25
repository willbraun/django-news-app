import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ArticleInput from './ArticleInput';
import { handleError } from '../helpers';

const EditArticle = ({superUser, detailState, setDetailState}) => {
    const [state, setState] = useState({
        title: detailState.title,
        body: detailState.body,
        category: detailState.category,
        image: detailState.image,
    });

    const navigate = useNavigate();

    const patchArticle = async (phase) => {
        const formData = new FormData();
        Object.entries(state).forEach(entry => {
            if (entry[1] !== detailState[entry[0]] ) {
                formData.append(entry[0], entry[1]);
            }
        });
        formData.append('phase', phase);

        const options = {
            method: 'PATCH',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch(`/api_v1/articles/${detailState.id}/`, options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }

        const data = await response.json();
        setDetailState(data);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const phase = e.nativeEvent.submitter.value;
        await patchArticle(phase);
        navigate(`/article/${detailState.id}`);
    }
    
    return (
        <main>
            <form className="create-article-form" onSubmit={handleFormSubmit}>
                <section className="subheader-row">
                    <div className="subheader-row-content edit">
                        <h2>Edit Article</h2>
                        <button type="button" onClick={() => navigate(`/article/${detailState.id}`)}>Discard Edits</button>
                        <button type="submit" value="DR">Save Draft</button>
                        {superUser ? 
                            <button type="submit" value="PU">Save and Publish</button> : 
                            <button type="submit" value="SU">Save and Submit</button>
                        }
                    </div>
                </section>
                <ArticleInput parentState={state} setParentState={setState}/>
            </form>
        </main>
    )
}

export default EditArticle;