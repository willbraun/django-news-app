import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { handleError } from '../helpers';
import ArticleInput from './ArticleInput'

const CreateArticle = ({appState}) => {
    const blank = {
        title: '',
        body: '',
        image: null,
        category: '',
    }

    const [state, setState] = useState(blank);

    const navigate = useNavigate();

    const postArticle = async (phase) => {
        const formData = new FormData();
        Object.entries(state).forEach(entry => formData.append(entry[0], entry[1]));
        formData.append('phase', phase);
        
        const options = {
            method: 'POST',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: formData,
        }

        const response = await fetch('/api_v1/articles/mine/', options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network request not ok!');
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const phase = e.nativeEvent.submitter.value;
        await postArticle(phase);
        navigate('/my-articles');
    }

    return (
        <main>
            <form className="create-article-form" onSubmit={handleFormSubmit}>
                <section className="subheader-row">
                    <div className="subheader-row-content create">
                        <h2>Create Article</h2>
                        <button type="button" onClick={() => navigate('/my-articles')}>Discard Draft</button>
                        <button type="submit" value="DR">Save Draft</button>
                        {appState.superUser ? 
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

export default CreateArticle;