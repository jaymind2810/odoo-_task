/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, onWillStart, useRef, onMounted } from  "@odoo/owl";
import { KpiCard } from "./kpi_card/kpi_card";
import { ChartRenderer } from "./chart_renderer/chart_renderer";
import { useService, useAutofocus } from "@web/core/utils/hooks";
//import { TodoItem } from "./todo_item";
import { loadJS } from "@web/core/assets"
import { getColor } from "@web/core/colors/colors";


class MyAwesomeDashaBoard extends Component {

    async getTopProducts(){

        let domain = [['state', 'in', ['sale', 'done']]]
        if (this.state.period > 0){
            domain.push(['date','>', this.state.current_date])
        }

        const data = await this.orm.readGroup("sale.report", domain, ['product_id', 'price_total'],['product_id'], {limit: 5, orderby:"price_total desc"})
        console.log(data, "=========Get Product Data====", data.map(d => d.price_total))

        this.state.topProducts = {
            data: {
                labels: data.map(d => d.product_id[1]),
                  datasets: [{
                    label: 'Total',
                    data: data.map(d => d.price_total),
                    hoverOffset: 4,
                    backgroundColor: data.map((_, index) => getColor(index)),
                  },
                  {
                    label: 'Count',
                    data: data.map(d => d.product_id_count),
                    hoverOffset: 4,
                    backgroundColor: data.map((_, index) => getColor(index)),
                  },
                  ]
            },
            domain,
            label_field: 'product_id',
        }
    }

    async getTopSalesPeople(){
        let domain = [['state', 'in', ['sale', 'done']]]
        if (this.state.period > 0){
            domain.push(['date','>', this.state.current_date])
        }

        const data = await this.orm.readGroup("sale.report", domain, ['user_id', 'price_total'],['user_id'], {limit: 5, orderby:"price_total desc"})

        this.state.topSalesPeople = {
            data: {
                labels: data.map(d => d.user_id[1]),
                  datasets: [{
                    label: 'Total',
                    data: data.map(d => d.price_total),
                    hoverOffset: 4,
                    backgroundColor: data.map((_, index) => getColor(index)),
                  }
                  ]
            },
            domain,
            label_field: 'user_id',
        }
    }

    async getMonthlySales(){
        let domain = [['state', 'in', ['draft', 'done', 'sale', 'done']]]
        if (this.state.period > 0){
            domain.push(['date','>', this.state.current_date])
        }


        const data = await this.orm.readGroup("sale.report", domain, ['date', 'state', 'price_total'],['date', 'state'], {orderby:"date", lazy: false})

        const labels = [... new Set(data.map(d => d.date))]
        const quotations = data.filter(d => d.state == 'draft' || d.state == 'sent')
        const orders = data.filter(d => ['done', 'sale'].includes(d.state))

        this.state.monthlySales = {
            data: {
                labels: labels,
                  datasets: [{
                    label: 'Quotations',
//                    data: data.filter(d => d.state == 'draft' || d.state == 'sent').map(d => d.price_total),
                    data: labels.map(l=>quotations.filter(q=>l==q.date).map(j=>j.price_total).reduce((a, c)=>a+c,0)),
                    hoverOffset: 4,
                    backgroundColor: "red",
                  },
                  {
                    label: 'Orders',
//                    data: data.filter(d => ['done', 'sale'].includes(d.state)).map(d => d.price_total),
                    data: labels.map(l=>orders.filter(q=>l==q.date).map(j=>j.price_total).reduce((a, c)=>a+c,0)),
                    hoverOffset: 4,
                    backgroundColor: "green",
                  },
                  ]
            },
            domain,
            label_field: 'date',
        }
    }

    async getPartnerOrders(){
        this.state.partnerOrders = {}

        let domain = [['state', 'in', ['draft', 'done', 'sale', 'done']]]
        if (this.state.period > 0){
            domain.push(['date','>', this.state.current_date])
        }

        const data = await this.orm.readGroup("sale.report", domain, ['partner_id', 'price_total', 'product_uom_qty'],['partner_id'], {orderby:"partner_id", lazy: false})
        console.log(data, "=========Get Monthaly Data====", data.map(d => d.price_total))

        this.state.partnerOrders = {
            data: {
                labels: data.map(d => d.partner_id[1]),
                  datasets: [{
                    label: 'Total Amount',
                    data: data.map(d => d.price_total),
                    hoverOffset: 4,
                    backgroundColor: "orange",
                    yAxisID: "Total",
                    order: 1,
                  },
                  {
                    label: 'Ordered Qty',
                    data: data.map(d => d.product_uom_qty),
                    hoverOffset: 4,
                    backgroundColor: "blue",
                    type:"line",
                    borderColor: "blue",
                    yAxisID: "Qty",
                    order: 0,
                  }]
            },
            scales:{
                yAxis: [
                    { id: 'Qty', position: 'right'},
                    { id: 'Total', position: 'left'},
                ]
//                Qty: {
//                    position: 'right',
//                }
            },
            domain,
            label_field: 'partner_id',
        }
    }


    setup() {

        this.state = useState({
            quotations: {
                value: 10,
                percentage: 6,
            },
            period: 90,
        })
        this.orm = useService("orm")
        this.actionService = useService("action")

        onWillStart(async ()=>{
            this.getDates();
            await this.getQuotations()
            await this.getOrders()

            await this.getTopProducts()
            await this.getTopSalesPeople()
            await this.getMonthlySales()
            await this.getPartnerOrders()
        })
    }

    async onChangePeriod(){
        this.getDates()
        await this.getQuotations()
        await this.getOrders()

        await this.getTopProducts()
        await this.getTopSalesPeople()
        await this.getMonthlySales()
        await this.getPartnerOrders()
    }

    getDates(){
        var d = new Date();
        d.setDate(d.getDate() - this.state.period);
        this.state.current_date = d.toLocaleString()
        var previous_date = new Date();
        previous_date.setDate(previous_date.getDate() - this.state.period * 2);
        this.state.previous_date = previous_date.toLocaleString()
    }

    async getQuotations(){
        let domain = [['state', 'in', ['sent', 'draft']]]
        if (this.state.period > 0){
            domain.push(['date_order','>', this.state.current_date])
        }
        
        const data = await this.orm.searchCount("sale.order", domain)
        this.state.quotations.value = data

        // Previous Period
        let prev_domain = [['state', 'in', ['sent', 'draft']]]
        if (this.state.period > 0){
            prev_domain.push(['date_order','>', this.state.previous_date], ['date_order','<=', this.state.current_date])
        }

        const prev_data = await this.orm.searchCount("sale.order", domain)
        const percentage = ((data - prev_data)/prev_data) * 100
        console.log(percentage, "---Percentage-----")
        this.state.quotations.percentage = percentage

    }

    async getOrders(){

        console.log(this.state.current_date, "--------Current Date----------", this.state.previous_date)

        let domain = [['state', 'in', ['sale', 'done']]]
        if (this.state.period > 0){
            domain.push(['date_order','>', this.state.current_date])
        }

        const data = await this.orm.searchCount("sale.order", domain)
//        this.state.quotations.value = data

        // Previous Period
        let prev_domain = [['state', 'in', ['sale', 'done']]]
        if (this.state.period > 0){
            prev_domain.push(['date_order','>', this.state.previous_date], ['date_order','<=', this.state.current_date])
        }

        const prev_data = await this.orm.searchCount("sale.order", domain)

        const percentage = ((data - prev_data)/prev_data) * 100

        // revenues
        const current_revenues = await this.orm.readGroup("sale.order", domain, ["amount_total:sum"], [])
        const prev_revenues = await this.orm.readGroup("sale.order", prev_domain, ["amount_total:sum"], [])
        const revenues_percentage = ((current_revenues[0].amount_total - prev_revenues[0].amount_total)/prev_revenues[0].amount_total) * 100
        console.log(current_revenues, "--urrent Revenuews----------", revenues_percentage)

        // average
        const current_average = await this.orm.readGroup("sale.order", domain, ["amount_total:avg"], [])
        const prev_average = await this.orm.readGroup("sale.order", prev_domain, ["amount_total:avg"], [])
        const average_percentage = ((current_average[0].amount_total - prev_average[0].amount_total)/prev_average[0].amount_total) * 100
        console.log(current_average, "--urrent Revenuews----------", average_percentage)

        this.state.orders = {
            value: data,
            percentage: percentage.toFixed(2),
            revenues: `$${(current_revenues[0].amount_total/1000).toFixed(2)}K`,
            revenues_percentage: revenues_percentage.toFixed(2),
            average: `$${(current_average[0].amount_total/1000).toFixed(2)}K`,
            average_percentage: average_percentage.toFixed(2),
        }

    }

    viewQuotations(){
//        this.actionService.doAction("sale.action_quotations_with_onboarding",{
//            additionalContext: {
//                search_default_draft: 1,
//            }
//        })

        let domain = [['state', 'in', ['sent', 'draft']]]

        if(this.state.period > 0){
            domain.push(['date_order', '>', this.state.current_date])
        }

        let list_view = this.orm.searchRead("ir.model.data", [['name', '=', 'view_quotation_tree_with_onboarding']], ['res_id'])

        this.actionService.doAction({
            type: "ir.actions.act_window",
            name: "Quotations",
            res_model: "sale.order",
            domain,
            views: [
                [false, "list"],
                [false, "form"],
            ]
        })
    }

    viewOrders(){
        let domain = [['state', 'in', ['sale', 'done']]]
        if(this.state.period > 0){
            domain.push(['date_order', '>', this.state.current_date])
        }

        this.actionService.doAction({
            type: "ir.actions.act_window",
            name: "Quotations",
            res_model: "sale.order",
            domain,
            contex: {group_by:['date_order']},
            views: [
                [false, "list"],
                [false, "form"],
            ]
        })
    }

    viewRevenues(){
        let domain = [['state', 'in', ['sale', 'done']]]
        if(this.state.period > 0){
            domain.push(['date_order', '>', this.state.current_date])
        }

        this.actionService.doAction({
            type: "ir.actions.act_window",
            name: "Quotations",
            res_model: "sale.order",
            domain,
            contex: {group_by:['date_order']},
            views: [
                [false, "pivot"],
                [false, "form"],
            ]
        })
    }

}

MyAwesomeDashaBoard.template = "tic_tac.myOwlSalesDashboard";
MyAwesomeDashaBoard.components = { KpiCard, ChartRenderer }

registry.category("actions").add("tic_tac.my_awesome_dashboard", MyAwesomeDashaBoard);
