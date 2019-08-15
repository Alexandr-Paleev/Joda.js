const dataController = (() => {

    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

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
        expensesContainer: '.expenses__list'
    }
    
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

                html = `<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div>
                    <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>
                    </div>`;
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div>
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
    };

    let updateData = () => {
        //посчитать бюджет

        //вернуть бюджет

        //вывести бюджет в UI
    }

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
        }
    };

    return {
        init: () => {
            console.log('Application sterted.');
            setupEventListeners();
        }
    };

})(dataController, UIController);

controller.init();
