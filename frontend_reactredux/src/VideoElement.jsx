import React, {Component} from 'react';
import { connect } from 'react-redux';

class VideoElement extends Component {
    constructor(props) {
        super(props);
        this.onDeleteFilm = this.onDeleteFilm.bind(this);
    }

    onDeleteFilm(event) {
        if (event.target.className === 'deleteBtn') {
            this.props.onDeleteFilm(event.target.parentElement.id);
        }
    }

    render() {
        let arr = [];
        let idElement;
        for (let prop in this.props.film) {
            if (prop === '_id') {
                idElement = this.props.film[prop];
                continue;
            }
            arr.push(
                    <tr key={arr.length}>
                        <td className="leftColumn">{prop}</td>
                        <td className="middleColumn">{this.props.film[prop]}</td>
                    </tr>
            )
        }
        return (
            <div className="videoElement"  id={idElement}>
                <table>
                    <tbody>
                    {arr}
                    </tbody>
                </table>
                <button onClick={this.onDeleteFilm} className="deleteBtn">Delete</button>
            </div>
        );
    }
}


export default connect(
    state => ({
        films: state
    }),
    dispatch => ({
        onDeleteFilm: (filmId) => {
            const asyncDeleteFilm = () => {

                return dispatch => {

                    fetch('http://localhost:3012/films/' + filmId , {
                        method: 'DELETE',
                        mode: 'cors',
                    })
                        .then(() => {
                            dispatch({type: 'DELETE_FILM', payload: filmId})
                        })
                        .catch(err => {
                        console.log(err);
                    })
                };

            };
            dispatch(asyncDeleteFilm());
        }
    })
)(VideoElement);