function tabOnClick(el, i) {
	if (el.classList.contains("active")) return;
	document.querySelectorAll(".nav .link").forEach((el) => {
		el.classList.remove("active");
	});
	el.classList.add("active");
	document.querySelector(".tabs").style.setProperty("--on-tab", i);
}

const animOptions = {
	duration: 300,
	easing: "ease",
	fill: "forwards",
};

window.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".thumbnails").forEach((el, i) => {
		const imgs = el.querySelectorAll("img");
		imgs.forEach((img, j) => {
			img.addEventListener("click", () => {
				el.querySelectorAll(".thumbnail").forEach((el) =>
					el.classList.remove("active")
				);
				img.classList.add("active");
				if (window.innerWidth < 768) {
					el.nextElementSibling.querySelector("img").src = img.src;
					const a = el.nextElementSibling.querySelector("a");
					console.log(el.nextElementSibling.querySelector("a"));
					if (a) {
						a.href = img.src;
						a.setAttribute(
							"data-caption",
							window.t[locale][`proj_${i + 1}_${j + 1}`]
						);
					}
					document.querySelector("#fancybox img").src = img.src;
					return;
				}
				const previewRects = document
					.querySelector(".preview")
					.getBoundingClientRect();
				const newImg = document.createElement("img");
				newImg.src = img.src;
				el.querySelectorAll(".anim-in").forEach((el) => removeEl(el));

				newImg.classList.add("anim-in");
				newImg.style.top = `${116 * j}px`;
				el.appendChild(newImg);
				newImg
					.animate(
						[
							{
								insetInlineStart: 0,
								width: "100px",
							},
							{
								insetInlineStart: "124px",
								width: `${previewRects.width}px`,
							},
						],
						animOptions
					)
					.finished.then(() =>
						setTimeout(() => {
							newImg.animate(
								[
									{ height: "100px", top: `${116 * j}px` },
									{
										height: `${previewRects.height}px`,
										top: 0,
									},
								],
								animOptions
							);
							document.getElementById(
								`desc-${i + 1}`
							).textContent =
								window.t[locale][`proj_${i + 1}_${j + 1}`];
						}, 10)
					);
			});
		});
		setTimeout(() => {
			imgs[0].click();
		}, 50);
	});

	setTimeout(() => {
		if (window.innerWidth < 768) {
			document.querySelectorAll(".preview img").forEach((el) => {
				const a = document.createElement("a");
				a.setAttribute("data-fancybox", "");
				el.parentElement.appendChild(a);
				a.appendChild(el);
			});
			Fancybox.bind("[data-fancybox]", {
				//
			});
		}
	}, 250);
});

function removeEl(el) {
	el.animate([{ opacity: 1 }, { opacity: 0 }], animOptions).finished.then(
		() => el.remove()
	);
}
