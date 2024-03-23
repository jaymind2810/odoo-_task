/** @odoo-module */

import { Component } from "@odoo/owl";

export class ToggleButton extends Component{
    static template = "tic_tac.ToggleButton"
    static props = {
        toggleText :{
            type : Object,
            shape: { id: Number, description: String, isHide: Boolean }
        },
        toggleStateNew: Function,
    };

    onHide() {
        console.log("------onchange----1111111111-----------")
//        this.props.toggleState(this.props.toggleText.id);
        this.props.toggleText.isHide = true;
    }
}