import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { fetchPost, editPost } from '../actions/index';
import { Link } from 'react-router';

class PostsEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titleValue: '',
            releaseYearValue: '',
            formatValue: '',
            starsValue: ''
        }
    }

    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.editPost(this.state._id, this.state)
            .then(() => {
                this.context.router.push('/');
            })
    }

    componentWillMount() {

        this.props.fetchPost(this.props.params['id'])
            .then(() => {

                const { _id, Title:titleValue, 'Release Year':releaseYearValue, Format:formatValue, Stars:starsValue} = this.props.post;

                this.setState({
                    _id:_id,
                    titleValue: titleValue,
                    releaseYearValue: releaseYearValue,
                    formatValue: formatValue,
                    starsValue: starsValue
                });
            });


    }

    render() {

        const { fields: { title, releaseYear, format, stars }, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Edit Film Post</h3>
                <div className={`form-group ${title.touched && title.invalid ? "has-danger" : ''}`}>
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" {...title} value={this.state.titleValue}
                           onChange={(e) => this.setState({titleValue: e.target.value})}/>
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className={`form-group ${releaseYear.touched && releaseYear.invalid ? "has-danger" : ''}`}>
                    <label htmlFor="releaseYear">Release Year</label>
                    <input type="text" className="form-control" id="releaseYear" {...releaseYear}
                           onChange={(e) => this.setState({releaseYearValue: e.target.value})}
                           value={this.state.releaseYearValue} />
                    <div className="text-help">
                        {releaseYear.touched ? releaseYear.error : ''}
                    </div>
                </div>
                <div className={`form-group ${format.touched && format.invalid ? "has-danger" : ''}`}>
                    <label htmlFor="format">Format</label>
                    <input type="text" className="form-control" id="format" {...format}
                           onChange={(e) => this.setState({formatValue: e.target.value})}
                           value={this.state.formatValue} />
                    <div className="text-help">
                        {format.touched ? format.error : ''}
                    </div>
                </div>
                <div className={`form-group ${stars.touched && stars.invalid ? "has-danger" : ''}`}>
                    <label htmlFor="stars">Stars</label>
                    <textarea className="form-control" id="stars" cols="30" rows="5" {...stars}
                              onChange={(e) => this.setState({starsValue: e.target.value})}
                              value={this.state.starsValue} />
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

function mapStateToProps(state) {
    return {
        post: state.posts.post
    }
}

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'releaseYear', 'format', 'stars'],
    validate

}, mapStateToProps, { fetchPost, editPost })(PostsEdit);
