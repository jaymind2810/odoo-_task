/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, onWillStart, useRef, onMounted } from  "@odoo/owl";
import { KpiCard } from "./kpi_card/kpi_card";
import { ChartRenderer } from "./chart_renderer/chart_renderer";
import { useService, useAutofocus } from "@web/core/utils/hooks";
//import { TodoItem } from "./todo_item";
import { loadJS } from "@web/core/assets"


class MyAwesomeDashaBoard extends Component {

    setup() {

        this.state = useState({
            quotations: {
                value: 10,
                percentage: 6,
            },
            period: 90,
        })
        this.orm = useService("orm")

        onWillStart(async ()=>{
            this.getDates();
            await this.getQuotations()
        })
    }

    getDates(){
        var d = new Date();
        console.log('Today is: ', d.toLocaleString());
        d.setDate(d.getDate() - this.state.period);
        console.log('-------- days ago was: ',d.toLocaleString());
        this.state.date = d.toLocaleString()
    }

    async getQuotations(){
        let domain = [['state', 'in', ['sent', 'draft']]]

        if (this.state.period > 0){
            domain.push(['date_order','>', this.state.date])
        }
        
        const data = await this.orm.searchCount("sale.order", domain)
        this.state.quotations.value = data
    }

    onChangePeriod(){
        this.getDates()
        this.getQuotations()
    }

}

MyAwesomeDashaBoard.template = "tic_tac.myOwlSalesDashboard";
MyAwesomeDashaBoard.components = { KpiCard, ChartRenderer }

registry.category("actions").add("tic_tac.my_awesome_dashboard", MyAwesomeDashaBoard);
