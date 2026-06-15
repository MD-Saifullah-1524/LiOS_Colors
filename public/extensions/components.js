import { colorConvertor } from "../assets/js/tools/colorConvertor.js";
import { webUtils } from "../LiOS-Web-Utils/liosWebUtils.js";
export const components = {
    method: function () {
        this.paletteButton = function (value) {
            const button = this.child("div").class.add("palettes-button");
            const colorValue = button.child("div").class.add("palettes-color-value").child("span").text(value);
            const svgButton = button.child("div").class.add("palettes-copy-button", "copy-hex").svg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-icon lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`);
            button.on("click", () => {
                webUtils.text.copy(value);
                svgButton.getElement().innerHTML = "";
                svgButton.svg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-check-icon lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`);
                setTimeout(() => {
                    svgButton.getElement().innerHTML = "";
                    svgButton.svg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-icon lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`);
                }, 500)
            })
            return button;
        };
        this.palette = function (name, hex) {
            const hsl = colorConvertor.hsl(hex).toString();
            const srgb = colorConvertor.srgb(hex).toString();
            const oklch = colorConvertor.oklch(hex).toString();
            const translucentColor = `var(${hex.replace("#", "--")})`;

            const palette = this.child("div").class.add("color-palette", "lios-frosted-glass", "lios-card");
            const colorCard = palette.child("div").class.add("palette-color").style().set({
                "background": hex,
                "border": `2px inset ${hex}`
            });
            const colorName = palette.child("div").class.add("lios-card-title").child("span").text(name);

            const buttonsContainer = palette.child("div").class.add("palettes-button-container")
            buttonsContainer.colors().paletteButton(hex);
            buttonsContainer.colors().paletteButton(`hsl(${hsl})`);
            buttonsContainer.colors().paletteButton(`srgb(${srgb})`);
            buttonsContainer.colors().paletteButton(`oklch(${oklch})`);
            buttonsContainer.colors().paletteButton(translucentColor);

            palette.child("br");

            const ctaContainer = palette.components().buttonGroup().style().set({
                "color": "var(--black)"
            });
            
            if (navigator.share) {
                const shareColor = ctaContainer.components().button("a").text("Share").on("click", async () => {
                    await navigator.share({
                        title: name,
                        text: "Checkout this color",
                        url: `https://colors.liosorg.com/browse/?name=${encodeURIComponent(name)}`
                    });
                });
            };
            const generatePalette = ctaContainer.components().button("a").text("Generate Palettes").href(`/generate-palette/?hex=${encodeURIComponent(hex)}`);
            // const saveColor = ctaContainer.components().button("a").text("Save").on("click", async () => {
            //     console.warn("Feature yet to be implemented");
            // });

            return palette;
        };
        this.shadeButton = function (value) {
            const button = this.child("div").style().set({
                "display": "inline-flex",
                "width": "50px",
                "height": "50px",
                "border-width": "2px",
                "border-style": "inset",
                "background": value,
                "border-radius": "100vh",
                "cursor": "pointer"
            }).class.add("shades-button");
            button.on("click", () => {
                button.parent().getElement().querySelectorAll(".active").forEach((button) => {
                    button.classList.remove("active")
                })
                if (!button.getElement().classList.contains("active")) {
                    button.class.add("active");
                }
            });
            return button;
        };
        this.featureCard = function (values) {
            const card = this.child("div").style().set({
                "background": values.background,
                "border": `2px inset ${values.background}`,
                "border-radius": "5px",
                "width": "300px",
                "place-items": "center",
                "display": "flex",
                "flex-direction": "column",
                "justify-content": "center",
                "padding": "5px"
            }).class.add("lios-card");

            const illustration = card.child("img").src(values.svg).style().set({
                "size": "1/1",
                "width": "200px",
                "justify-self": "center",
                "padding": "5px",
                "diplay": "flex"
            }).style().set({
                "display": "flex",
                "align-self": "center",
                "justify-self": "center"
            });
            card.child("br");
            const title = card.child("h3").text(values.title)
            const desc = card.child("p").text(values.desc).style().set({
                "color": "var(--black)"
            });
            return card;
        }
        return this;
    },
    metadata: {
        name: "Components for LiOS-Colors",
        version: "1.2.0",
        versionCode: 3,
        api: {
            min: 2,
            max: 3
        },
        capabilities: {
            addsMethods: true,
            overridesMethods: false,
            addsProperties: true
        }
    }
};