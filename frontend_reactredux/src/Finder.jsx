import React, {Component} from 'react';

class Finder extends Component {
    constructor(props) {
        super(props);
        this.handleFormChange = this.handleFormChange.bind(this);
    }

    handleFormChange() {
        this.props.onUserChange(
            this.filterTextInput.value,
            this.searchByName.checked,
            this.searchByActor.checked
        );
    }

    render() {
        return (
            <form id="finder">
                <input type="text"
                       className="searcher"
                       value={this.props.userTextInput}
                       ref={(input) => this.filterTextInput = input}
                       placeholder="Search..."
                       onChange={this.handleFormChange}/>
                <div>
                    <input type="checkbox"
                           className="sortByName"
                           checked={this.props.searchByName}
                           ref={(input) => this.searchByName = input}
                           onChange={this.handleFormChange}/>by name
                    <input type="checkbox"
                           className="sortByActor"
                           checked={this.props.searchByActor}
                           ref={(input) => this.searchByActor = input}
                           onChange={this.handleFormChange}/>by actor
                </div>
            </form>
        );
    }

}

export default Finder;