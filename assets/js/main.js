const inputForm = document.querySelector(`form`);
const inputRadioEncrypt = document.querySelector(`#radio-encrypt`);
const inputRadioDecrypt = document.querySelector(`#radio-decrypt`);
const inputText = document.querySelector(`#input-text`);
const inputKey = document.querySelector(`#input-key`);
const outputText = document.querySelector(`.result`);
const alphabet = [
	`A`,
	`B`,
	`C`,
	`D`,
	`E`,
	`F`,
	`G`,
	`H`,
	`I`,
	`J`,
	`K`,
	`L`,
	`M`,
	`N`,
	`O`,
	`P`,
	`Q`,
	`R`,
	`S`,
	`T`,
	`U`,
	`V`,
	`W`,
	`X`,
	`Y`,
	`Z`,
	`Ä`,
	`Ö`,
	`Ü`,
];

outputText.classList.add(`hidden`);

const convertToArray = (paramString) => Array.from(paramString);

const shiftArray = (
	paramSourceArray,
	paramDestinationArray,
	paramShiftCount
) => {
	let tmpArray = [];
	let shiftedValues = [];
	paramSourceArray.forEach((element) => tmpArray.push(element));
	for (let i = 0; i < paramShiftCount; i++) {
		shiftedValues.push(tmpArray.shift());
	}
	tmpArray.forEach((element) => paramDestinationArray.push(element));
	shiftedValues.forEach((element) => paramDestinationArray.push(element));
};

const unshiftArray = (
	paramSourceArray,
	paramDestinationArray,
	paramShiftCount
) => {
	let tmpArray = [];
	let shiftedValues = [];
	paramSourceArray.forEach((element) => tmpArray.push(element));
	for (let i = 0; i < paramShiftCount; i++) {
		shiftedValues.unshift(tmpArray.pop());
	}
	shiftedValues.forEach((element) => paramDestinationArray.push(element));
	tmpArray.forEach((element) => paramDestinationArray.push(element));
};

const getAlphabetIndex = (paramSourceArray, paramDestinationArray) => {
	paramSourceArray.forEach((element) => {
		if (element === ` `) {
			paramDestinationArray.push(` `);
		} else {
			paramDestinationArray.push(alphabet.indexOf(element.toUpperCase()));
		}
	});
	return;
};

const printOutput = (paramIndexArray, paramShiftedArray) => {
	paramIndexArray.forEach((element) => {
		if (element === ` `) {
			outputText.innerHTML += ` `;
		} else {
			outputText.innerHTML += paramShiftedArray[element];
		}
	});
	outputText.classList.remove(`hidden`);
};

const crypt = (element) => {
	let shiftedArray = [];
	let userInputArray = [];
	let indexArray = [];
	outputText.innerHTML = ``;
	if (inputRadioEncrypt.checked) {
		userInputArray = convertToArray(inputText.value.toUpperCase());
		getAlphabetIndex(userInputArray, indexArray);
		shiftArray(alphabet, shiftedArray, Number(inputKey.value));
		printOutput(indexArray, shiftedArray);
	} else if (inputRadioDecrypt.checked) {
		userInputArray = convertToArray(inputText.value);
		unshiftArray(alphabet, shiftedArray, Number(inputKey.value));
		getAlphabetIndex(userInputArray, indexArray);
		printOutput(indexArray, shiftedArray);
	}
};

inputForm.addEventListener(`submit`, crypt);
