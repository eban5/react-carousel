import React from "react";
import "./App.css";
import Gallery from "./carousel/carousel";

function App() {
	return (
		<div className="App">
			<Gallery buttonsDisabled={true} />
		</div>
	);
}

export default App;
