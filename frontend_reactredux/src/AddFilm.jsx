import React, {Component} from 'react';
import { connect } from 'react-redux';

class AddFilm extends Component {
    constructor(props) {
        super(props);
        this.handlerAdd = this.handlerAdd.bind(this);

    }

    handlerAdd(event) {

        event.preventDefault();

        /**
         *  TODO: Validation "formsy-react"
         *      current lite version
         */

        if (this.titleInput.value.trim()
            && parseInt(this.releaseYearInput.value) > 1895
            && parseInt(this.releaseYearInput.value) < (new Date).getFullYear()
            && this.starsInput.value.trim()) {

            this.props.onAddFilm({
                'Title': this.titleInput.value,
                'Release Year': this.releaseYearInput.value,
                'Format': this.formatInput.value,
                'Stars': this.starsInput.value
            });
        }

    }

    render() {

        return (
            <div>
                <form action="#" className="addForm">
                    <label htmlFor="title">Title</label>
                    <input id="title"
                           type="text"
                           placeholder="Title"
                           ref={(input) => {this.titleInput = input}} />
                    <label htmlFor="releaseYear">Release Year</label>
                    <input id="releaseYear"
                           type="text"
                           placeholder="1895 to present"
                           ref={(input) => {this.releaseYearInput = input}}/>

                    <label htmlFor="format">Format</label>
                    <select name="" id="format" ref={(input) => {this.formatInput = input}}>
                        <option value="VHS">VHS</option>
                        <option value="VHS">DVD</option>
                        <option value="VHS">Blu-Ray</option>
                    </select>

                    <label htmlFor="stars">Stars</label>
                    <input id="stars"
                           type="text"
                           placeholder="Stars"
                           ref={(input) => {this.starsInput = input}}/>

                    <input type="submit" value="Save" id="submitBtn" onClick={this.handlerAdd}/>
                </form>
            </div>

        );
    }
}

export default connect(
    state => ({
        films: state
    }),
    dispatch => ({

        onAddFilm: (newFilm) => {
            const asyncAddFilm = () => {

                return dispatch => {

                    fetch('http://localhost:3012/films', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',

                        },
                        body: JSON.stringify(newFilm)
                    })
                    .then(() => {
                        dispatch({type: 'ADD_FILM', payload: newFilm})
                    })
                    .catch(err => {
                        console.log(err);
                    })
                };

            };
            dispatch(asyncAddFilm());
        }
    })
)(AddFilm);