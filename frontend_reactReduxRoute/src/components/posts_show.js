import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';


class PostShow extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {

        this.props.fetchPost(this.props.params['id']);
    }

    onDeleteClick() {
        this.props.deletePost(this.props.params['id'])
            .then(() => {
                this.context.router.push('/');
            })
    }

    render() {

        if (!this.props.post) {
            return <div>Loading data...</div>
        }

        return (
            <div>
                <Link to="/" className="btn btn-info">Backward</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
                <h3>{this.props.post['Title']}</h3>
                <h6>Release Year: {this.props.post['Release Year']}</h6>
                <p>Format: {this.props.post['Format']}</p>
                <p>Stars: {this.props.post['Stars']}</p>
                <Link to={`/films/edit/${this.props.post['_id']}`}>
                    <button
                        className="btn btn-warning pull-xs-right">
                        Edit Post
                    </button>
                </Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.posts.post
    }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);