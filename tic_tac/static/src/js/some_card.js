/** @odoo-module */

import { Component } from "@odoo/owl";

export class SimpleCard extends Component {
    static template = "tic_tac.SimpleCard";
    static props = {
        cardText: {
            type: Object,
            shape: {id: Number, title: String, description: String }
        },
//        toggleCardState: Function,
        removeCard: Function,
    };

//    onChange() {
//        console.log("------onchange----1111111111-----------")
//        this.props.toggleState(this.props.todo.id);
//    }
//
    onRemove() {
        console.log("------onremove----2222222222-----------")
        this.props.removeCard(this.props.cardText.id);
    }
}
