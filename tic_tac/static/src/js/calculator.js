/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component } from  "@odoo/owl";

class MyCalculator extends Component {

    setup() {
        console.log("Here........", this);
        this._setStartValue()

    }

    _setStartValue () {
        $('#display').text('0');
    }

    _isOperator(value) {
        return value == '+' || value == '-' || value == '*' || value == '/'
    }


    _onButtonPress(event) {
//        console.log(event,"-_After Click-------",$(event.currentTarget))
        if ($(event.currentTarget)) {
            var display = document.getElementById("display");
            var display_value1 = display.innerHTML;
            var display_value = display_value1.trim()
            var current_value = $(event.currentTarget).attr("data-value");
            console.log(current_value, "d-----current_value")
            if (current_value == 'ac'){

                $(display).text('0')
            } else if(display_value.length == 1) {
                if (display_value == '0') {
                    $(display).text(current_value)
                } else {
                    $(display).append(current_value)
                }
            } else {
                $(display).append(current_value)
            }
        }
    }

    _onEqualButtonPress(event) {
        console.log(event,"-_After Click-------",$(event.currentTarget))
        var display = document.getElementById("display");
        var display_value1 = display.innerHTML;
        var display_value = display_value1.trim()
        console.log(eval(display_value));
        var final_value = eval(display_value)
        $(display).text(final_value)

    }




}
MyCalculator.template = "tic_tac_web";
registry.category("actions").add("tic_tac.my_calculator", MyCalculator);




