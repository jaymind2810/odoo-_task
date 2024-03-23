/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState } from  "@odoo/owl";
import { TodoItem } from "./todo_item";
import { useAutofocus } from "@web/core/utils/hooks";
import { Layout } from "@web/search/layout";

class MyAwesomeDashaBoard extends Component {
    static template = "tic_tac.my_awesome_dashboard";
    static components = { Layout };

    setup() {
        this.action = useService("action");
        this.statistics = useState(useService("awesome_dashboard.statistics"));
        this.dialog = useService("dialog");
        this.display = {
            controlPanel: {},
        };
        this.items = registry.category("awesome_dashboard").getAll();
        this.state = useState({
            disabledItems: browser.localStorage.getItem("disabledDashboardItems")?.split(",") || []
        });
    }

}

MyAwesomeDashaBoard.template = "my_awesome_count";
registry.category("actions").add("tic_tac.my_awesome_dashboard", MyAwesomeDashaBoard);
