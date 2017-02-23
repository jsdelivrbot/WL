import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/posts_index';
import PostsNew from './components/post_new';
import PostsShow from './components/posts_show';
import PostsEdit from './components/post_edit';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={PostIndex} />
        <Route path="films/new" component={PostsNew} />
        <Route path="films/:id" component={PostsShow} />
        <Route path="films/edit/:id" component={PostsEdit} />
    </Route>
);
