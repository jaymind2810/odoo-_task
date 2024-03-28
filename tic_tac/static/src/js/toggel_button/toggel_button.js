/** @odoo-module */

import { Component, useState } from "@odoo/owl";

export class ToggleButton extends Component{
    static template = "tic_tac.ToggleButton"
    static props = {
        toggleText :{
            type : Object,
            shape: { id: Number, isHide: Boolean }
        },
        toggleStateFun: Function,
    };

    setup (){
        this.toggleStateDict = useState({ isHide: false, id: 1 });
    }

    onHide() {
        console.log(this.props, "------onchange----1111111111-----------", this.toggleStateDict)
        this.toggleStateDict.isHide = !this.toggleStateDict.isHide;
    }
}