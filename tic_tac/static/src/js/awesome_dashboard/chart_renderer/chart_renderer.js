/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, onWillStart, useRef, onMounted, useEffect, onWillUnmount } from  "@odoo/owl";
import { loadJS } from "@web/core/assets"
import { useService } from "@web/core/utils/hooks";


export class ChartRenderer extends Component {

    setup() {
        this.chartRef = useRef("chart")
        this.actionService = useService("action")

        onWillStart(async ()=>{
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js")
//            await loadJS("/web/static/lib/Chart/Chart.js");
        })

        useEffect(()=>{
            this.renderChart()
        }, ()=>[this.props.config])

        onMounted(()=>this.renderChart())

        onWillUnmount(()=>{
            if (this.chart){
                this.chart.destroy()
            }
        })
    }

    renderChart(){
        if (this.chart){
            this.chart.destroy()
        }
        this.chart = new Chart(this.chartRef.el,
            {
              type: this.props.type,
              data: this.props.config.data,
              options:{
                onClick: (e) => {
                    const active = e.chart.getActiveElements()

//                    const [activeElement] = this.chart.getElementAtEvent(e);
//                    if (!activeElement) {
//                        return;
//                    }
//                    const { _datasetIndex, _index } = activeElement;


                    if(active){
                        const label = e.chart.data.labels[active[0].index]
                        const dataset = e.chart.data.datasets[active[0].index].label
////
//                        const label = this.chart.data.labels[_index]
//                        const dataset = this.chart.data.datasets[_datasetIndex].label

                        const { label_field, domain } = this.props.config

                        let new_domain = domain ? domain : []

                        if (label_field){
                            if (label_field.includes('date')){
                                const [month, year] = label.split(' ');

                                var y = year
                                var m = month

//                                var date = new Date(), y = date.getFullYear(), m = date.getMonth();
//                                var date = new Date()
//                                var firstDay = new Date(y, m, 1);
//                                console.log(firstDay, "-----------__First Dayte0000000000000000000")
//                                var lastDay = new Date(y, m + 1, 0);

//
//                                const timeStamp = Date.parse(label)
//                                console.log(timeStamp, "========Time Stamp ========", typeof(timeStamp))
//                                let month1 = timeStamp.getMonth();
//                                console.log(month1, "========Month Time Stamp ========")
                            } else {
                                new_domain.push([label_field, '=', label])
                            }
                        }

                        if (dataset == 'Quotations') {
                            new_domain.push(['state', 'in', ['draft', 'sent']])
                        }

                        if (dataset == 'Orders') {
                            new_domain.push(['state', 'in', ['sale', 'done']])
                        }

                        this.actionService.doAction({
                            type: "ir.actions.act_window",
                            name: this.props.title,
                            res_model: "sale.report",
                            domain: new_domain,
                            views : [
                                [false, "list"],
                                [false, "form"],
                            ],
                        })
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        position : 'bottom',
                    },
                    title: {
                        display: true,
                        text: this.props.title,
                        position : 'bottom',
                    }
                },
                scales: 'scales' in this.props.config ? this.props.config.scales : {},
              }
            }
          );
    }

}

ChartRenderer.template = "tic_tac.ChartRenderer";

