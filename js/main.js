const menu = document.querySelector("nav");
const navBar = document.querySelector('[data-identifier="navbar"]');
const navLinks = document.querySelector('[data-identifier="nav-links"]');
const socialIcons = document.querySelector('[data-identifier="social-icons"]');
const accordionButton = document.querySelectorAll(".accordion");
const menuButton = document.querySelector('[data-identifier="hamburger-menu"]');
const closeMenuButton = document.querySelector(
	'[data-identifier="hamburger-menu-close"]'
);

let isMenuActive = false;
let lastScroll = 0;
let linkClicked = false;

const toggleNavigation = () => {
	if (!isMenuActive) {
		menu.classList.add("showNavigation");
		isMenuActive = true;
		animateCloseMenuButton(true);
	} else {
		menu.classList.remove("showNavigation");
		isMenuActive = false;
		animateCloseMenuButton(false);
	}
};

const showNavBarOnScroll = () => {
	const scrollPosition = window.pageYOffset;

	if (scrollPosition <= lastScroll && !linkClicked && !isMenuActive) {
		navBar.style.top = "0";
		navBar.classList.add("navbar-active");
		menuButton.classList.add("hamburger-menu-active");
	} else {
		navBar.style.top = "-20%";
	}
	if (scrollPosition === 0) {
		navBar.style.top = "0";
		navBar.classList.remove("navbar-active");
		menuButton.classList.remove("hamburger-menu-active");
	}

	lastScroll = scrollPosition;
	setTimeout(() => {
		linkClicked = false;
	}, 1000);
};

const animateCloseMenuButton = (startAnimation) => {
	setTimeout(() => {
		if (startAnimation) {
			closeMenuButton.classList.add("hamburger-menu-close-active");
		} else {
			closeMenuButton.classList.remove("hamburger-menu-close-active");
		}
	}, 400);
};

const onNavigateHandler = () => {
	linkClicked = true;
	toggleNavigation();
};

for (let i = 0; i < accordionButton.length; i++) {
	accordionButton[i].addEventListener("click", () => {
		accordionButton[i].classList.toggle("accordion-active");
		const accordionContent = accordionButton[i].nextElementSibling;
		if (accordionContent.style.maxHeight) {
			accordionContent.style.maxHeight = null;
			accordionButton[i].classList.remove("accordion-active");
		} else {
			accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
		}
	});
}

menuButton.addEventListener("click", toggleNavigation);
closeMenuButton.addEventListener("click", toggleNavigation);
navLinks.addEventListener("click", onNavigateHandler);
socialIcons.addEventListener("click", toggleNavigation);
window.addEventListener("scroll", showNavBarOnScroll);

// Fade-in content when scrolling
const elementsToAnimate = document.querySelectorAll(".animate");
const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			entry.target.classList.toggle("show", entry.isIntersecting);
			if (entry.isIntersecting) {
				observer.unobserve(entry.target);
			}
		});
	},
	{
		threshold: 0.1,
	}
);
elementsToAnimate.forEach((element) => {
	observer.observe(element);
});

// Smooth scroll
const scroll = (toElement, speed) => {
	const windowObject = window;
	let windowPosistion = windowObject.pageYOffset;
	const pointer = toElement.getAttribute("href").slice(1);
	const element = document.getElementById(pointer);
	const elementOffset = element.offsetTop;

	const counter = setInterval(() => {
		if (windowPosistion > elementOffset) {
			// from bottom to top
			windowObject.scrollTo(0, windowPosistion);
			windowPosistion -= speed;

			if (windowPosistion <= elementOffset) {
				// scrolling until elemOffset is higher than scrollbar position, cancel interval and set scrollbar to element position
				clearInterval(counter);
				windowObject.scrollTo(0, elementOffset);
			}
		} else {
			// from top to bottom
			windowObject.scrollTo(0, windowPosistion);
			windowPosistion += speed;

			if (windowPosistion >= elementOffset) {
				// scroll until scrollbar is lower than element, cancel interval and set scrollbar to element position
				clearInterval(counter);
				windowObject.scrollTo(0, elementOffset);
			}
		}
	}, 1);
};

const links = document.querySelectorAll('[data-identifier="link"]');

links.forEach((link) => {
	link.addEventListener("click", (event) => {
		scroll(link, 30);
		event.preventDefault();
	});
});
