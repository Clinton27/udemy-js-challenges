//BUDGET CONTROLLER
var budgetController = (function() {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value/totalIncome)*100);
        }
        else {
            this.percentage = -1;
        }
        
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type) {

        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });
        data.totals[type] = sum;

    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, des, val) {          
            var newItem;    
            
            //create new ID
            if (data.allItems[type].length > 0)
            {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else
            {
                ID = 0;
            }
            
            //create new item based on inc or exp type and push into data struc and return element.
            if (type === 'exp')
            {
                newItem = new Expense (ID, des, val);
            }
            else if (type === 'inc')
            {
                newItem = new Income (ID, des, val);
            }
            
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id) {

            var ids, index;

            //create an array of the ids from the income/expense array
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            //find the index for the given id
            index = ids.indexOf(id);

            //remove that element from the allItems array at that index
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function() {

            //calculate the total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentage of income that we spent
            if(data.totals.inc > 0)
            {
                data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
            }
            else
            {
                data.percentage = -1;
            }
            
        },

        calculatePercentages: function() {

            data.allItems.exp.forEach(function(curr) {
                curr.calcPercentage(data.totals.inc);
            });

        },

        getPercentages: function() {
            var allPercentages = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });

            return allPercentages;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            } 
        }
    }

})();

// UI CONTROLLER
var UIController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage'
    }

    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function(obj, type) {
            var html, newHTML, element, fields, fieldsArray;
            //create html string with placeholder text

            if (type === 'inc')
            {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if (type === 'exp')
            {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
    
            //replace placeholder text with data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            //insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        deleteListItem: function(selectorId) {

            var el;

            el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);

        },

        clearFields: function() {
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current, index, array) {
                current.value = "";                
            });

            fieldsArray[0].focus();
        },

        displayBudget: function(obj) {

            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;
            

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }

        },

        displayPercentages: function(percentages) {
            
            var fields;

            fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

            var nodeListForEach = function(list, callback) {

                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }

            };

            nodeListForEach (fields, function(current, index) {

                if (percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                }
                else {
                    current.textContent = '---';
                }
                

            });

        },

        getDOMStrings: function() {
            return DOMStrings;
        }

    }

})();

//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {

        var DOMStrings = UICtrl.getDOMStrings();

        document.querySelector(DOMStrings.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(evnt) {
            if (evnt.keyCode === 13 || evnt.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOMStrings.container).addEventListener('click, ctrlDeleteItem');

    }


    var updateBudget = function() {
        //1. Calc the budget
        budgetCtrl.calculateBudget();

        //2. Return the budget
        var budget = budgetCtrl.getBudget();

        //3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function() {

        //1. Calc %'s
        budgetCtrl.calculatePercentages();

        //2. Read from the budget controller
        var percentages = budgetCtrl.getPercentages();

        //3. Update UI with new %'s
        UICtrl.displayPercentages(percentages);
    }
   

    var ctrlAddItem = function() {

        var input, newItem;

        //1. get field input data
        input = UICtrl.getInput(); 

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            //2. add the item to the budget controller.
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. add the new item to the UI
            UICtrl.addListItem(newItem, input.type); 

            //4. Clear the fields
            UICtrl.clearFields();
            
            //5. Calc and update budget
            updateBudget();

            //6. Update percentages
            updatePercentages();

        }



    };

    var ctrlDeleteItem = function(event) {
        var itemId, splitId, type, id;

        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {

            splitId = itemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]);
        }

        //1. Delete item from data structure.
        budgetCtrl.deleteItem(type, id);

        //2. Delete item from the UI.
        UICtrl.deleteListItem(itemId);

        //3. Update and show the new budget.
        updateBudget();

        //4. Update percentages
        updatePercentages();
        
    };

    return {
        init: function() {
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);  

controller.init();