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
        "justify-self": "center",
        "display": "flex"
    }).style(" .lios-button").set({
        "border":"2px inset var(--primary)"
    });
    const browse = buttonsContainer.components().button("a").href("/browse").text("Browse Colors");
    const paletteGenerator = buttonsContainer.components().button("a").href("/generate-palette").text("Generate Palette");
    const about = buttonsContainer.components().button("a").href("/about").text("About");
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
    "justify-self": "center"
});

const inputArea = contentBox.child("div").class.add("gen-input-area");
const inputBox = inputArea.child("input").style().set({
    "outline": "none",
    "border-radius": "5px",
    "background": "var(--frosted-color-4)",
    "border":"2px inset var(--frosted-color-4)"
}).class.add("lios-frosted-glass").attr({
    "placeholder":"Input Hex color"
});
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
        "border": "4px inset var(--frosted-color-1)"
    });

    const paletteStripBox = paletteContainer.child("div").style().set({
        "display": "flex",
        "flex-direction": "row",
        "overflow": "auto",
        "justify-content": "center",
        "width":"fit-content"
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
    const CSS = colorUtil.CSS(inputData);
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
    const inputData = inputBox.getElement().value.trim();
    paletteShadesGeneration(inputData);
});

    contentBox.child("br");
    contentBox.child("br");

    const paletteArea = contentBox.child("div").style().set({
        "display": "flex",
        "flex-direction": "column",
        "justify-content": "center"
    });
// 

// Auto generate
if (defaultHex) {
    paletteShadesGeneration(defaultHex);
};
// 