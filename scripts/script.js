/** Loads an SVG file and replaces the source element with the fetched SVG element.
 * Assumes `element` is an `img` element with a valid `src` attribute pointing to an SVG file.
 * @param {HTMLElement} element - The element to load the SVG into.
 * @returns {void}
 */
function loadSVG(element) {
	if (!element) return;
	fetch(element.src)
		.then((r) => r.body.getReader().read())
		.then((w) => new TextDecoder().decode(w.value))
		.then((s) => {
			let div = document.createElement("div");
			div.innerHTML = s.trim();
			element.classList.forEach((cls) =>
				div.firstElementChild.classList.add(cls)
			);
			element.insertAdjacentElement("afterend", div.firstChild);
			element.remove();
			div.remove();
		})
		.catch((e) => console.error("Failed to load SVG with error: " + e));
}

const locale = window.location.href.match(/\?l=(.+)/)?.[1] || "en";
const otherLocale = locale === "en" ? "ar" : "en";

window.addEventListener("DOMContentLoaded", () => {
	const root = document.querySelector("html");
	root.setAttribute("lang", locale);
	root.setAttribute("dir", { en: "ltr", ar: "rtl" }[locale]);
	document
		.querySelectorAll("#lang-switch")
		.forEach((el) => (el.href = `?l=${otherLocale}`));
	document.querySelectorAll("[aria-label").forEach((el) => {
		el.innerText = window.t[locale][el.getAttribute("aria-label")] ?? "";
	});
	document.querySelectorAll("[href").forEach((el) => {
		if (el.id === "lang-switch") return;
		el.setAttribute("href", el.getAttribute("href") + `?l=${locale}`);
	});
});

function toggleMenu() {
	document.getElementById("menu").classList.toggle("open");
}

console.log(
	` _   _      _ _       
| | | |    | | |      
| |_| | ___| | | ___  
|  _  |/ _ \\ | |/ _ \\ 
| | | |  __/ | | (_) |
\\_| |_/\\___|_|_|\\___/

Website made by Khaleel Jaber
Check me out@
khaleeljaber.com`
);
