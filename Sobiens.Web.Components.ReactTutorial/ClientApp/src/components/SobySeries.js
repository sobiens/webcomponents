import React, { Component } from 'react';

export class SobySeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title
        };
    }

    componentDidUpdate(prevProps) {
        var requiresSetState = false;

        if (this.props.title !== prevProps.title || this.props.title !== this.state.title) {
            this.state.title = this.props.title;
            requiresSetState = true;
        }

        if (requiresSetState === true)
            this.setState(this.state);
    }
    componentDidMount() {
    }
    render(props) {
        return (<div className='series'>{this.props.title}</div>)
    }
}