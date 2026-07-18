import { components } from "../../extensions/components.js";
import { liosOpen } from "../../LiOS-Open/liosOpen.js";

const main = async () => {
    const ui = liosOpen.ui;
    ui.extend("components", liosOpen.uiExtensions.components);
    ui.extend("effects", liosOpen.uiExtensions.effects);
    ui.extend("colors",components)

    const home = new ui(".home");

    const buttonsContainer = home.components().buttonGroup();
    buttonsContainer.style().set({
        "color": "var(--black)",
        "justify-self": "center",
        "display": "flex"
    }).style(" .lios-button").set({
        "border":"2px inset var(--primary)"
    });
    const browse = buttonsContainer.components().button("a").href("./browse").text("Browse Colors");
    const paletteGenerator = buttonsContainer.components().button("a").href("./generate-palette").text("Generate Palette");
    const github = buttonsContainer.components().button("a").href("https://github.com/LiOS-Org/LiOS-Colors").text("Github");

    home.child("br");

    const featureCardsContainer = home.child("div").style().set({
        "display": "flex",
        "flex-direction": "row",
        "justify-content": "center",
        "padding": "5px",
        "gap": "15px"
    }).class.add("lios-card-container");

    const browseCard = featureCardsContainer.colors().featureCard({
        background: "var(--white)",
        svg: "/assets/illustrations/Browse-Palettes.svg",
        title: "Browse Colors",
        desc: "Browse beautiful handpicked colors which are updated regularly, either via scrolling or direct search. You can also utilize the shades filter if you have something specific in you mind."
    });

    const generateCard = featureCardsContainer.colors().featureCard({
        background: "var(--white)",
        svg: "/assets/illustrations/Generate-palettes.svg",
        title: "Generate Palettes",
        desc: "While browsing you can generate a color palette from the list, or can visit the generate-palette page to generate color palette from any color in hex format."
    });

    const saveCard = featureCardsContainer.colors().featureCard({
        background: "var(--white)",
        svg: "/assets/illustrations/Save-Palettes.svg",
        title: "Save Palettes",
        desc: "Liked a color, or generated an awesome palette you wanna save. You can save colors and colors palettes to your LiOS Account."
    });

    const bottomPadding = home.child("br").style().set({
        "padding": "20px"
    });

};

const hideLoader = (async () => {
    const loader = document.querySelector(".hero-loader");

    await main();

    loader.parentElement.removeChild(loader);
})();