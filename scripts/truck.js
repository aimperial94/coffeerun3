(function(window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }

    Truck.prototype.createOrder = function(order) {
        this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId) {
        this.db.remove(customerId);
    };

    // Created this function to return keys from current orders
    Truck.prototype.getOrders = function() {
        return Object.keys(this.db.getAll());
    };

    // This does not return any values and therefor not possible to check if
    // it is printing the correct output.
    Truck.prototype.printOrders = function() {
        var customerIdArray = this.getOrders();

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function(id) {
            console.log(this.db.get(id));
        });
    };

    App.Truck = Truck;
    window.App = App;

})(window);
