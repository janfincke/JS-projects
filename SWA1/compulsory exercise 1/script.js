/**
    Observer

    Informs the objects when events occur
*/

function Event(sender) {
    "use strict";
    this._sender = sender;
    this._listeners = [];
}
Event.prototype = {
    attach: function (listener) {
        "use strict";
        this._listeners.push(listener);
    },
    notify: function (args) {
        "use strict";
        var ind;
        for (ind = 0; ind < this._listeners.length; ind += 1) {
            this._listeners[ind](this.sender, args);
        }
    }
};

/**
    Model

    This stores all the data the application works with
    Also notifies the observer about changes
    I also added here the functions for adding and removing items
*/

function ItemModel(items) {
    "use strict";
    this._items = items;
    // make new observer events for item manipulation
    this.itemAdded = new Event(this);
    this.itemRemoved = new Event(this);
}
ItemModel.prototype = {
    getItems: function () {
        "use strict";
        return this._items;
    },
    addItem: function (itemName, itemAmount) {
        "use strict";
        // get array properties
        var name = document.getElementById('name'),
            amount = document.getElementById('amount');
        // reset input fields
        name.value = '';
        amount.value = '';
        this._items.push({
            // push new properties to existing array
            name: itemName,
            amount: itemAmount
        });
        this.itemAdded.notify({
            // notify observer
            name: itemName,
            amount: itemAmount
        });
    },
    removeItem: function (itemName, itemAmount) {
        "use strict";
        // remove last array item
        this._items.splice(-1, 1);
        this.itemRemoved.notify({
            // notify observer
            name: itemName,
            amount: itemAmount
        });
        
    }

};

/**
    View

    Creates the view for end users
*/

function ItemView(model, elements) {
    "use strict";
    this._model = model;
    this._elements = elements;

    this.listModified = new Event(this);
    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);

    var _this = this;
    // attach listeners to model
    this._model.itemAdded.attach(function () {
        _this.buildList();
    });
    this._model.itemRemoved.attach(function () {
        _this.buildList();
    });
    // attach listeners to HTML elements (add and remove buttons)
    this._elements.addButton.click(function () {
        _this.addButtonClicked.notify();
    });
    this._elements.delButton.click(function () {
        _this.delButtonClicked.notify();
    });
}

ItemView.prototype = {
    show: function () {
        // run this function to start list building
        "use strict";
        this.buildList();
        this.search();
    },
    buildList: function () {
        // builds a new list and updates it if any changes occur
        "use strict";
        var item,
            list;
        list = this._elements.list;
        list.html('');
        item = this._model.getItems();
        $(item).each(function (index, item) {
            // append new item to the array
            $('#itemlist').append('<li>' + '<strong class="name">' + item.name + '</strong>, &nbsp;' + item.amount + ' units</li>');
        });
        // create/update the bar graph when an item is added
        this.createGraph();
    },
    createGraph: function () {
        // creates a simple bar graph with KendoUI (using JQuery)
        "use strict";
        $("#myChart").kendoChart({
            // gets the data from model
            dataSource: {
                data: this._model.getItems()
            },
            // set graph title
            title: {
                align: "left",
                text: "Storaged items listed by amount"
            },
            legend: {
                visible: false
            },
            seriesDefaults: {
                // set series type
                type: "column",
                stack: true,
                labels: {
                    visible: true,
                    background: "transparent"
                }
            },
            series: [{
                field: "amount"
            }],
            valueAxis: {
                // set 'amount' fields to value axis (above columns)
                majorGridLines: {
                    visible: false
                },
                visible: false
            },
            categoryAxis: {
                // set 'name' fields to category axis (below each column)
                field: "name",
                majorGridLines: {
                    visible: false
                },
                line: {
                    visible: false
                }
            }
        });
    },
    search: function () {
        // function for searching  trough the list by typing in letters
        // letters then print the items that match those letters
        "use strict";
        var input = document.getElementById('search');
        // bind text input to onkeyup event
        input.onkeyup = function () {
            // convert input to uppercase for easier filtering
            var filter = input.value.toUpperCase(),
                list = document.getElementsByTagName('li'),
                i;

            for (i = 0; i < list.length; i++) {
                // iterate through the list items by "name"
                var name = list[i].getElementsByClassName('name')[0].innerHTML;
                // if input matches a list item, print item
                if (name.toUpperCase().indexOf(filter) === 0) {
                    list[i].style.display = 'list-item';
                    // else, print nothing
                } else {
                    list[i].style.display = 'none';
                }
            }
        };
    }
};

/**
    Controller

    Responds to user interaction by communicating with model and view
*/

function ItemController(model, view) {
    "use strict";
    this._model = model;
    this._view = view;

    var _this = this;

    this._view.addButtonClicked.attach(function () {
        _this.addItem();
    });
    this._view.delButtonClicked.attach(function () {
        _this.delItem();
    });
}

ItemController.prototype = {
    addItem: function () {
        // gets user input and then invokes addItem() to add a new object to the array
        "use strict";
        var itemName = document.getElementById('name').value,
            itemAmount = document.getElementById('amount').value,
            errorName,
            errorAmount;
        if (!itemName) {
            return;
        } else if (!itemAmount) {
            return;
        } else {
            this._model.addItem(itemName, itemAmount);
        }
    },
    delItem: function () {
        // when the delete button is pressed, runs removeItem() to delete the last object from the array
        "use strict";
        var itemName,
            itemAmount;
        itemName = this._model.getItems.name;
        itemAmount = this._model.getItems.amount;
        this._model.removeItem(itemName, itemAmount);
    }
};
/**
    Initialization
*/

window.onload = function () {
    // initialize a new model and view, then bind those to a new controller and initialize that
    "use strict";
    var model = new ItemModel([
            {"name" : "T-shirts", "amount" : 50},
            {"name" : "Jeans", "amount" : 38},
            {"name" : "Jackets", "amount" : 47 },
            {"name" : "Pants", "amount" : 24 },
            {"name" : "Shirts", "amount" : 63 },
            {"name" : "Hoodies", "amount" : 38 },
            {"name" : "Beanies", "amount" : 11 },
            {"name" : "Gloves", "amount" : 76 }
        ]),
        view = new ItemView(model, {
            'list': $('#itemlist'),
            'addButton': $('#add'),
            'delButton': $('#remove')
        }),
        controller = new ItemController(model, view);
    // then build user interface
    view.show();
};
