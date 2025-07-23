// TODO: Fix error of "can't delete Node child because Node has no child"
// TODO: Fix menu can't turn and show menu

const menu = document.getElementById("menu");
const numberElement = document.getElementById("number");
const attemptsElement = document.getElementById("number-attempts");
const guess = document.getElementById("guess");
const form = document.querySelector("form");
const help = document.querySelector(".help");
const popUp = document.querySelector(".pop-up");
const messagePopUp = document.querySelector(".message");
const sections = document.querySelector(".sections");
const container = document.querySelector(".container");
const suggestionsElement = document.querySelector(".suggestions");

let randomNumber;
let attempts = 10;
let numberGuessed;
let suggestions = [];
let PopUpAnimationTime = 8900;
let ShakingAnimationTime = 500;

const reset = () => {
	randomNumber = Math.ceil(Math.random() * 100);
	numberElement.textContent = "";
	attempts = 10;
	attemptsElement.textContent = attempts;
	guess.removeAttribute("readonly", "true");
	guess.value = "";
	help.textContent = "";
	suggestionsElement.textContent = "";
	suggestions = [];
	menu.addEventListener("click", () => {
		menu.classList.toggle("rotate");
		if (menu.classList.value === "rotate") {
			sections.classList.add("show-sections");
		} else {
			sections.classList.remove("show-sections");
		}
	});
};
const attemptsDown = () => {
	attempts--;
	attemptsElement.textContent = attempts;
};
const activatePopUp = (message) => {
	setTimeout(() => {
		popUp.classList.remove("show-pop-up");
		document.body.style.opacity = "1";
		guess.removeAttribute("readonly", "true");
	}, PopUpAnimationTime + 100);
	popUp.classList.add("show-pop-up");
	document.body.style.opacity = ".7";
	messagePopUp.textContent = message;
	guess.setAttribute("readonly", "true");
};
const createNewGame = () => {
	setTimeout(() => {
		const newGame = container.appendChild(document.createElement("button"));
		newGame.setAttribute("id", "new-game");
		newGame.textContent = "New Game";
		guess.setAttribute("readonly", "true");
		if (container.childElementCount === 2) {
			container.removeChild(container.childNodes[1]);
		}
	}, PopUpAnimationTime + 100);
	setTimeout(() => {
		const newGameButton = document.getElementById("new-game");
		newGameButton.addEventListener("click", () => {
			container.removeChild(newGameButton);
			reset();
		});
	}, PopUpAnimationTime + 200);
};
const showSuggestions = () => {
	suggestionsElement.textContent = "Your suggestions : ";
	suggestions.forEach((suggestion, index) => {
		if (suggestions.length === index + 1) {
			suggestionsElement.textContent += suggestion;
		} else {
			suggestionsElement.textContent += suggestion + " - ";
		}
	});
};

const shakeAnimation = () => {
	guess.classList.add("shaking");
	setTimeout(() => {
		guess.classList.remove("shaking");
	}, ShakingAnimationTime + 10);
};

reset();

guess.addEventListener("input", (e) => {
	numberGuessed = e.target.value;
});

form.addEventListener("submit", (e) => {
	if (guess.getAttribute("readonly") === "true") {
		e.preventDefault();
	} else {
		e.preventDefault();
		if (numberGuessed.match(/\d/gm) && numberGuessed <= 100) {
			suggestions.push(Number(numberGuessed));
			if (numberGuessed == randomNumber) {
				attemptsDown();
				numberElement.textContent = randomNumber;
				help.textContent = "";
				activatePopUp("That's correct");
				createNewGame();
				showSuggestions();
			} else {
				attemptsDown();
				shakeAnimation();
				activatePopUp("That's not correct");
				if (numberGuessed > randomNumber) help.textContent = "Less please!";
				if (numberGuessed < randomNumber) help.textContent = "Bigger please!";
			}
		} else {
			activatePopUp("You can't do that!!");
		}
		if (attempts === 0 || (attempts === 0 && numberGuessed == randomNumber)) {
			activatePopUp("You lose, your attempts are gone!");
			createNewGame();
			numberElement.textContent = randomNumber;
			help.textContent = "";
			showSuggestions();
		}
		if (attempts === 0) {
			activatePopUp("You lose, your attempts are gone!");
		}
		if (numberGuessed == randomNumber) {
			activatePopUp("That's correct");
		}
	}
});
