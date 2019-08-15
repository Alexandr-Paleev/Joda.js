const dataController = (() => {

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

    const DOM = UICtrl.getDOMstrings();

    const ctrlAddItem = () => {
        //Взять данные из инпута
        let objInput = UIController.getInput();
        console.log(objInput);

        //добавить елементы в dataController

        //добавить елементы в UI

        //посчитать(сложить) данные

        //вывести на экран данные в UI

    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

    return {
        init: () => {
            console.log('Application sterted.');
        }
    };

})(dataController, UIController);

controller.init();
