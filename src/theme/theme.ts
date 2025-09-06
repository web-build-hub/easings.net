import { getElement } from "../helpers/getElement";

const selectorThemeSelect = ".footer__theme";
const themeSelect = getElement<HTMLSelectElement>(selectorThemeSelect);

const classLightTheme = "is-light";
const classDarkTheme = "is-dark";

const storageThemeKey = "theme";

if (typeof localStorage.getItem(storageThemeKey) === "string") {
	const theme = localStorage.getItem(storageThemeKey);
	themeSelect.value = theme;
	changeTheme(theme);
}

themeSelect.addEventListener("change", () => {
	localStorage.setItem(storageThemeKey, themeSelect.value);
	changeTheme(themeSelect.value);
});

function check(): void {
	if (document.body.classList.contains("vscode-dark")) {
		changeTheme("dark");
	} else if (document.body.classList.contains("vscode-light")) {
		changeTheme("light");
	} else {
		changeTheme("");
	}
}
check();
const observer = new MutationObserver(check);
observer.observe(document.body, {
	attributes: true,
	attributeFilter: ["class"],
});

function changeTheme(value: string): void {
	switch (value) {
		case "light":
			document.documentElement.classList.remove(classDarkTheme);
			document.documentElement.classList.add(classLightTheme);
			break;

		case "dark":
			document.documentElement.classList.remove(classLightTheme);
			document.documentElement.classList.add(classDarkTheme);
			break;

		default:
			document.documentElement.classList.remove(
				classLightTheme,
				classDarkTheme
			);
	}
}
