import React from "react";
import logo from "./logo.svg";
import "./App.css";
import thing from "./assets/frame_blue_hero.png";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

function App() {
	const exportImage = () => {
		console.log("EXPORTING IANMGE");
		const node = document.getElementById("card-img") as HTMLElement;
        node.style.width = '716px';
        node.style.height = '1000px';
        node.style.minWidth = '716px';
        node.style.minHeight = '1000px';
        node.style.margin = '0px';
        node.style.marginLeft = '-1px';
        node.style.marginTop = '-1px';

		htmlToImage
			.toPng(node, {
                width: 716, 
                height: 1000,
            })
			.then((dataUrl) => {
				const img = new Image();
				img.src = dataUrl;
				// document.body.appendChild(img);

				let link = document.createElement("a");
				link.download = "my-image-name.png";
				link.href = dataUrl;
				link.click();
				document.body.appendChild(img);
			})
			.catch((err) => {
				console.error("oops, something went wrong!", err);
			});
	};

	return (
		<div className="App">
			{/* <header className="App-header" id={"thingy"}>
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
			</header> */}

			<div className={"page-padding"}>
				<div className="page-content">
					<div className="card-container">
						<div id="card-img">
							<img className="img-component" src={thing}></img>
						</div>
					</div>
					<button onClick={exportImage}>HERE</button>
				</div>
			</div>
		</div>
	);
}

export default App;
