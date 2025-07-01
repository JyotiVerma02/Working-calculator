document.addEventListener("DOMContentLoaded", function () {
	// HTML Elements
	const scientificButtonsContainer = document.getElementById("scientific-buttons");
	const numericButtonsContainer = document.getElementById("numeric-buttons");

	const outputOperationElement = document.querySelector(".operation");
	// outputOperationElement.innerHTML = "0"; // Initialize with 0
	const outputResultElement = document.querySelector(".result");
	// outputResultElement.innerHTML = "0"; // Initialize with 0


	// Mode Switching
	let SCIENTIFIC_MODE = true;
	const scientificMode = document.querySelector(".scientific");
	const normalMode = document.querySelector(".normal");

	scientificMode.classList.add("active-calc");
	scientificMode.addEventListener("click", () => toggleMode(true));
	normalMode.addEventListener("click", () => toggleMode(false));

	// Angle Unit
	let RADIAN = true;

	// Operators
	const OPERATIONS = ["+", "-", "*", "/"];
	const POWER = "POWER(";
	const FACTORIAL = "FACTORIAL(";

	// State
	let ans = 0;
	let data = {
		operation: [],
		formula: [],
	};

	// Calculator Button Configuration
	const calculator_buttons = [
		{ name: "rad", symbol: "Rad", formula: false, type: "key" },
		{ name: "deg", symbol: "Deg", formula: false, type: "key" },
		{ name: "cube", symbol: "x³", formula: POWER, type: "math_function" },
		{ name: "cube-root", symbol: "∛", formula: "Math.cbrt", type: "math_function" },
		{ name: "x-inverse", symbol: "x⁻¹", formula: POWER, type: "math_function" },
		{ name: "quad", symbol: "x⁴", formula: POWER, type: "math_function" },
		{ name: "factorial", symbol: "×!", formula: FACTORIAL, type: "math_function" },
		{ name: "square-root", symbol: "√", formula: "Math.sqrt", type: "math_function" },
		{ name: "pi", symbol: "π", formula: "Math.PI", type: "number" },
		{ name: "cos", symbol: "cos", formula: "trigo(Math.cos,", type: "trigo_function" },
		{ name: "sin", symbol: "sin", formula: "trigo(Math.sin,", type: "trigo_function" },
		{ name: "tan", symbol: "tan", formula: "trigo(Math.tan,", type: "trigo_function" },
		{ name: "square", symbol: "x²", formula: POWER, type: "math_function" },
		{ name: "log", symbol: "log", formula: "Math.log10", type: "math_function" },
		{ name: "ln", symbol: "ln", formula: "Math.log", type: "math_function" },
		{ name: "acos", symbol: "acos", formula: "inv_trigo(Math.acos,", type: "trigo_function" },
		{ name: "asin", symbol: "asin", formula: "inv_trigo(Math.asin,", type: "trigo_function" },
		{ name: "atan", symbol: "atan", formula: "inv_trigo(Math.atan,", type: "trigo_function" },


		{ name: "[", symbol: "[", formula: "Math.[", type: "math_function" },
		{ name: "]", symbol: "]", formula: "Math.]", type: "math_function" },
		{ name: "{", symbol: "{", formula: "Math.{", type: "math_function" },
		{ name: "}", symbol: "}", formula: "Math.}", type: "math_function" },
		{ name: "open-parenthesis", symbol: "(", formula: "(", type: "number" },
		{ name: "close-parenthesis", symbol: ")", formula: ")", type: "number" },
		{ name: "power", symbol: "x<span>y</span>", formula: POWER, type: "math_function" },
		{ name: "e", symbol: "e", formula: "Math.E", type: "number" },

		{ name: "ceil", symbol: "⌈x⌉", formula: "Math.ceil", type: "math_function" },
		{ name: "floor", symbol: "⌊x⌋", formula: "Math.floor", type: "math_function" },
		{ name: "exp", symbol: "exp", formula: "Math.exp", type: "math_function" },
		{ name: "ANS", symbol: "ANS", formula: "ans", type: "number" },
		{ name: "7", symbol: 7, formula: 7, type: "number" },
		{ name: "8", symbol: 8, formula: 8, type: "number" },
		{ name: "9", symbol: 9, formula: 9, type: "number" },
		{ name: "delete", symbol: "⌫", formula: false, type: "key" },
		{ name: "clear", symbol: "C", formula: false, type: "key" },
		{ name: "4", symbol: 4, formula: 4, type: "number" },
		{ name: "5", symbol: 5, formula: 5, type: "number" },
		{ name: "6", symbol: 6, formula: 6, type: "number" },
		{ name: "multiplication", symbol: "×", formula: "*", type: "operator" },
		{ name: "division", symbol: "÷", formula: "/", type: "operator" },
		{ name: "1", symbol: 1, formula: 1, type: "number" },
		{ name: "2", symbol: 2, formula: 2, type: "number" },
		{ name: "3", symbol: 3, formula: 3, type: "number" },
		{ name: "addition", symbol: "+", formula: "+", type: "operator" },
		{ name: "subtraction", symbol: "–", formula: "-", type: "operator" },
		{ name: "0", symbol: 0, formula: 0, type: "number" },
		{ name: "comma", symbol: ".", formula: ".", type: "number" },
		{ name: "percent", symbol: "%", formula: "/100", type: "number" },
		{ name: "calculate", symbol: "=", formula: "=", type: "calculate" },
	];

	function createCalculatorBtns() {
		calculator_buttons.forEach((button) => {
			const buttonEl = document.createElement("button");
			buttonEl.id = button.name;

			if (typeof button.symbol === "string" && button.symbol.includes("<span")) {
				buttonEl.innerHTML = button.symbol;
			} else {
				buttonEl.textContent = button.symbol;
			}

			const isDigit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "comma", "percent"].includes(button.name);
			if (isDigit) buttonEl.classList.add("number");

			const isScientific =
				button.type === "math_function" ||
				button.type === "trigo_function" ||
				["rad", "deg", "ANS", "e", "pi", "open-parenthesis", "close-parenthesis", "exp"].includes(button.name);

			if (isScientific) {
				buttonEl.classList.add("advance-key");
				scientificButtonsContainer.appendChild(buttonEl);
			} else {
				numericButtonsContainer.appendChild(buttonEl);
			}


			if (button.name === "0") {

			}

		});
	}

	createCalculatorBtns();

	const radBtn = document.getElementById("rad");
	const degBtn = document.getElementById("deg");

	if (radBtn && degBtn) {
		radBtn.classList.add("active-angle");

		radBtn.addEventListener("click", () => {
			RADIAN = true;
			radBtn.classList.add("active-angle");
			degBtn.classList.remove("active-angle");
		});

		degBtn.addEventListener("click", () => {
			RADIAN = false;
			radBtn.classList.remove("active-angle");
			degBtn.classList.add("active-angle");
		});
	}

	function toggleMode(isScientific) {
		SCIENTIFIC_MODE = isScientific;
		scientificMode.classList.toggle("active-calc", isScientific);
		normalMode.classList.toggle("active-calc", !isScientific);
		disableAdvanceKey();
	}

	// function disableAdvanceKey() {
	// 	const buttons = document.querySelectorAll(".advance-key"); 
	// 	buttons.forEach(btn => {
	// 		btn.disabled = !SCIENTIFIC_MODE;
	// 	});
	// 	data.operation = [];
	// 	data.formula = [];
	// 	updateOutputOperation();
	// 	updateOutputResult();
	// }
	function disableAdvanceKey() {
		const buttons = document.querySelectorAll(".advance-key");
		buttons.forEach(btn => {
			btn.disabled = !SCIENTIFIC_MODE;
		});

		data.operation = [];
		data.formula = [];

		updateOutputOperation("0"); // Reset to 0 instead of undefined
		updateOutputResult("0");     // Clear result field
	}







	[numericButtonsContainer, scientificButtonsContainer].forEach(container => {
		container.addEventListener("click", (e) => {
			const target = e.target;
			calculator_buttons.forEach(button => {
				if (button.name === target.id) {
					calculator(button);
				}
			});
		});
	});

	// function calculator(button) {
	// 	if (button.type === "number" || button.type === "operator") {

	// 		data.operation.push(button.symbol);
	// 		data.formula.push(button.formula);
	// 	}


	// 	else if (button.type === "trigo_function") {
	// 		data.operation.push(button.symbol + "(");
	// 		data.formula.push(button.formula);
	// 	} else if (button.type === "math_function") {
	// 		handleMathFunction(button);
	// 	} else if (button.type === "key") {
	// 		handleSpecialKey(button);
	// 	} else if (button.type === "calculate") {
	// 		evaluateExpression();
	// 	}
	// 	updateOutputOperation(data.operation.join(""));
	// }

	function calculator(button) {
		// If starting a new expression after evaluation, clear operation
		// if (data.formula.length === 0 && button.type !== "calculate" && button.type !== "key") {
		// 	data.operation = [];
		// }
		const lastFormulaItem = data.formula[data.formula.length - 1];

		// Determine if we need to insert implicit multiplication

		const isImplicitMultiplicationNeeded =
			lastFormulaItem &&
			(
				lastFormulaItem === "Math.PI" ||
				lastFormulaItem === "Math.E" ||
				lastFormulaItem === "ans" ||
				lastFormulaItem === ")" ||
				button.name === "open-parenthesis" ||
				button.type === "math_function" ||
				button.type === "trigo_function"
			) &&
			(
				button.name === "open-parenthesis" ||
				button.type === "math_function" ||
				button.type === "trigo_function" ||
				button.name === "pi" ||
				button.name === "e" ||
				button.name === "ANS"
			);

		// ✅ Insert multiplication if needed
		if (isImplicitMultiplicationNeeded) {
			data.operation.push("×");
			data.formula.push("*");
		}

		// Add actual button value
		if (button.type === "number" || button.type === "operator") {
			data.operation.push(button.symbol);
			data.formula.push(button.formula);
		} else if (button.type === "trigo_function") {
			data.operation.push(button.symbol + "(");
			data.formula.push(button.formula);
		} else if (button.type === "math_function") {
			handleMathFunction(button);
		} else if (button.type === "key") {
			handleSpecialKey(button);
			if (button.name === "clear") return;
		} else if (button.type === "calculate") {
			evaluateExpression();
		}

		updateOutputOperation(data.operation.join(""));
	}





	function handleMathFunction(button) {
		if (button.name === "factorial") {
			data.operation.push("!");
			data.formula.push(FACTORIAL);
		} else if (["power", "square", "cube", "quad", "x-inverse"].includes(button.name)) {
			const powers = { square: 2, cube: 3, quad: 4, "x-inverse": -1 };
			showPowerOnUi(data, button.formula, powers[button.name] || 0);
		} else {
			data.operation.push(button.symbol + "(");
			data.formula.push(button.formula + "(");
		}
	}



	function handleSpecialKey(button) {
		switch (button.name) {
			case "clear":
				data.operation = [];
				data.formula = [];
				updateOutputOperation("0");
				updateOutputResult("0");


				break;
			case "delete":
				data.operation.pop();
				data.formula.pop();
				break;
		}
	}

	// function showPowerOnUi(data, formula, num) {
	// 	data.operation.push("^(");
	// 	data.formula.push(formula);
	// 	data.operation.push(num);
	// 	data.formula.push(num);
	// }

	// function showPowerOnUi(data, formula, num) {
	// 	// Just push POWER to formula, but don’t mix up *
	// 	data.operation.push("^(");
	// 	data.formula.push(POWER);
	// 	data.operation.push(num);
	// 	data.formula.push(num);
	// }

	function showPowerOnUi(data, formula, num) {
		const baseOperation = [];
		const baseFormula = [];
		let i = data.formula.length - 1;
		let count = 0;

		// Collect the base
		while (i >= 0) {
			const token = data.formula[i];
			if (token === ")") count++;
			if (token === "(") count--;
			if (count < 0 || (OPERATIONS.includes(token) && count === 0) || token === POWER) break;

			baseOperation.unshift(data.operation[i]);
			baseFormula.unshift(data.formula[i]);

			data.operation.pop();
			data.formula.pop();
			i--;
		}

		const baseOpStr = baseOperation.join("");
		const baseFormulaStr = baseFormula.join("");

		// Final power display (for operation only)
		data.operation.push(baseOpStr + "^(" + num + ")");

		// Final formula to evaluate
		data.formula.push(`Math.pow(${baseFormulaStr},${num})`);
	}


	// function evaluateExpression() {
	// 	let formulaStr = data.formula.join("");
	// 	const powerResults = search(data.formula, POWER);
	// 	const factorialResults = search(data.formula, FACTORIAL);

	// 	const bases = powerBaseGetter(data.formula, powerResults);
	// 	bases.forEach(base => {
	// 		formulaStr = formulaStr.replace(base + POWER, `Math.pow(${base},`);
	// 	});

	// 	const factNumbers = factorialNumGetter(data.formula, factorialResults);
	// 	factNumbers.forEach(obj => {
	// 		formulaStr = formulaStr.replace(obj.toReplace, obj.replacement);
	// 	});

	// 	try {
	// 		// let result = eval(formulaStr);
	// 		// ans = result;
	// 		// data.operation = [result];
	// 		// data.formula = [result];
	// 		// updateOutputResult(result);

	// 		let result = eval(formulaStr);
	// 		ans = result;


	// 		updateOutputResult(result);


	// 		data.operation = [];
	// 		data.formula = [];
	// 	} catch {
	// 		updateOutputResult("Syntax Error!");
	// 	}
	// }





	function evaluateExpression() {
		let formulaStr = data.formula.join("");
		const powerResults = search(data.formula, POWER);
		const factorialResults = search(data.formula, FACTORIAL);

		const bases = powerBaseGetter(data.formula, powerResults);
		bases.forEach(base => {
			if (base.endsWith("*")) base = base.slice(0, -1);
			formulaStr = formulaStr.replace(base + POWER, `Math.pow(${base},`);
		});

		const factNumbers = factorialNumGetter(data.formula, factorialResults);
		factNumbers.forEach(obj => {
			formulaStr = formulaStr.replace(obj.toReplace, obj.replacement);
		});

		try {
			const currentOperation = data.operation.join("");
			let result = eval(formulaStr);
			if (isNaN(result) || !isFinite(result)) {
				updateOutputResult("Error");
				return;
			}
			ans = result;
			updateOutputOperation(currentOperation);
			updateOutputResult("= " + result);

			// Retain result for further calculations
			// data.operation = [];
			data.formula = [];
		} catch {
			updateOutputResult("Syntax Error!");
		}
	}


	function powerBaseGetter(formula, indexes) {
		return indexes.map(index => {
			let base = [], i = index - 1, count = 0;
			while (i >= 0) {
				if (formula[i] === "(") count--;
				if (formula[i] === ")") count++;
				if ((OPERATIONS.includes(formula[i]) && count === 0) || formula[i] === POWER) break;
				base.unshift(formula[i]);
				i--;
			}
			return base.join("");
		});
	}

	function factorialNumGetter(formula, indexes) {
		let result = [], factSequence = 0;
		indexes.forEach(index => {
			if (formula[index + 1] === FACTORIAL) {
				factSequence++; return;
			}
			let prev = index - factSequence - 1, number = [], count = 0;
			while (prev >= 0) {
				if (formula[prev] === "(") count--;
				if (formula[prev] === ")") count++;
				if (OPERATIONS.includes(formula[prev]) && count === 0) break;
				number.unshift(formula[prev]);
				prev--;
			}
			let str = number.join(""), times = factSequence + 1;
			result.push({
				toReplace: str + FACTORIAL.repeat(times),
				replacement: "factorial(".repeat(times) + str + ")".repeat(times),
			});
			factSequence = 0;
		});
		return result;
	}

	function search(arr, keyword) {
		return arr.map((item, i) => (item === keyword ? i : -1)).filter(i => i !== -1);
	}

	function updateOutputOperation(str = "0") {
		outputOperationElement.innerHTML = str;
		console.log('String : ', str);
	}
	function updateOutputResult(result = "0") {
		outputResultElement.innerHTML = result;
		console.log('Result : ', result);

	}

	function trigo(fn, angle) {
		if (!RADIAN) angle = angle * Math.PI / 180;
		return fn(angle);
	}
	// function inv_trigo(fn, value) {
	// 	if (["acos", "asin"].includes(fn.name) && (value < -1 || value > 1)) {
	// 		alert("Input out of range (-1 to 1)");
	// 		return NaN;
	// 	}
	// 	let angle = fn(value);
	// 	if (!RADIAN) angle = angle * 180 / Math.PI;
	// 	return angle;
	// }






	function factorial(n) {
		if (n < 0) {
			alert("Factorial is undefined for negative numbers");
			return NaN;
		}
		if (n % 1 !== 0) {
			alert("Factorial is only defined for non-negative integers");
			return NaN;
		}
		if (n === 0 || n === 1) return 1;
		let res = 1;
		for (let i = 2; i <= n; i++) {
			res *= i;
			if (res === Infinity) {
				alert("Factorial result is too large");
				return Infinity;
			}
		}
		return res;
	}
	function gamma(n) {
		var g = 7,
			p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
				-176.61502916214059, 12.507343278686905, -0.13857109526572012,
				9.9843695780195716e-6, 1.5056327351493116e-7];
		if (n < 0.5) return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
		n--;
		let x = p[0];
		for (let i = 1; i < g + 2; i++) x += p[i] / (n + i);
		let t = n + g + 0.5;
		return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
	}
});
