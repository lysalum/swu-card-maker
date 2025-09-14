import blueAspect0 from "./assets/blue_aspect_0.png";
import blueAspect1 from "./assets/blue_aspect_1.png";
import cost0 from "./assets/cost_0.png";
import cost1 from "./assets/cost_1.png";
import cost2 from "./assets/cost_2.png";
import cost3 from "./assets/cost_3.png";
import cost4 from "./assets/cost_4.png";
import cost5 from "./assets/cost_5.png";
import cost6 from "./assets/cost_6.png";
import cost7 from "./assets/cost_7.png";
import cost8 from "./assets/cost_8.png";
// import cost9 from "./assets/cost_9.png";
// import cost10 from "./assets/cost_10.png";
import frameBlueHero from "./assets/frame_blue_hero.png";
import frameBlueVillain from "./assets/frame_blue_villain.png";
import frameGreenHero from "./assets/frame_green_hero.png";
import frameGreenVillain from "./assets/frame_green_villain.png";
import frameRedHero from "./assets/frame_red_hero.png";
import frameRedVillain from "./assets/frame_red_villain.png";
import frameYellowHero from "./assets/frame_yellow_hero.png";
import frameYellowVillain from "./assets/frame_yellow_villain.png";
import greenAspect0 from "./assets/green_aspect_0.png";
import greenAspect1 from "./assets/green_aspect_1.png";
import health1 from "./assets/health_1.png";
import health2 from "./assets/health_2.png";
import health3 from "./assets/health_3.png";
import health4 from "./assets/health_4.png";
import health5 from "./assets/health_5.png";
import health6 from "./assets/health_6.png";
import health7 from "./assets/health_7.png";
import health8 from "./assets/health_8.png";
import health9 from "./assets/health_9.png";
import health10 from "./assets/health_10.png";
import heroAspect0 from "./assets/hero_aspect_0.png";
import heroAspect1 from "./assets/hero_aspect_1.png";
import firstLeaderAspectBlue from "./assets/leader_aspect_blue_0.png";
import firstLeaderAspectYellow from "./assets/leader_aspect_yellow_0.png";
import firstLeaderAspectRed from "./assets/leader_aspect_red_0.png";
import firstLeaderAspectGreen from "./assets/leader_aspect_green_0.png";
import secondLeaderAspectVillain from "./assets/leader_aspect_villain_1.png";
import secondLeaderAspectHero from "./assets/leader_aspect_hero_1.png";
import power0 from "./assets/power_0.png";
import power1 from "./assets/power_1.png";
import power2 from "./assets/power_2.png";
import power3 from "./assets/power_3.png";
import power4 from "./assets/power_4.png";
import power5 from "./assets/power_5.png";
import power6 from "./assets/power_6.png";
import power7 from "./assets/power_7.png";
import power8 from "./assets/power_8.png";
import power9 from "./assets/power_9.png";
import power10 from "./assets/power_10.png";
import redAspect0 from "./assets/red_aspect_0.png";
import redAspect1 from "./assets/red_aspect_1.png";
import villainAspect0 from "./assets/villain_aspect_0.png";
import villainAspect1 from "./assets/villain_aspect_1.png";
import yellowAspect0 from "./assets/yellow_aspect_0.png";
import yellowAspect1 from "./assets/yellow_aspect_1.png";

import costBlank from "./assets/blank_cost.png";
import healthBlank from "./assets/blank_health.png";
import powerBlank from "./assets/blank_power.png";


export const imgMap = {
	// Aspects
	blueAspect0,
	blueAspect1,
	greenAspect0,
	greenAspect1,
	redAspect0,
	redAspect1,
	yellowAspect0,
	yellowAspect1,

	// Leader Aspects
	heroAspect0,
	heroAspect1,
	villainAspect0,
	villainAspect1,
	secondLeaderAspectVillain,
	secondLeaderAspectHero,
	firstLeaderAspectBlue,
	firstLeaderAspectGreen,
	firstLeaderAspectRed,
	firstLeaderAspectYellow,

	// Cost icons
    costBlank,
	cost0,
	cost1,
	cost2,
	cost3,
	cost4,
	cost5,
	cost6,
	cost7,
	cost8,
	// cost9,
	// cost10,

	// Health icons
    healthBlank,
	health1,
	health2,
	health3,
	health4,
	health5,
	health6,
	health7,
	health8,
	health9,
	health10,

	// Power icons
    powerBlank,
	power0,
	power1,
	power2,
	power3,
	power4,
	power5,
	power6,
	power7,
	power8,
	power9,
	power10,

	// Frames
	frameBlueHero,
	frameBlueVillain,
	frameGreenHero,
	frameGreenVillain,
	frameRedHero,
	frameRedVillain,
	frameYellowHero,
	frameYellowVillain,
};

export const frameOptions = [
    {value: frameRedHero, label: "Red Heroism", color: firstLeaderAspectRed, aspect: secondLeaderAspectHero},
    {value: frameBlueHero, label: "Blue Heroism", color: firstLeaderAspectBlue, aspect: secondLeaderAspectHero},
    {value: frameGreenHero, label: "Green Heroism", color: firstLeaderAspectGreen, aspect: secondLeaderAspectHero},
    {value: frameYellowHero, label: "Yellow Heroism", color: firstLeaderAspectYellow, aspect: secondLeaderAspectHero},
    {value: frameRedVillain, label: "Red Villainy", color: firstLeaderAspectRed, aspect: secondLeaderAspectVillain},
    {value: frameBlueVillain, label: "Blue Villainy", color: firstLeaderAspectBlue, aspect: secondLeaderAspectVillain},
    {value: frameGreenVillain, label: "Green Villainy", color: firstLeaderAspectGreen, aspect: secondLeaderAspectVillain},
    {value: frameYellowVillain, label: "Yellow Villainy", color: firstLeaderAspectYellow, aspect: secondLeaderAspectVillain},
]

export const firstLeaderAspectOptions = [
    {value: firstLeaderAspectBlue, label: "Blue", needsAdjustment: false},
    {value: firstLeaderAspectYellow, label: "Yellow", needsAdjustment: false},
    {value: firstLeaderAspectRed, label: "Red", needsAdjustment: false},
    {value: firstLeaderAspectGreen, label: "Green", needsAdjustment: false},
    {value: secondLeaderAspectVillain, label: "Villainy", needsAdjustment: true},
    {value: secondLeaderAspectHero, label: "Heroism", needsAdjustment: true},
]

export const secondLeaderAspectOptions = [
    {value: '', label: "None", needsAdjustment: false},
    {value: firstLeaderAspectBlue, label: "Blue", needsAdjustment: true},
    {value: firstLeaderAspectYellow, label: "Yellow", needsAdjustment: true},
    {value: firstLeaderAspectRed, label: "Red", needsAdjustment: true},
    {value: firstLeaderAspectGreen, label: "Green", needsAdjustment: true},
    {value: secondLeaderAspectVillain, label: "Villainy", needsAdjustment: false},
    {value: secondLeaderAspectHero, label: "Heroism", needsAdjustment: false},
]

let costs = [{value: costBlank, label: 'Blank'}];
for (let i = 0; i < 8; i ++) {
    // @ts-ignore
    costs.push({value: imgMap[`cost${i}`], label: i})
}
export const costOptions = costs;

let power = [{value: powerBlank, label: 'Blank'}];
for (let i = 0; i < 11; i ++) {
    // @ts-ignore
    power.push({value: imgMap[`power${i}`], label: i})
}
export const powerOptions: Array<{ value: string; label: string; }> = power;

let health = [{value: healthBlank, label: 'Blank'}];
for (let i = 1; i < 11; i ++) {
    // @ts-ignore
    health.push({value: imgMap[`health${i}`], label: i})
}
export const healthOptions = health;
