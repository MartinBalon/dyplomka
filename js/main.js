const menuButton = document.querySelector('[data-identifier="hamburger-menu"]');
const closeMenuButton = document.querySelector(
	'[data-identifier="hamburger-menu-close"]'
);
const menu = document.querySelector("nav");
const navBar = document.querySelector('[data-identifier="navbar"]');
const navLinks = document.querySelector('[data-identifier="nav-links"]');

let isMenuActive = false;
let lastScroll = 0;

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
	let scrollPosition = window.pageYOffset;
	if (scrollPosition <= lastScroll) {
		navBar.style.top = "0";
		navBar.classList.add("header-active");
		menuButton.classList.add("hamburger-menu-active");
	} else {
		navBar.style.top = "-20%";
	}
	if (window.pageYOffset <= 50) {
		navBar.classList.remove("header-active");
		menuButton.classList.remove("hamburger-menu-active");
	}
	lastScroll = scrollPosition;
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

menuButton.addEventListener("click", toggleNavigation);
closeMenuButton.addEventListener("click", toggleNavigation);
navLinks.addEventListener("click", toggleNavigation);
window.addEventListener("scroll", showNavBarOnScroll);
