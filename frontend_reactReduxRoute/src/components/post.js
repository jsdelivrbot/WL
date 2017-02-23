import React from 'react';


export default (props) => {
    return (

        <div>
            <span className="pull-xs-right">{props.post['Release Year']}</span>
            <strong>{props.post['Title']}</strong>
        </div>

    );
}
