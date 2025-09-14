import React, { useRef, useState } from "react";
// import logo from "./logo.svg";
import "./App.scss";

import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import {
	costOptions,
	frameOptions,
	healthOptions,
	imgMap,
	powerOptions,
	firstLeaderAspectOptions,
	secondLeaderAspectOptions,
} from "./consts";
import Select, { SingleValue } from "react-select";
import RichTextEditor from "./components/tipTapEditor";
import { Editor } from "@tiptap/react";
import { text } from "node:stream/consumers";

function App() {
	const [frame, setFrame] = useState<string | undefined>(
		imgMap["frameRedHero"]
	);
	const [cost, setCost] = useState<any>(costOptions[5]);
	const [firstLeaderAspect, setFirstLeaderAspect] = useState<any>(
		firstLeaderAspectOptions[2]
	);
	const [secondLeaderAspect, setSecondLeaderAspect] = useState<any>(
		secondLeaderAspectOptions[5]
	);
	const [health, setHealth] = useState<any>(healthOptions[6]);
	const [power, setPower] = useState<any>(powerOptions[3]);

	const [leaderName, setLeaderName] = useState<string | undefined>(
		"Sabine Wren"
	);
	const [leaderSubtitle, setLeaderSubtitle] = useState<string | undefined>(
		"Galvanized Revolutionary"
	);
	const [leaderTraits, setLeaderTraits] = useState<string | undefined>(
		"Mandalorian • Rebel • Spectre"
	);

	const [customCost, setCustomCost] = useState("");
	const [customPower, setCustomPower] = useState("");
	const [customHealth, setCustomHealth] = useState("");

	const [richTextContent, setRichTextContent] = useState("");
	const editorRef = useRef<Editor | null>(null);

	const formatTraits = (text: string) => {
		setLeaderTraits(text.replaceAll(",", " • "));
	};

	const handleContentChange = (htmlContent: string) => {
		console.log("htmlContent", htmlContent);
		setRichTextContent(htmlContent);
	};

	const changeTextSize = (type: "inc" | "dec") => {
		const textNode = document.querySelector(
			".card-text.card-content-container"
		) as HTMLElement;
		const textSize = parseFloat(window.getComputedStyle(textNode).fontSize);
		const cardHeight = document.getElementById("card-img")?.clientHeight || 0;

		let textCqh = (textSize / cardHeight) * 100;
		if (type === "inc") {
			textCqh += 0.1;
		} else {
			textCqh -= 0.1;
		}
		textNode.style.fontSize = textCqh + "cqh";
	};

	const exportImage = () => {
		const node = document.getElementById("card-img") as HTMLElement;
		// const node = ogNode.cloneNode(true) as HTMLElement;

		// Border only shows if using toPng ogNode, not node, because cloneNode
		// does not preserve computed styles from CSS files or stylesheets
		const origWidth = node.style.width;
		const orignHeight = node.style.height;
		const origMinwidth = node.style.minWidth;
		const origMinHeight = node.style.minHeight;
		const origMargin = node.style.margin;

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

				node.style.width = origWidth;
				node.style.height = orignHeight;
				node.style.minWidth = origMinwidth;
				node.style.minHeight = origMinHeight;
				node.style.margin = origMargin;
			})
			.catch((err) => {
				console.error("oops, something went wrong!", err);
			});
	};

	return (
		<div className="App">
			<div className={"page-padding"}>
				<div className="page-content">
					<div className="image-half">
						<div className="card-container">
							<div id="card-img" className="img-div">
								<img className="img-component card-frame" src={frame}></img>
								<img className="img-component card-cost" src={cost.value}></img>
								<img
									className={`img-component card-leader-color ${
										firstLeaderAspect.needsAdjustment &&
										"adjust-first-leader-aspect-up"
									}`}
									src={firstLeaderAspect.value}
								></img>
								<img
									className={`img-component card-leader-aspect ${
										secondLeaderAspect.needsAdjustment &&
										"adjust-second-leader-aspect-down"
									}`}
									src={secondLeaderAspect.value}
								></img>
								<img
									className="img-component card-health"
									src={health.value}
								></img>
								<img
									className="img-component card-power"
									src={power.value}
								></img>
								<p className="card-text leader-name">{leaderName}</p>
								<p className="card-text leader-subtitle">{leaderSubtitle}</p>
								<p className="card-text leader-traits">{leaderTraits}</p>
								<p
									className="card-text card-content-container"
									dangerouslySetInnerHTML={{ __html: richTextContent }}
								></p>
								<p className="card-custom-value custom-cost-card-text">
									{customCost}
								</p>
								<p className="card-custom-value custom-power-card-text">
									{customPower}
								</p>
								<p className="card-custom-value custom-health-card-text">
									{customHealth}
								</p>
							</div>
						</div>
						<button className="download-button" onClick={exportImage}>
							Download Image
						</button>
					</div>
					<div className="other-half">
						<div className="selects">
							<div className="select-item">
								<div className="select-label">Cost</div>
								<Select
									className="card-select cost-select"
									options={costOptions}
									defaultValue={costOptions[4]}
									value={cost}
									onChange={(option) => {
										setCost(option);
										if (option.label !== "Blank") {
											setCustomCost("");
										}
									}}
								/>
							</div>

							<div className="select-item">
								<div className="select-label">Background</div>
								<Select
									className="card-select frame-select"
									options={frameOptions}
									defaultValue={frameOptions[0]}
									onChange={(option) => {
										setFrame(option?.value);
									}}
								/>
							</div>

							<div className="select-item">
								<div className="select-label">Leader Aspect First Color</div>
								<Select
									className="card-select first-leader-aspect-select"
									options={firstLeaderAspectOptions}
									defaultValue={firstLeaderAspectOptions[2]}
									onChange={(option) => {
										setFirstLeaderAspect(option);
									}}
								/>
							</div>

							<div className="select-item">
								<div className="select-label">Leader Aspect Second Color</div>
								<Select
									className="card-select second-leader-aspect-select"
									options={secondLeaderAspectOptions}
									defaultValue={secondLeaderAspectOptions[5]}
									onChange={(option) => {
										setSecondLeaderAspect(option);
									}}
								/>
							</div>

							<div className="select-item">
								<div className="select-label">Power</div>
								<Select
									className="card-select power-select"
									options={powerOptions}
									defaultValue={powerOptions[2]}
									value={power}
									onChange={(option) => {
										setPower(option);
										if (option.label !== "Blank") {
											setCustomPower("");
										}
									}}
								/>
							</div>

							<div className="select-item">
								<div className="select-label">Health</div>
								<Select
									className="card-select health-select"
									options={healthOptions}
									defaultValue={healthOptions[5]}
									value={health}
									onChange={(option) => {
										setHealth(option);
										if (option.label !== "Blank") {
											setCustomHealth("");
										}
									}}
								/>
							</div>

							<div className="select-item">
								<label>
									Custom Power
									<br />
									<input
										name="customPower"
										value={customPower}
										onChange={(e) => {
											setCustomPower(e.target.value);
											if (e.target.value !== "") {
												setPower(powerOptions[0]);
											}
										}}
									/>
								</label>
							</div>

							<div className="select-item">
								<label>
									Custom Health
									<br />
									<input
										name="customHealth"
										value={customHealth}
										onChange={(e) => {
											setCustomHealth(e.target.value);
											if (e.target.value !== "") {
												setHealth(healthOptions[0]);
											}
										}}
									/>
								</label>
							</div>

							<div className="select-item">
								<label>
									Custom Cost
									<br />
									<input
										name="customCost"
										value={customCost}
										onChange={(e) => {
											setCustomCost(e.target.value);
											if (e.target.value !== "") {
												setCost(costOptions[0]);
											}
										}}
									/>
								</label>
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
							<div className="richtext-section">
								<div className="select-label">Card Content</div>
								<RichTextEditor
									ref={editorRef}
									onContentChange={handleContentChange}
									changeTextSize={changeTextSize}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
