const menuButton = document.querySelector('[data-identifier="hamburger-menu"]');
const closeMenuButton = document.querySelector(
	'[data-identifier="hamburger-menu-close"]'
);
const menu = document.querySelector("nav");
const navBar = document.querySelector('[data-identifier="navbar"]');
const navLinks = document.querySelector('[data-identifier="nav-links"]');
const socialIcons = document.querySelector('[data-identifier="social-icons"]');
const accordionButton = document.querySelectorAll(".accordion");

let isMenuActive = false;
let lastScroll = 0;
let linkClicked = false;

const toggleNavigation = () => {
	if (!isMenuActive) {
		menu.style.transform = "translate(0%)";
		isMenuActive = true;
		document.body.style.overflow = "hidden";
		animateCloseMenuButton(true);
	} else {
		menu.style.transform = "translate(100%)";
		isMenuActive = false;
		document.body.style.overflow = "auto";
		animateCloseMenuButton(false);
	}
};

const showNavBarOnScroll = () => {
	const scrollPosition = window.pageYOffset;

	if (scrollPosition <= lastScroll && !linkClicked) {
		navBar.style.top = "0";
		navBar.classList.add("header-active");
		menuButton.classList.add("hamburger-menu-active");
	} else {
		navBar.style.top = "-20%";
	}
	if (scrollPosition === 0) {
		navBar.style.top = "0";
		navBar.classList.remove("header-active");
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
