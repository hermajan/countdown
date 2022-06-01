const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365.24219;
const words = {
	cs: {
		years: ["rok", "roky", "roků"],
		days: ["den", "dny", "dní"],
		hours: ["hodina", "hodiny", "hodin"],
		minutes: ["minuta", "minuty", "minut"],
		seconds: ["sekunda", "sekundy", "sekund"]
	},
	en: {
		years: ["year", "years", "years"],
		days: ["day", "days", "days"],
		hours: ["hour", "hours", "hours"],
		minutes: ["minute", "minutes", "minutes"],
		seconds: ["second", "seconds", "seconds"]
	},
	sk: {
		years: ["rok", "roky", "rokov"],
		days: ["deň", "dni", "dní"],
		hours: ["hodina", "hodiny", "hodín"],
		minutes: ["minúta", "minúty", "minút"],
		seconds: ["sekunda", "sekundy", "sekúnd"]
	}
};

function inflection(count, what, lang = "en") {
	if(count === 1) {
		return words[lang][what][0];
	}
	
	if(0 < count && count < 5) {
		return words[lang][what][1];
	}
	return words[lang][what][2];
}

function countdown(element) {
	const end = new Date(element.getAttribute("datetime"));
	const now = new Date();
	const difference = end - now;
	
	if(difference < second) {
		element.innerHTML = element.getAttribute("data-ended");
		return;
	}
	
	let output = "";
	if(element.hasAttribute("data-remains")) {
		output += element.getAttribute("data-remains")
	}
	
	const remain = {
		years: Math.floor(difference / year),
		days: Math.floor(difference % year / day),
		hours: Math.floor((difference % day) / hour),
		minutes: Math.floor((difference % hour) / minute),
		seconds: Math.floor((difference % minute) / second)
	};
	
	let lang = "en";
	if(element.hasAttribute("data-lang")) {
		lang = element.getAttribute("data-lang");
	}
	
	for(let what in remain) {
		let count = remain[what];
		if(count > 0) {
			if(element.hasAttribute("data-lang")) {
				output += " " + count + " " + inflection(count, what, lang);
			} else {
				switch(what) {
					case "years":
						output += count + "y ";
						break;
					case "days":
						output += count + "d ";
						break;
					case "hours":
						output += (count < 10 ? "0" : "") + count + ":";
						break;
					case "minutes":
						output += (count < 10 ? "0" : "") + count + ":";
						break;
					case "seconds":
						output += (count < 10 ? "0" : "") + count;
						break;
				}
			}
		}
	}
	
	if(element.hasAttribute("data-after")) {
		output += element.getAttribute("data-after");
	}
	
	element.innerHTML = output;
	window.setTimeout(function() {
		countdown(element);
	}, second);
}

function startCountdowns(className = "countdown") {
	const countdowns = document.getElementsByClassName(className);
	for(let i = 0; i < countdowns.length; i++) {
		countdown(countdowns[i]);
	}
}

//export default { inflection };
