const dataController = (() => {

    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    calculateTotal = (type) => {
        let sum = 0;
        data.allItems[type].forEach((el) => {
            sum += el.value;
        });
        data.totals[type] = sum;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: 0
    };

    return {
        addItem: (type, des, val) => {
            let newItem;
            let ID;

            // присвоили id последнему елементу
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // создали новый елемент
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des,val);
            }

            // добавили новый елемент в конец мвссива 'inc' или 'exp'
            data.allItems[type].push(newItem);

            // вернули новый елемент
            return newItem;
        },

        deleteItem: (type, id) => {
            let ids;
            let index;

            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateData: () => {
            //вычислить total exp и total inc
            calculateTotal('exp');
            calculateTotal('inc');

            //inc отнять exp
            data.budget = data.totals.inc - data.totals.exp;

            //вычислить процент
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: () => {
            data.allItems.exp.forEach((cur) => {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: () => {
            let allPerc = data.allItems.exp.map((cur) => {
                return cur.getPercentage();
            });
            return allPerc;
        },

        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: () => {
            console.log(data);
        }
    };

})();

const UIController = (() => {
    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage'
    };
    
    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: (obj, type) => {
            let html;
            let newHTML;
            let element;
            // сщздать строку HTML с данными

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = `<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>
                    <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>
                    </div>`;
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>
                    <div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>
                    <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div></div></div>`;
            }

            // добавить актуальные данные
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            // добавить HTML в DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);

        },

        deleteListItem: (selectorID) => {
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: () => {
            let fields;
            let fieldsArr;

            fields = document.querySelectorAll(`${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((el) => {
                el.value = '';
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;

            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: (percentages) => {
            
            let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            let nodeListForEach = (list, callback) => {
                for (let i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };

            nodeListForEach(fields, (current, index) => {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }                
            });
        },

        getDOMstrings: () => {
            return DOMstrings;
        }

    };

})();

const controller = ((dataCtrl, UICtrl) => {

    let setupEventListeners = () => {
        let DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    let updateData = () => {
        //посчитать бюджет
        dataCtrl.calculateData();

        //вернуть бюджет
        let budget = dataCtrl.getBudget();

        //вывести бюджет в UI
        UICtrl.displayBudget(budget);
    };

    let updatePercentages = () => {
        // вычислить процент
        dataCtrl.calculatePercentages();

        // прочитать процент для data controller
        let percentages = dataCtrl.getPercentages();

        // обновить UI с новым процентом
        UICtrl.displayPercentages(percentages);
    };

    let ctrlAddItem = () => {
        let input;
        let newItem;

        //Взять данные из инпута
        input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value !== 0 ) {
            //добавить елементы в dataController
            newItem = dataCtrl.addItem(input.type, input.description, input.value);

            //добавить елементы в UI
            UIController.addListItem(newItem, input.type);

            //очистить все инпуты
            UIController.clearFields();

            //посчитать и вывести на экран данные в UI
            updateData();

            //посчитать и обновить процент
            updatePercentages();
        }
    };

    let ctrlDeleteItem = (event) => {
        let itemID;
        let splitID;
        let type;
        let ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            // inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //удалить элемент из структуры данных
            dataCtrl.deleteItem(type, ID);

            //удалить элемент из UI
            UICtrl.deleteListItem(itemID);

            //обновить UI и показать новый бюджет
            updateData();

            //посчитать и обновить процент
            updatePercentages();

        }

    };

    return {
        init: () => {
            console.log('Application sterted.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(dataController, UIController);

controller.init();
