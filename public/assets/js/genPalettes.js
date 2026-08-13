import { liosOpen } from "../../LiOS-Open/liosOpen.js";
import { colorConvertor } from "./tools/colorConvertor.js";
import { colorUtil } from "../../LiOS-Colors-Utility/colorUtil.js";
import { webUtils } from "../../LiOS-Web-Utils/liosWebUtils.js";

const ui = liosOpen.ui;

ui.extend("components", liosOpen.uiExtensions.components);

const url = new URL(window.location.href);
const params = url.searchParams;
const defaultHex = params.get("hex");

const main = new ui("main");
main.style().set({
    "padding-bottom": "100px"
});

const buttonsContainer = main.components().buttonGroup();
    buttonsContainer.style().set({
        "color": "var(--black)",
        "display": "flex",
        "align-self": "center",
        "justify-content": "center",
        "margin-left": "auto",
        "margin-right": "auto",
        "margin-inline": "auto"
    }).style(" .lios-button").set({
        "border":"2px inset var(--primary)"
    });
    const home = buttonsContainer.components().button("a").href("/").text("Home");
    const browse = buttonsContainer.components().button("a").href("/browse").text("Browse Colors");
    const github = buttonsContainer.components().button("a").href("https://github.com/LiOS-Org/LiOS-Colors").text("Github");

// 
// Line breaks
main.child("br");
main.child("br");
// 

// Main content
const contentBox = main.child("div").class.add("lios-card", "lios-frosted-glass", "gen-content-box").style().set({
    "width": "90%",
    "border-radius": "15px",
    "background": "var(--frosted-white)",
    "border": "2px outset var(--frosted-white)",
    "align-self": "center",
    "margin-left": "auto",
    "margin-right": "auto",
    "margin-inline": "auto"
});

const inputStyle = {
    "outline": "none",
    "border-radius": "5px",
    "background": "var(--frosted-color-4)",
    "border": "2px inset var(--frosted-color-4)",
};

const inputArea = contentBox.child("div").class.add("gen-input-area");

const fieldStyle = {
    "color": "var(--black)",
    "width": "80%",
    "display":"flex",
    "justify-content": "space-between",
    "font-size":"24px"
}

const inputBox = inputArea.child("div").style().set(fieldStyle);
const hexText = inputBox.child("span").text("Hex: ")
const hexInput = inputBox.child("input").style().set(inputStyle).style("::placeholder").set({
    "color": "var(--color-1)"
}).class.add("lios-frosted-glass").placeholder("Input Hex color");
const getHex = () => {
    const hex = hexInput.getElement().value;
    if (hex[0] === "#") {
        return hex;
    } else {
        return `#${hex}`;
    };
};

const stepsBox = inputArea.child("div").style().set(fieldStyle);
const stepsText = stepsBox.child("span").text("Number of shades: ")
const stepsInput = stepsBox.child("input").style().set(inputStyle).style("::placeholder").set({
    "color": "var(--color-1)"
}).class.add("lios-frosted-glass").placeholder("shades, default = 7");

stepsInput.getElement().value = 7;

const paletteShadesGeneration = (inputData, steps = 7) => {
    const palette = colorUtil.newPalette(inputData, { steps: steps });

    paletteArea.getElement().innerHTML = "";

    paletteArea.child("h2").style().set({
        "text-align": "center",
    }).text("Palettes");

    const paletteContainer = paletteArea.child("div").style().set({
        "overflow": "auto",
        "padding": "inherit",
        "background": "var(--frosted-color-1)",
        "border": "4px inset var(--frosted-color-1)",
        "width": "95%",
        "align-self": "center",
        "margin-left": "auto",
        "margin-right": "auto",
        "margin-inline": "auto"
    });

    const paletteStripBox = paletteContainer.child("div").style().set({
        "flex-direction": "row",
        "overflow": "auto",
        "justify-content": "center",
        "display": "inline-flex"
    });
    palette.forEach((shade) => {
        const newPalette = paletteStripBox.child("div").class.add("gen-palette-strip").style().set({
            "background": shade
        });
        const copyButton = newPalette.components().actionButton().text(shade).on("click", () => {
            webUtils.text.copy(shade)
        }).class.add("gen-palette-strip-button");

        inputBox.getElement().value = "";
    });

    paletteArea.child("br");
    paletteArea.child("br");

    paletteArea.child("h2").style().set({
        "text-align": "center"
    }).text("CSS");

    const CSSBlock = paletteArea.child("div").class.add("lios-frosted-glass", "lios-card").style().set({
        "background": "var(--frosted-white)",
        "border": "2px inset var(--frosted-white)",
        "width": "90%",
        "display": "flex",
        "white-space": "pre-wrap",
        "font-family": "monospace",
        "place-self": "center",
        "color": "var(--black)"
    });
    const CSS = colorUtil.CSS(inputData, stepsInput.getElement().value);
// Keep it as it is, template literals preserves source indentation: Important
    const formattedCSS =`:root {
${Object.entries(CSS).map(([key, value]) => `  ${key}: ${value};`).join("\n")}
}`;
// 

    CSSBlock.text(formattedCSS);
    paletteArea.child("br");
    paletteArea.components().actionButton().text("Copy CSS").on("click", () => {
        webUtils.text.copy(formattedCSS);
    });

};
const inputSubmit = inputArea.components().actionButton().text("Generate").on("click", () => {
    const inputData = getHex();
    paletteShadesGeneration(inputData, stepsInput.getElement().value);
});

    contentBox.child("br");
    contentBox.child("br");

const paletteArea = contentBox.child("div").style().set({
    "display": "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "overflow":"auto"
});
// 

// Auto generate
if (defaultHex) {
    paletteShadesGeneration(defaultHex, stepsInput.getElement().value);
    hexInput.getElement().value = defaultHex;
};
// 
