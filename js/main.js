const appData = {
	expenses: {},
	optionalExpenses: [],
	income: [],
	savings: false,
	acceptExpenses: function () {
		if (expense_1.value === "" || expense_2.value === "") {
			alert("Ошибка: полe наименования не может быть пустым");
		} else if (value_1.value == 0 || value_2.value == 0) {
			alert("Ошибка: поле со значением не может быть пустым или равным нулю");
		} else {
			document.querySelector(".expenses-item-btn").textContent = "Успешно";
			appData.expenses[expense_1.value] = +value_1.value;
			appData.expenses[expense_2.value] = +value_2.value;
			appData.addExpenses();
		}
	},
	addExpenses: function () {
		let arr = [];
		for (key in appData.expenses) {
			arr.push(key);
			document.querySelector(".expenses-value").textContent = arr.join(" ");
		}
	},
	acceptOptionalExpenses: function () {
		if (appData.optionalExpenses.length > 0) {
			appData.optionalExpenses = [];
		}
		optionalExpensesList.forEach(function (element) {
			if (element.value != "") {
				appData.optionalExpenses.push(element.value);
			}
		});
		if (appData.optionalExpenses.length > 0) {
			optionalExpense_btn.textContent = "Успешно";
		}

		appData.addOptionalExpenses();
	},
	addOptionalExpenses: function () {
		document.querySelector(".optionalexpenses-value").textContent =
			appData.optionalExpenses.join(" ");
	},
	addBudget: function () {
		while (true) {
			appData.budget = +prompt("Укажите ваш доход", "");
			if (
				appData.budget == 0 ||
				isNaN(appData.budget) ||
				typeof appData.budget == undefined ||
				typeof appData.budget == null
			) {
				alert("Ошибка: введите целое число, неравное нулю");
				continue;
			} else {
				break;
			}
		}
		document.querySelector(".budget-value").textContent = appData.budget;
	},
	countDailyBudget: function () {
		let sumOfExpenses = 0;
		for (let key in appData.expenses) {
			sumOfExpenses += appData.expenses[key];
		}
		dailyBudget = (appData.budget - sumOfExpenses) / 30;
		document.querySelector(".daybudget-value").textContent =
			Math.round(dailyBudget);
		document.querySelector(".level-value").textContent = appData.countLevel();
		countBudgetButton.textContent = "Успешно";
	},
	countLevel: function () {
		if (dailyBudget < 500) {
			return "Low";
		} else {
			if (dailyBudget >= 500 && dailyBudget < 1500) {
				return "Average";
			} else {
				return "High";
			}
		}
	},
	hadleIncome: function () {
		chooseIncome.addEventListener("blur", function (event) {
			document.querySelector(".income-value").textContent = event.target.value;
			appData.income = chooseIncome.value.split(", ");
		});
	},
	getFormsDisabled: function () {
		sum.setAttribute("disabled", "disabled");
		percent.setAttribute("disabled", "disabled");
		document.querySelector(".start").setAttribute("disabled", "disabled");
		document.querySelector(".start").addEventListener("mouseenter", (e) => {
			e.target.style.cursor = "default";
		});
	},
	getFormsEnabled: function () {
		sum.removeAttribute("disabled");
		percent.removeAttribute("disabled");
		document.querySelector(".start").removeAttribute("disabled");
		document.querySelector(".start").addEventListener("mouseenter", (e) => {
			e.target.style.cursor = "pointer";
		});
	},
};

const expense_1 = document.querySelector("#expenses_1");
const value_1 = document.querySelector("#expenses_2");
const expense_2 = document.querySelector("#expenses_3");
const value_2 = document.querySelector("#expenses_4");

const expenses_btn = document.querySelector(".expenses-item-btn");
expenses_btn.addEventListener("click", appData.acceptExpenses);

const optionalExpensesList = document.querySelectorAll(
	".optionalexpenses-item"
);

const sum = document.querySelector(".choose-sum");
const percent = document.querySelector(".choose-percent");

const optionalExpense_btn = document.querySelector(".optionalexpenses-btn");
optionalExpense_btn.addEventListener("click", appData.acceptOptionalExpenses);

const countBudgetButton = document.querySelector(".count-budget-btn");
countBudgetButton.addEventListener("click", function () {
	appData.addBudget();
	appData.countDailyBudget();
});

const date = new Date();
document.querySelector(".year-value").value = date.toLocaleString("ru", {
	year: "numeric",
});
document.querySelector(".month-value").value = date.toLocaleString("ru", {
	month: "long",
});
document.querySelector(".day-value").value = date.toLocaleString("ru", {
	day: "numeric",
});

const chooseIncome = document.querySelector(".choose-income");

const savings = document.querySelector("#savings");

appData.getFormsDisabled();

savings.addEventListener("change", function () {
	if (savings.checked) {
		appData.getFormsEnabled();
	} else {
		appData.getFormsDisabled();
	}
});

appData.hadleIncome();

document.querySelector(".start").addEventListener("click", function () {
	document.querySelector(".monthsavings-value").textContent = Math.round(
		+sum.value * ((+percent.value / 100 / 365) * 30) + +sum.value
	);
	document.querySelector(".yearsavings-value").textContent = Math.round(
		+sum.value * ((+percent.value / 100 / 365) * 365) + +sum.value
	);
});