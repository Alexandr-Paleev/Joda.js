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
        inputBtn: '.add__btn'
    }
    
    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
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

    let ctrlAddItem = () => {
        let input;
        let newItem;

        //Взять данные из инпута
        input = UICtrl.getInput();

        //добавить елементы в dataController
        newItem = dataCtrl.addItem(input.type, input.description, input.value);

        //добавить елементы в UI

        //посчитать(сложить) данные

        //вывести на экран данные в UI

    };

    return {
        init: () => {
            console.log('Application sterted.');
            setupEventListeners();
        }
    };

})(dataController, UIController);

controller.init();
