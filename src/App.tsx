import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import {
	costOptions,
	frameOptions,
	healthOptions,
	imgMap,
	powerOptions,
} from "./consts";
import Select, { SingleValue } from "react-select";

function App() {
	const [frame, setFrame] = useState<string | undefined>(
		imgMap["frameRedHero"]
	);
	const [cost, setCost] = useState<string | undefined>(imgMap["cost0"]);
	const [leaderColorAspect, setLeaderColorAspect] = useState<
		string | undefined
	>(imgMap["leaderAspectRed"]);
	const [leaderAspect, setLeaderAspect] = useState<string | undefined>(
		imgMap["leaderAspectHero"]
	);
	const [health, setHealth] = useState<string | undefined>(imgMap["health5"]);
	const [power, setPower] = useState<string | undefined>(imgMap["power2"]);

	console.log("frame", frame);

	const exportImage = () => {
		console.log("EXPORTING IANMGE");
		const ogNode = document.getElementById("card-img") as HTMLElement;
		const node = ogNode.cloneNode(true) as HTMLElement;

		// Border only shows if using toPng ogNode, not node, because cloneNode
		// does not preserve computed styles from CSS files or stylesheets
		node.id = "card-img-export";
		node.style.width = "716px";
		node.style.height = "1000px";
		node.style.minWidth = "716px";
		node.style.minHeight = "1000px";

		toPng(node, {
			width: 716,
			height: 1000,
			pixelRatio: 1,
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
				// document.body.appendChild(node);
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
						<div id="card-img" className="img-div">
							<img className="img-component card-frame" src={frame}></img>
							<img className="img-component card-cost" src={cost}></img>
							<img
								className="img-component card-leader-color"
								src={leaderColorAspect}
							></img>
							<img
								className="img-component card-leader-aspect"
								src={leaderAspect}
							></img>
							<img className="img-component card-health" src={health}></img>
							<img className="img-component card-power" src={power}></img>
						</div>
					</div>
					<button className="download-button" onClick={exportImage}>Download image</button>
					<div className="selects">
						<div className="select-item">
							<div className="select-label">Select template</div>
							<Select
								className="card-select frame-select"
								options={frameOptions}
								defaultValue={frameOptions[0]}
								onChange={(option) => {
									setFrame(option?.value);
									setLeaderAspect(option?.aspect);
									setLeaderColorAspect(option?.color);
								}}
							/>
						</div>

						<div className="select-item">
							<div className="select-cost">Select cost</div>
							<Select
								className="card-select cost-select"
								options={costOptions}
								defaultValue={costOptions[0]}
								onChange={(option) => setCost(option?.value)}
							/>
						</div>

						<div className="select-item">
							<div className="select-label">Select power</div>
							<Select
								className="card-select power-select"
								options={powerOptions}
								defaultValue={powerOptions[2]}
								onChange={(option) => setPower(option?.value)}
							/>
						</div>

						<div className="select-item">
							<div className="select-label">Select health</div>
							<Select
								className="card-select health-select"
								options={healthOptions}
								defaultValue={healthOptions[5]}
								onChange={(option) => setHealth(option?.value)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
