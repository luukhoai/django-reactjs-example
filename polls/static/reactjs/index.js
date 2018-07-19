import React from "react";
import ReactDOM from "react-dom";
import PollForm from "./forms/poll_form";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'items': []
        };
    }

    componentDidMount() {
        fetch('polls/')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({'items': result})
            }
        )
    }

    render(){
        const items = this.state.items;
        return (
            <div>
                <h2>Hello world. This is ReactJs</h2>
                <table className="table is-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Version</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map(item => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.version}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PollForm />
            </div>
        )
    }
}

ReactDOM.render(<App />,  document.getElementById('app'))