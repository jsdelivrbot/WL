import React, {Component} from 'react';
import { connect } from 'react-redux';
import LoadFile from './LoadFile';

import AddFilm from './AddFilm';
import ListOfFilms from './ListOfFilms';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handlerSort = this.handlerSort.bind(this);
    }

    handleFormChange() {
        this.props.onGetFilms(this.filterTextInput.value,
            this.searchByTitle.checked,
            this.searchByActor.checked);
    }

    handlerSort(value) {

    }

    render() {
        return (
            <div id="app">
                    <LoadFile />
                    <form id="finder" onChange={this.handleFormChange}>
                        <input type="text"
                               className="input"
                               value={this.props.userTextInput}
                               ref={(input) => {this.filterTextInput = input}}
                               placeholder="Search..."/>
                        <div>
                            <input type="radio"
                                   name="searchBy"
                                   className="sortByName"
                                   defaultChecked={true}
                                   ref={(input) => {this.searchByTitle = input}}/>Find by title
                            <input type="radio"
                                   name="searchBy"
                                   className="sortByActor"
                                   ref={(input) => {this.searchByActor = input}}/>Find by star

                        </div>
                    </form>
                    <AddFilm />
                    <ul>
                        <ListOfFilms />
                    </ul>
            </div>
        );
    }
}


export default connect(
    state => ({
        films: state
    }),
    dispatch => ({

        onGetFilms: (textInput, searchByTitle,  searchByActor) => {
            const asyncGetFilms = () => {
                return dispatch => {

                    let link = '';

                    if (textInput && searchByTitle) {

                        link = '/title/' + textInput;

                    } else if (textInput && searchByActor) {

                        link = '/stars/' + textInput;

                    } else if (link = '') {
                        document.querySelector('.ul').textContent = '';

                    }

                    fetch('http://localhost:3012/films' + link)
                        .then(res => res.json())
                        .then(res => {
                            dispatch({type: 'FIND_FILM', payload: res})
                        }).catch(err => {
                        console.log(err)
                    });

                };

            };
            dispatch(asyncGetFilms());
        }
    })
)(App);



