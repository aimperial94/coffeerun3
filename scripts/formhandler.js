(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;
    App.achievers = [];

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    function checkAchievement(order) {
        if (order['size'] == 'Titanic' && order['strength'] == 100 && order['flavor'] != '') {
            $('#achievementModal').modal('show');
            App.achievers.push(order['emailAddress']);
        }
    }

    function addSpecials() {
        var container = document.getElementById('container');
        var list = document.createElement('select');
        var label = document.createElement('label');
        label.for = 'superShot';
        label.textContent = 'Super Shot';
        container.appendChild(label);
        list.id = 'superShot';
        list.name = 'superShot';
        list.class = 'form-control';
        container.appendChild(list);
        var special = document.createElement('option');
        special.text = '';
        special.value = 'None';
        list.appendChild(special);
        special = document.createElement('option');
        special.text = 'Invisibility';
        special.value = 'Invisibility';
        list.appendChild(special);
        special = document.createElement('option');
        special.text = 'Super Speed';
        special.value = 'Super Speed';
        list.appendChild(special);
        special = document.createElement('option');
        special.text = 'Homework Completion';
        special.value = 'Homework Completion';
        list.appendChild(special);
    }

    function checkAchievers(email) {
        if (App.achievers.indexOf(email) != -1) {
            addSpecials();
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            checkAchievement(data);
            console.log(data);
            fn(data);
            this.reset();
            this.reset();
            this.elements[0].focus();
        });
    };

    FormHandler.prototype.addEmailHandler = function() {
        var email = document.getElementById('emailInput');
        email.addEventListener('blur', function() {
            checkAchievers(email.value);
            console.log(email.value);
        });
    };

    FormHandler.prototype.addResetHandler = function() {
        this.$formElement.on('reset', function() {
            var strengthLabel = document.getElementById('labelStrength');
            strengthLabel.textContent = 'Caffeine Rating: 30';
            strengthLabel.style.color = 'Green';
        });
    };

    FormHandler.prototype.addSliderHandler = function() {
        console.log('Setting up slider handler');
        var strengthLabel = document.getElementById('labelStrength');
        var strengthValue = document.getElementById('strengthLevel');

        //this.$formElement.on('range', function(event) {
        strengthValue.addEventListener('input', function() {
            event.preventDefault();
            if (strengthValue.value < 33) {
                strengthLabel.textContent = 'Caffeine Rating: ' + strengthValue.value;
                strengthLabel.style.color = 'Green';
            } else if (strengthValue.value < 66) {
                strengthLabel.textContent = 'Caffeine Rating: ' + strengthValue.value;
                strengthLabel.style.color = 'Yellow';
            } else {
                strengthLabel.textContent = 'Caffeine Rating: ' + strengthValue.value;
                strengthLabel.style.color = 'Red';
            }


        });
    };

    FormHandler.prototype.init = function() {
        var strengthLabel = document.getElementById('labelStrength');
        strengthLabel.textContent = 'Caffeine Rating: 30';
        strengthLabel.style.color = 'Green';
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
