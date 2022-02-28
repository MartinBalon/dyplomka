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
	let windowPosition = windowObject.pageYOffset;
	const header = document.getElementById("home");
	const headerHeight = header.clientHeight;
	const pointer = toElement.getAttribute("href").slice(1);
	const element = document.getElementById(pointer);
	let elementOffset;

	// z-index & position relative of wrapper and header causes wrong offset of elements
	// thus inaccurate scrolling - add height od header to each non-home destination to counter this
	if (pointer === "home") {
		elementOffset = element.offsetTop;
	} else {
		elementOffset = element.offsetTop + headerHeight;
	}

	const counter = setInterval(() => {
		if (windowPosition > elementOffset) {
			// from bottom to top
			windowObject.scrollTo(0, windowPosition);
			windowPosition -= speed;

			if (windowPosition <= elementOffset) {
				// scrolling until elemOffset is higher than scrollbar position, cancel interval and set scrollbar to element position
				clearInterval(counter);
				windowObject.scrollTo(0, elementOffset);
			}
		} else {
			// from top to bottom
			windowObject.scrollTo(0, windowPosition);
			windowPosition += speed;

			if (windowPosition >= elementOffset) {
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

// Parallax
window.addEventListener("scroll", function () {
	const distance = window.scrollY;
	document.querySelector("header").style.transform = `translateY(${
		distance * 0.8
	}px)`;
	document.querySelector("#home > div").style.transform = `translateY(${
		distance * -0.6
	}px)`;
});

// testimonials
const testimonialsButton = document.querySelector(
	'[data-identifier="testimonials-button"]'
);
const testimonials = document.querySelectorAll(".testimonial");

testimonialsButton.addEventListener("click", () => {
	testimonials.forEach((testimonial) => {
		if (testimonial.classList.contains("hidden")) {
			testimonial.classList.remove("hidden");
		}
	});
	testimonialsButton.remove();
});

// highlight active nav link
const navLinksArray = document.querySelectorAll(".nav-links > a");
const pageSections = [];
const navItems = {};

navLinksArray.forEach((link) => {
	const pageSectionName = link.hash.substring(1);
	const sectionElement = document.getElementById(pageSectionName);
	const sectionElementRect = sectionElement.getBoundingClientRect();
	const navigationElement = document.getElementById(`nav-${pageSectionName}`);
	pageSections.push({
		elementName: `${pageSectionName}`,
		position: sectionElementRect.top,
	});
	navItems[`${pageSectionName}`] = navigationElement;
});

const updateActiveNavLink = (link) => {
	const navItem = navItems[link];
	navItem.classList.add("active");
	Object.values(navItems).forEach((item) => {
		if (item != navItem) {
			item.classList.remove("active");
		}
	});
};

window.addEventListener("scroll", () => {
	const deviceHeight = window.innerHeight;
	const threshold = deviceHeight / 3;
	const scrollPosition = window.scrollY + threshold;

	for (let i = 0; i < pageSections.length; i++) {
		if (
			pageSections[i + 1] &&
			scrollPosition >= pageSections[i].position &&
			scrollPosition < pageSections[i + 1].position
		) {
			updateActiveNavLink(pageSections[i].elementName);
		} else if (
			scrollPosition + deviceHeight / 2 >=
			pageSections[pageSections.length - 1].position
		) {
			updateActiveNavLink(pageSections[i].elementName);
		}
	}
});
