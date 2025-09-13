import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";

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

	const [leaderName, setLeaderName] = useState<string | undefined>(
		"Sabine Wren"
	);
	const [leaderSubtitle, setLeaderSubtitle] = useState<string | undefined>(
		"Galvanized Revolutionary"
	);
	const [leaderTraits, setLeaderTraits] = useState<string | undefined>(
		"Mandalorian • Rebel • Spectre"
	);
	const [cardText, setCardText] = useState<string | undefined>(
		"On Attack: Deal 1 damage to each enemy base."
	);

	const formatTraits = (text: string) => {
		setLeaderTraits(text.replaceAll(",", " • "));
	};

	const exportImage = () => {
		console.log("EXPORTING IANMGE");
		const node = document.getElementById("card-img") as HTMLElement;
		// const node = ogNode.cloneNode(true) as HTMLElement;

		// Border only shows if using toPng ogNode, not node, because cloneNode
		// does not preserve computed styles from CSS files or stylesheets
		node.style.width = "716px";
		node.style.height = "1000px";
		node.style.minWidth = "716px";
		node.style.minHeight = "1000px";
		node.style.margin = "0";

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

				node.style.width = "unset";
				node.style.height = "unset";
				node.style.minWidth = "unset";
				node.style.minHeight = "unset";
				node.style.maxHeight = "calc(min(50vh, 1000px))";
				node.style.margin = "auto";
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
							<p className="card-text leader-name">{leaderName}</p>
							<p className="card-text leader-subtitle">{leaderSubtitle}</p>
							<p className="card-text leader-traits">{leaderTraits}</p>
							<p className="card-text card-content-container">{cardText}</p>
						</div>
					</div>
					<button className="download-button" onClick={exportImage}>
						Download Image
					</button>
					<div className="selects">
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

					<div className="text-inputs">
						<label>
							Leader Name (Capitalize first letter of each name)
							<br />
							<input
								name="leaderName"
								value={leaderName}
								onChange={(e) => setLeaderName(e.target.value)}
							/>
						</label>
						<label>
							Leader Subtitle
							<br />
							<input
								name="leaderSubtitle"
								value={leaderSubtitle}
								onChange={(e) => setLeaderSubtitle(e.target.value)}
							/>
						</label>
						<label>
							Leader Traits (separate traits by comma)
							<br />
							<input
								name="leaderTraits"
								value={leaderTraits}
								onChange={(e) => {
									formatTraits(e.target.value);
								}}
							/>
						</label>
						<label>
							Card text
							<br />
							<textarea
								value={cardText}
								onChange={(e) => {
									setCardText(e.target.value);
								}}
								placeholder="Enter Card Text"
								rows={6} // Optionally set the initial number of visible lines
							/>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
