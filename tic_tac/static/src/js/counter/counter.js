/** @odoo-module */

import { Component, useState } from "@odoo/owl";

export class Counter extends Component {
    static template = "tic_tac.Counter";
    static props = {
        counterCount: {
            type: Object,
            shape: { id: Number, counter: Number}
        },
        counterFun: { type: Function, optional: true }
    };

    setup (){
        this.counter = useState({ value: 0 });
    }

    incrementCounter() {
        console.log(this.counter, "------incrementCounter----1111111111-----------", this)
        this.counter.value++;
        if (this.props.counterFun){
            this.props.counterFun()
        }
    }
}
