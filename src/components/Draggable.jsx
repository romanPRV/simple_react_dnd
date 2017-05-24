import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import './Draggable.css';

const LEFT_BUTTON_CODE = 0;
const WRAP_WIDTH = 800;
const WRAP_HEIGHT = 350;
const DRAGGABLE_BLOCK_SIZE = 120;
const DROPPABLE_BLOCK_SIZE = 170;

export default class Draggable extends Component {
    static propTypes = {
        wrapOffsetX: PropTypes.number,
        wrapOffsetY: PropTypes.number,
        droppableOffsetX: PropTypes.number,
        droppableOffsetY: PropTypes.number,
        changeDroppableActivity: PropTypes.func
    };

    state = {
        dragging: false,
        defaultPosition: true,
        left: 0,
        top: 0,
        originX: 0,
        originY: 0,
        elementX: 0,
        elementY: 0
    };

    onMouseUp = () => {
        const {
            dragging,
            left,
            top
        } = this.state;
        const {
            droppableOffsetX,
            droppableOffsetY,
            changeDroppableActivity
        } = this.props;

        this.removeEvents();

        if (
            (left > droppableOffsetX - DRAGGABLE_BLOCK_SIZE / 2)
            && (left < droppableOffsetX + DROPPABLE_BLOCK_SIZE - DRAGGABLE_BLOCK_SIZE / 2)
            && (top > droppableOffsetY - DRAGGABLE_BLOCK_SIZE / 2)
            && (top < droppableOffsetY + DROPPABLE_BLOCK_SIZE - DRAGGABLE_BLOCK_SIZE / 2)
        ) {
            changeDroppableActivity();
        }

        if (dragging) {
            this.setState({ dragging: false });
        }
    };

    onMouseDown = e => {
        if (e.button === LEFT_BUTTON_CODE) {
            e.stopPropagation();
            this.addEvents();

            const pageOffset = this.elemNode.getBoundingClientRect();

            this.setState({
                originX: e.pageX,
                originY: e.pageY,
                elementX: pageOffset.left,
                elementY: pageOffset.top
            });
        }
    };

    onMouseMove = e => {
        const {
            dragging,
            originX,
            originY,
            elementX,
            elementY
         } = this.state;
        const deltaX = e.pageX - originX;
        const deltaY = e.pageY - originY;
        const distance = Math.abs(deltaX) + Math.abs(deltaY);

        if (dragging) {
            const {
                wrapOffsetX,
                wrapOffsetY
            } = this.props;
            const minLeft = wrapOffsetX;
            const maxLeft = wrapOffsetX + WRAP_WIDTH - DRAGGABLE_BLOCK_SIZE;
            const minTop = wrapOffsetY;
            const maxTop = wrapOffsetY + WRAP_HEIGHT - DRAGGABLE_BLOCK_SIZE;
            const left = elementX + deltaX + document.body.scrollLeft;
            const top = elementY + deltaY + document.body.scrollTop;

            this.setState({
                defaultPosition: false,
                left: left > minLeft && left < maxLeft ? left : (left < minLeft ? minLeft : maxLeft),
                top: top > minTop && top < maxTop ? top : (top < minTop ? minTop : maxTop)
            });
        } else if (!dragging && distance > 1) {
            this.setState({ dragging: true });
        }
    };

    addEvents = () => {
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    };

    removeEvents = () => {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    };

    setStyle = () => {
        const {
            defaultPosition,
            left,
            top
         } = this.state;

         return defaultPosition ? {} : { left, top };
    };

    render() {
        return (
            <div
                className={`Draggable ${this.state.dragging ? 'Draggable--moving' : ''}`}
                style={this.setStyle()}
                ref={elem => this.elemNode = elem}
                onMouseDown={this.onMouseDown}
            >
                <p>{'Drag me to my target'}</p>
            </div>
        );
    }
}
