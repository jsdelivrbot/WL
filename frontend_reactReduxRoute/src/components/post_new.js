import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
            .then(() => {

                this.context.router.push('/');
            })
    }

    render() {

        const { fields: { title, releaseYear, format, stars }, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Film Post</h3>
                <div className={`form-group ${title.touched && title.invalid ? "has-danger" : ''}`}>
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" {...title} />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className={`form-group ${releaseYear.touched && releaseYear.invalid ? "has-danger" : ''}`}>
                    <label htmlFor="releaseYear">Release Year</label>
                    <input type="text" className="form-control" id="releaseYear" {...releaseYear} />
                    <div className="text-help">
                        {releaseYear.touched ? releaseYear.error : ''}
                    </div>
                </div>
                <div className={`form-group ${format.touched && format.invalid ? "has-danger" : ''}`}>
                    <label htmlFor="format">Format</label>
                    <input type="text" className="form-control" id="format" {...format} />
                    <div className="text-help">
                        {format.touched ? format.error : ''}
                    </div>
                </div>
                <div className={`form-group ${stars.touched && stars.invalid ? "has-danger" : ''}`}>
                    <label htmlFor="stars">Stars</label>
                    <textarea className="form-control" id="stars" cols="30" rows="5" {...stars} />
                    <div className="text-help">
                        {stars.touched ? stars.error : ''}
                    </div>
                </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/" className="btn btn-danger">Cancel</Link>

            </form>
        );
    }
}

function validate(values) {
    const errors = {},
        year = parseInt(values.releaseYear),
        currentYear = (new Date).getFullYear();

    if (!values.title || !values.title.trim()) {
        errors.title = 'Enter a title of film';
    }

    if (!year || year < 1895 || year > currentYear) {

        errors.releaseYear = 'Enter Release Year 1895-2017';
    }
    if (!values.format || !values.format.trim()) {
        errors.format = 'Enter format of film';
    }
    if (!values.stars || !values.stars.trim()) {
        errors.stars = 'Enter format of film';
    }

    return errors;
}

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'releaseYear', 'format', 'stars'],
    validate

}, null, { createPost })(PostsNew);
