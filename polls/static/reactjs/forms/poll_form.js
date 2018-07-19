import React from "react"


class PollForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: '',
            version: ''
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const polls = {'name': this.state.name,
                       'version': this.state.version};
        const datas = {
            method: 'post',
            body: JSON.stringify(polls),
            headers: new Headers({"Content-Type": "application/json",
                                 "Authorization": "Token 93ae3c513f41d5292c8a81237527c51071ae33b5"})
        };
        fetch('polls/', datas)
            .then(response => response.json())
            .then(response => {
                    console.log(response);
                 }
            )
    }

    render(){
        const {name, version} = this.state
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>Name</label>
                    <input className="input" type="text" name="name" value={name}
                           onChange={this.handleChange} required />
                </div>
                <div className="field">
                    <label>Version</label>
                    <input className="input" type="number" name="version" version={version}
                           onChange={this.handleChange} required />
                </div>
                <button type="submit" className="button">Save</button>
            </form>
        );
    }
}
export default PollForm;