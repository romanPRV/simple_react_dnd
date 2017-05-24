import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import './Droppable.css';

export default class Droppable extends Component {
    static propTypes = {
        getDroppableNode: PropTypes.func,
        isDroppableActive: PropTypes.bool
    };

    componentDidMount() {
        this.props.getDroppableNode(this.elemNode);
    }

    render() {
        const {
            isDroppableActive
        } = this.props;

        return (
            <div
                className={`Droppable ${isDroppableActive ? 'Droppable--active' : ''}`}
                ref={elem => this.elemNode = elem}
            >
                <p>{`${isDroppableActive ? 'Dropped!' : 'Drop here'}`}</p>
            </div>
        );
    }
}
