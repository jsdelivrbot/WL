import React, {Component} from 'react';
import VideoElement from '../src/VideoElement';
import { connect } from 'react-redux';


class ListOfFilms extends Component {
    constructor(props) {
        super(props);
        this.handlerSort = this.handlerSort.bind(this);
    }

    handlerSort() {
        const sortedStore = this.props.films;

        let sorted = false;
        while(!sorted) {
            sorted = true;
            for (let i = 0; i < sortedStore.length - 1; i++) {
                if (sortedStore[i]['Title'] > sortedStore[i + 1]['Title']) {
                    [sortedStore[i], sortedStore[i + 1]] = [sortedStore[i + 1], sortedStore[i]];
                    sorted = false;
                }
            }
        }


        this.props.onSortStore(sortedStore);
    }

    render() {

        const rows = [];
        this.props.films.forEach((film, i) => {
            rows.push(<VideoElement key={i} film={film}/>)
        });
        return (
            <div>
                <button onClick={this.handlerSort}>Sort title by A-Z</button>
                {rows}
            </div>
        );
    }
}

export default connect(
    state => ({
        films: state
    }),
    dispatch => ({
        onSortStore: (sorted) => {
            dispatch({type: 'SORT_STORE', payload: sorted})
        }
    })
)(ListOfFilms);