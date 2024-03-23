/** @odoo-module */

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "tic_tac.Counter";
    static props = {
        counterCount: {
            type: Object,
            shape: { counter: Number, description: String, isCompleted: Boolean }
        },
        toggleState: Function,
    };

    setup (){
        this.counter = useState({ value: 1 });
    }

    incrementCounter() {
        console.log("------incrementCounter----1111111111-----------")
        this.counter++
    }
}
