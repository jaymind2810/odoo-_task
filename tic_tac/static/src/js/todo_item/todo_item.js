/** @odoo-module */

import { Component } from "@odoo/owl";

export class TodoItem extends Component {
    static template = "tic_tac.TodoItem";
    static props = {
        todo: {
            type: Object,
            shape: { id: Number, description: String, isCompleted: Boolean }
        },
        toggleState: Function,
        removeTodo: Function,
    };

    onHide() {
        console.log("------onchange----1111111111-----------")
        this.props.toggleState(this.props.todo.id);
    }

    onRemove() {
        console.log("------onremove----2222222222-----------")
        this.props.removeTodo(this.props.todo.id);
    }
}
