const showMoreTestimonialsBtn = document.querySelector(
	"#testimonials > .button-wrapper"
);

const options = {
	testimonialsToShow: 4,
	maxChars: 400,
};

const testimonialsArray = [
	{
		id: 1,
		content: `Moc děkuji JUDr. Anetě Schwarzové za pomoc a konzultaci mé diplomové práce. 
			Bez jejich užitečných rad bych nebyl schopen odevzdat takto kvalitní diplomovou práci. 
			Díky paní doktorce jsem se naučil psát závěrečné práce a pracovat s textem. 
			Nabyté zkušenosti v současné době využívám ve své právní praxi.`,
		author:
			"Mgr. Marek Šindelář, ZČU FPR (Fakulta právnická Západočeské univerzity v Plzni)",
	},
	{
		id: 2,
		content: `Paní doktorku Schwarzovou jsem,
			přes společného známého, požádala o radu ohledně mé bakalářské práce
			a bylo to to nejlepší rozhodnutí, které jsem mohla učinit. Díky naší
			spolupráci jsem se naučila jinak psát - dříve byly mé texty
			nesouvislé, skákala jsem od myšlenky k myšlence, nedokázala jsem ani
			správně napsat úvod &#40;a to jsem četla několik návodů, jak na
			to&#41;. Jedním z největších přínosů této spolupráce, ze kterého
			těžím dodnes, bylo, že mě paní doktorka naučila citovat. Citování mi
			dělalo vždycky velký problém i přes různé aplikace dostupné na
			internetu. Nebýt paní doktorky, nejspíš bych práci ani neodevzdala
			včas. Stala se moji druhou vedoucí. Nejen že odpovídala velmi rychle
			na e-maily, ale když bylo potřeba, tak jsme se spojily přes Skype a
			daný problém prodiskutovaly. Den před obhajobou jsme se spojily přes
			Skype a celou obhajobu si prošly na nečisto, což mi výrazně pomohlo
			a druhý den jsem šla na obhajobu s pocitem klidu a jistoty. Díky
			paní doktorce jsem svou práci dopsala velmi rychle a v konečném
			výsledku za 1. Celkově hodnotím spolupráci velmi kladně a plánuji se
			s paní doktorkou opět spojit v souvislosti s diplomovou prací.`,
		author: "Bc. Evelina Lošanová, Vysoká škola ekonomická v Praze",
	},
	{
		id: 3,
		content: `Lorem ipsum dolor sit amet,
		consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
		exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat.`,
		author: "Lorem Ipsum, lorem ipsum",
	},
	{
		id: 4,
		content: `Lorem ipsum dolor sit amet,
		consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
		exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat.`,
		author: "Lorem Ipsum, lorem ipsum",
	},
	{
		id: 5,
		content: `Lorem ipsum dolor sit amet,
		consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
		labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
		exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat.`,
		author: "Lorem Ipsum, lorem ipsum",
	},
];

const generateTestimonialModal = (id) => {
	const testimonial = testimonialsArray.find(
		(testiminial) => testiminial.id === id
	);

	return `
		<p>${testimonial.content}</p>
		<p class="testimonial-author">${testimonial.author}</p>
	`;
};

const showTestimonial = (testimonialId) => {
	const testimonialModalContent = generateTestimonialModal(testimonialId);
	const testimonialModal = document.querySelector(".testimonial-modal");
	const testimonialModalButton = document.querySelector(
		".testimonial-modal > button"
	);
	const testimonialModalInner = document.querySelector(
		".testimonial-modal > div"
	);

	testimonialModal.style.display = "block";
	testimonialModalInner.insertAdjacentHTML(
		"beforeend",
		testimonialModalContent
	);

	testimonialModalButton.addEventListener("click", () => {
		testimonialModalInner.innerHTML = "";
		testimonialModal.style.display = "none";
	});
};

const generateTestimonial = (id, content, author, hidden) => {
	let adjustedContent = content.trim();
	let longContent = false;

	if (adjustedContent.length > options.maxChars) {
		adjustedContent = `${adjustedContent.substr(0, options.maxChars)}...`;
		longContent = true;
	}

	return `<div class="col animate testimonial ${
		hidden ? "hidden" : ""
	}" id="testimonial-${id}">
		<p>
			<span class="quotes">&#8220;</span>${adjustedContent}<span class="quotes">&#8220;</span>
		</p>
		<button class="show-testimonial" 
		data-identifier="show-rest-${id}"
		style="display: ${longContent ? "block" : "none"}"
		onClick="showTestimonial(${id})"
		>Zobrazit Celé Hodnocení</button>
		<p class="testimonial-author">${author}</p>
	</div>`;
};

const sortedTestimonials = testimonialsArray.sort((a, b) => a.id - b.id);

sortedTestimonials.forEach((testimonial, index) => {
	const hidden = index < options.testimonialsToShow ? false : true;

	if (hidden) {
		showMoreTestimonialsBtn.classList.remove("hidden");
	}

	const testimonialsContainer = document
		.querySelector("#testimonials")
		.querySelector("h2");

	const generatedTestimonial = generateTestimonial(
		testimonial.id,
		testimonial.content,
		testimonial.author,
		hidden
	);

	if (index > 0) {
		const previousTestimonial = document.getElementById(`testimonial-${index}`);
		previousTestimonial.insertAdjacentHTML("afterend", generatedTestimonial);
	} else {
		testimonialsContainer.insertAdjacentHTML("afterend", generatedTestimonial);
	}
});
