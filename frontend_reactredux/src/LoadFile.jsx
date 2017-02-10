import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoadFile extends Component {
    constructor(props) {
        super(props);
        this.handlerSend = this.handlerSend.bind(this);
    }

    handlerSend(event) {

        event.preventDefault();

        const file = this.loadFile.files[0],
            reader = new FileReader();



        const show = (text) => {
            this.props.onLoadFile(text);
        };

        (function (newShow) {
            reader.onload = function () {
                newShow(reader.result);
            };
        })(show);

        if (file) {
            reader.readAsText(file);
        }

    }


    render() {
        return (
            <div id="loadFile">
                <form action="#" >
                    <input type="file"
                           onLoad={this.onLoaded}
                           ref={(input) => {this.loadFile = input}}/>
                    <input type="submit" value="Send"
                           onClick={this.handlerSend} />
                </form>
            </div>
        )
    }
}

export default connect(
    state => ({
        films: state
    }),
    dispatch => ({

        onLoadFile: (base) => {
            const asyncLoadBase = () => {

                return dispatch => {

                    const titleRe = /(Title:) .+/g;
                    const yearRe = /(Release Year:) .+/g;
                    const formatRe = /(Format:) .+/g;
                    const starsRe = /(Stars:) .+/g;
                    let titles = [];
                    let years = [];
                    let formats = [];
                    let stars = [];

                        titles = base.match(titleRe);
                        years = base.match(yearRe);
                        formats = base.match(formatRe);
                        stars = base.match(starsRe);

                    let sumStr = [];

                    titles.forEach((value, i) => {

                        let t = titles[i].split(':');
                        t = `"${t[0].trim()}":"${t[1].trim()}",`;

                        let y = years[i].split(':');
                        y = `"${y[0].trim()}":"${y[1].trim()}",`;

                        let f = formats[i].split(':');
                        f = `"${f[0].trim()}":"${f[1].trim()}",`;

                        let s = stars[i].split(':');
                        s = `"${s[0].trim()}":"${s[1].trim()}"`;

                        sumStr.push('{' + t + y + f + s + '}');

                    });

                    let sumJson = '['+ sumStr.join(',') + ']';


                    fetch('http://localhost:3012/films/base', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',

                        },
                        body: sumJson
                    })
                    .catch(err => {
                        console.log(err);
                    })

                };

            };
            dispatch(asyncLoadBase());
        }
    })
)(LoadFile);