import React from "react";
import logo from "./logo.svg";
import "./App.css";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

function App() {
	const exportImage = () => {
		console.log("EXPORTING IANMGE");
		const node = document.getElementById("thingy") as HTMLElement;

		htmlToImage
			.toPng(node)
			.then((dataUrl) => {
				const img = new Image();
				img.src = dataUrl;
				document.body.appendChild(img);
                
				let link = document.createElement("a");
				link.download = "my-image-name.png";
				link.href = dataUrl;
				link.click();
			})
			.catch((err) => {
				console.error("oops, something went wrong!", err);
			});
	};

	return (
		<div className="App">
			<header className="App-header" id={"thingy"}>
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload. hmmm
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
				<button onClick={exportImage}>HERE</button>
			</header>
		</div>
	);
}

export default App;
