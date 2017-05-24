import React, { Component } from 'react';

import Draggable from './components/Draggable.jsx';
import Droppable from './components/Droppable.jsx';

import './App.css';

export default class App extends Component {
    state = {
        isDroppableActive: false,
        droppableOffsetY: 0,
        droppableOffsetX: 0,
        wrapOffsetY: 0,
        wrapOffsetX: 0
    };

    componentDidMount() {
        const offset = this.wrapNode.getBoundingClientRect();

        this.setState({
            wrapOffsetX: offset.left,
            wrapOffsetY: offset.top
        });
    }

    getDroppableNode = node => {
        const offset = node.getBoundingClientRect();

        this.setState({
            droppableOffsetX: offset.left,
            droppableOffsetY: offset.top
        });
    };

    changeDroppableActivity = () => {
        this.setState({ isDroppableActive: true });
    };

    render() {
        const {
            wrapOffsetX,
            wrapOffsetY,
            droppableOffsetY,
            droppableOffsetX,
            isDroppableActive
        } = this.state;

        return (
            <div
              className='App'
              ref={elem => this.wrapNode = elem}
            >
                <Draggable
                    wrapOffsetX={wrapOffsetX}
                    wrapOffsetY={wrapOffsetY}
                    droppableOffsetY={droppableOffsetY}
                    droppableOffsetX={droppableOffsetX}
                    changeDroppableActivity={this.changeDroppableActivity}
                />
                <Droppable
                    isDroppableActive={isDroppableActive}
                    getDroppableNode={this.getDroppableNode}
                />
          </div>
        );
    }
}
