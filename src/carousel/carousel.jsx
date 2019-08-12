import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Button from "react-bootstrap/Button";

import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import img6 from "../images/img6.jpg";
import img7 from "../images/img7.jpg";
import img8 from "../images/img8.jpg";
import img9 from "../images/img9.jpg";
import img10 from "../images/img10.jpg";
import img11 from "../images/img11.jpg";
import img12 from "../images/img12.jpg";
import img13 from "../images/img13.jpg";

import Popover from "../popover/popover";

export default class Gallery extends React.Component {
	state = {
		currentIndex: 0,
		itemsInSlide: 1,
		responsive: { 0: { items: 3 } },
		galleryItems: this.galleryItems(),
		dummyData: this.dummyData(),
		groups: []
	};
	dummyData() {
		return [
			{
				src: img1,
				title: "Image1",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "1",
				episode: "1"
			},
			{
				src: img2,
				title: "Image2",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "1",
				episode: "2"
			},
			{
				src: img3,
				title: "Image3",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "1",
				episode: "3"
			},
			{
				src: img4,
				title: "Image4",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "2",
				episode: "1"
			},
			{
				src: img5,
				title: "Image5",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "2",
				episode: "2"
			},
			{
				src: img6,
				title: "Image6",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "2",
				episode: "3"
			},
			{
				src: img7,
				title: "Image7",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "3",
				episode: "1"
			},
			{
				src: img8,
				title: "Image8",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "3",
				episode: "2"
			},
			{
				src: img9,
				title: "Image9",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "3",
				episode: "3"
			},
			{
				src: img10,
				title: "Image10",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "4",
				episode: "1"
			},
			{
				src: img11,
				title: "Image11",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "4",
				episode: "2"
			},
			{
				src: img12,
				title: "Image12",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "4",
				episode: "3"
			},
			{
				src: img13,
				title: "Image13",
				metadata: "Ornare ultrices augue morbi ad aenean elit magna phasellus dignissim.",
				season: "4",
				episode: "4"
			}
		];
	}
	galleryItems() {
		return Array(7)
			.fill()
			.map((item, i) => <h2 className="item">{i + 1}</h2>);
	}
	createGroups(data) {
		return data.map(i => i.season).filter((v, i, a) => a.indexOf(v) === i);
	}

	getFirstIndex = season => {
		const all_episodes = this.state.dummyData;
		let match = all_episodes.filter(i => season === i.season && i.episode === "1")[0];

		//expecting only one episode 1 in any season.
		//find its position in the all_episodes array. subtract 1 because zero-based indexing.
		let match_position = all_episodes.indexOf(match);
		let new_index = 0;
		if (match_position === 0) {
			// nothing
		} else {
			new_index = match_position;
		}
		return new_index;
	};

	slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 });
	slideTo = index => this.setState({ currentIndex: index });
	slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 });

	handleOnSlideChange = event => {
		const { itemsInSlide, item } = event;
		this.setState({ itemsInSlide, currentIndex: item });
	};

	render() {
		const { currentIndex, dummyData, galleryItems, responsive } = this.state;

		const gallery = dummyData.map((item, idx) => {
			return (
				<div key={idx}>
					<div>
						<img width="100%" src={item.src} alt="img" className="yours-custom-class" />
						<Popover />
					</div>
					<div style={{ textAlign: "left" }}>
						<h3>{item.title}</h3>
						<p>
							Season {item.season} Episode {item.episode}
						</p>
					</div>
				</div>
			);
		});
		const buttonGroups = this.createGroups(dummyData);
		const buttons = buttonGroups
			.map((i, idx) => (
				<Button
					variant="outline-primary"
					style={{
						margin: "10px",
						height: "50px"
					}}
					key={idx}
					onClick={() => {
						let new_index = this.getFirstIndex(i);
						this.slideTo(new_index);
					}}>
					Season {i}
				</Button>
			))
			.reverse();

		return (
			<div>
				<Button variant="outline-primary" onClick={() => this.slidePrev()}>
					&lt;
				</Button>
				{buttons}
				<Button variant="outline-primary" onClick={() => this.slideNext()}>
					&gt;
				</Button>
				<AliceCarousel
					mouseDragEnabled
					buttonsDisabled
					dotsDisabled
					infinite={false}
					items={galleryItems}
					slideToIndex={currentIndex}
					responsive={responsive}
					onInitialized={this.handleOnSlideChange}
					onSlideChanged={this.handleOnSlideChange}
					onResized={this.handleOnSlideChange}>
					{gallery}
				</AliceCarousel>
			</div>
		);
	}
}
