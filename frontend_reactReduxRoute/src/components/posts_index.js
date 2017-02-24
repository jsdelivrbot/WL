import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, sortList, getNext, resetValue } from '../actions/index';
import Post from './post';
import { Link } from 'react-router';
import LazyLoad from 'react-lazy-load';

class PostIndex extends Component {
    constructor(props) {
        super(props);
        this.renderPosts = this.renderPosts.bind(this);
    }

    componentWillMount() {

        this.props.resetValue();
        this.props.getNext();
        console.log(this.props.posts);
    }

    renderPosts() {

        return this.props.posts.map(post => {

            return (

                <li className="list-group-item" key={post['_id']}>
                    <LazyLoad height={30} offsetHorizontal={50} onContentVisible={this.LazyHover.bind(this)}>
                        <Link to={`films/${post['_id']}`}>
                            <Post post={post} />
                        </Link>
                    </LazyLoad>
                </li>

            );
        });
    }

    onChangeSort(event) {

        this.props.sortList(event.target.value);
    }

    LazyHover() {
        this.props.getNext();
    }


    render() {

        if (this.props.posts.length === 0) {
            console.log(this.props.posts);

            return (
                <div>
                    <div className="text-xs-right">
                        <Link to="/films/new" className="btn btn-primary">
                            Add Post
                        </Link>
                    </div>
                    <div>Please add new post</div>
                </div>
                )
        }

        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/films/new" className="btn btn-primary">
                        Add Post
                    </Link>
                </div>
                <h3>List of Films</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <select className="btn btn-default" onChange={this.onChangeSort.bind(this)}>
                            <option >Sort Films</option>
                            <option value="title_az">Sort by Title A-Z</option>
                            <option value="title_za">Sort by Title Z-A</option>
                            <option value="year_az">Sort by Year release A-Z</option>
                            <option value="year_za">Sort by Year release Z-A</option>
                        </select>

                    </li>

                    {this.renderPosts()}

                </ul>
            </div>

        );
    }
}

function mapStateToProps(state) {

    return { posts: state.posts.all }
}

export default connect(mapStateToProps, { fetchPosts, sortList, getNext, resetValue })(PostIndex);