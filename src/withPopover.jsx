import React from "react";
// const CarouselWithPopover = withPopover(Gallery);
function withPopover(WrappedComponent, popoverData) {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.handleChange = this.handleChange.bind(this);
			this.state = {
				data: popoverData
			};
		}
		render() {
			return <WrappedComponent data={this.state.data} {...this.props} />;
		}
	};
}
