window.addEventListener("DOMContentLoaded", () => {
	const iframeSrc = {
		en: "https://docs.google.com/forms/d/e/1FAIpQLSfznMddDUJ505i2wzPSL6MkJQiyCVmVgGwIp4Lp9QKyGBpOTg/viewform?embedded=true",
		ar: "https://docs.google.com/forms/d/e/1FAIpQLSeej5Rh0JIZu3vnVxwTayr2Nh1SlcxnxmGAWIeoqqA_OpfqDw/viewform?embedded=true",
	};
	document.querySelector("iframe").src = iframeSrc[locale];
});
