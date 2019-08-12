import React, { Component } from "react";

export default class Popover extends Component {
	constructor(props) {
		super(props);
		this.handleMouseHover = this.handleMouseHover.bind(this);
		this.state = {
			isHovering: false
		};
	}

	handleMouseHover() {
		this.setState(this.toggleHoverState);
	}

	toggleHoverState(state) {
		return {
			isHovering: !state.isHovering
		};
	}

	render() {
		return (
			<div style={{ cursor: "pointer" }}>
				<div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
					Hover Me
				</div>
				{this.state.isHovering && <div>Hovering right meow! 🐱</div>}
			</div>
		);
	}
}
