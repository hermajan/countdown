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
    sk: {
        years: ["rok", "roky", "rokov"],
        days: ["deň", "dni", "dní"],
        hours: ["hodina", "hodiny", "hodín"],
        minutes: ["minúta", "minúty", "minút"],
        seconds: ["sekunda", "sekundy", "sekúnd"]
    }
};

function inflection(count, what, lang = "sk") {
    if(count === 1) {
        return words[lang][what][0];
    }
    
    if(count < 5 && count > 0) {
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
    
    const remain = {
        years: Math.floor(difference / year),
        days: Math.floor(difference % year / day),
        hours: Math.floor((difference % day) / hour),
        minutes: Math.floor((difference % hour) / minute),
        seconds: Math.floor((difference % minute) / second)
    };
    
    let lang = "sk";
    if(element.hasAttribute("data-lang")) {
        lang = element.getAttribute("data-lang");
    }
    
    let output = element.getAttribute("data-remains");
    for(let what in remain) {
        let count = remain[what];
        if(count > 0) {
            output += " " + count + " " + inflection(count, what, lang);
        }
    }
    
    let after = element.getAttribute("data-after");
    if(after != null) {
        output += after;
    }
    
    element.innerHTML = output;
    window.setTimeout(function() {
        countdown(element);
    }, second);
}

function startCountdowns() {
    const countdowns = document.getElementsByClassName("countdown");
    for(let i = 0; i < countdowns.length; i++) {
        countdown(countdowns[i]);
    }
}

startCountdowns();

// $.nette.ext("countdowns", {
//     complete: function(payload, status, settings) {
//         startCountdowns();
//     }
// });
