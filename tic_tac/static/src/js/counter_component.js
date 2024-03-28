/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState } from  "@odoo/owl";
import { TodoItem } from "./todo_item/todo_item";
import { SimpleCard } from "./card/some_card";
import { ToggleButton } from "./toggel_button/toggel_button"
import { Counter } from "./counter/counter"
import { useAutofocus } from "@web/core/utils/hooks";

class MyAwesomeCounter extends Component {

//    static template = "tic_tac.Counter";

    static components = { TodoItem, SimpleCard, Counter, ToggleButton };

    setup() {
        this.nextId = 0;
        this.todos = useState([]);
        useAutofocus("input")
        this.nextCardId = 0;
        this.cards = useState([]);
        useAutofocus("input-new")
        useAutofocus("input-desc")


        this.sum = useState({ value: 0 });
        this.counter_1 = useState({ value: 0 });
        this.counter_2 = useState({ value: 0 });


        this.counter_sum = useState({ value: 0 });
    }

// ---------------------- Counter Component------------Sum----------------

    sumCounter(counterID) {
        console.log(counterID, "Here---------In Sum Counter", this)
        this.counter_sum.value++;
    }


// ----------------------------------- Card Text Functionality ---------------------

    addCardDetails(ev) {
        console.log("-----------addCardDetails---------in Function------")
        var c_title = document.getElementById("card_title").value;
        var c_description = document.getElementById("card_description").value;
        console.log(c_title, "======= title, Description ======", c_description)
        if (c_title != "") {
            this.cards.push({
                id: this.nextCardId++,
                title: c_title,
                description: c_description,
            });
        }
        console.log(this.cards, "-----------addCardDetails---------After------")
    }

    removeCard(cardId){
        const index = this.cards.findIndex(item => item.id === cardId);
        if (index >= 0) {
            this.cards.splice(index, 1);
        }
    }

//    addCardDetails(ev) {
//        if (ev.keyCode === 13 && ev.target.value != "") {
//            this.cards.push({
//                id: this.nextCardId++,
//                title: ev.target.value,
//            });
//            ev.target.value = "";
//        }
//    }



// -----------------Todo List Functionality ----------------------------------------

    addTodo(ev) {
        console.log("=========Add To Todo-----------------")
        if (ev.keyCode === 13 && ev.target.value != "") {
            this.todos.push({
                id: this.nextId++,
                description: ev.target.value,
                isCompleted: false
            });
            ev.target.value = "";
        }
        console.log(this.todos, "=========Add To Todo-----------------")
    }

    toggleTodo(todoId) {
        const todo = this.todos.find((todo) => todo.id === todoId);
        console.log(todo, "------------4------------444444444444444444-------")
        if (todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    }

    removeTodo(todoId) {
        const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
        console.log(todoIndex, "------------333333333333333333333---------------------")
        if (todoIndex >= 0) {
            this.todos.splice(todoIndex, 1);
        }
    }


// ----------------- Counter Count Functionality ----------------------------------------

    increment() {
        this.sum.value++;
    }

    increment_counter_1(){
        this.counter_1.value++;
        this.increment()
    }

    increment_counter_2(){
        this.counter_2.value++;
        this.increment()
    }

    _handleCheckboxChange(event) {
        console.log(event,"-_After Click-------",$(event.currentTarget))
        if ($(event.currentTarget)) {
            console.log(this.isChecked, "-----------Check boX Clicked-------------")
            if (this.isChecked == true){
                this.isChecked = false
            } else {
                this.isChecked = true
            }

        }
    }

    _onClickIncrementalCounter(event) {
        console.log(event,"-_After Click-------",$(event.currentTarget))
        if ($(event.currentTarget)) {
            var display = document.getElementById("counter_value");
            var display_value1 = display.innerHTML;
            var value = parseInt(display_value1);
            value = value + 1
            console.log(value, "-------Display Value------")
            $(display).text(value)
            this.increment()

        }
    }


}

MyAwesomeCounter.template = "my_awesome_count";
//MyAwesomeCounter.components = {
//    SimpleCard
//}
registry.category("actions").add("tic_tac.my_awesome_counter", MyAwesomeCounter);
