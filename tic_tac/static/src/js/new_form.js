/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import PortalSidebar from "@portal/js/portal_sidebar";
import { jsonrpc } from "@web/core/network/rpc_service";
import { renderToElement } from "@web/core/utils/render";


publicWidget.registry.tic_tac_new_form = publicWidget.Widget.extend({

    events: {
//        'click #get_form_data': '_onClickGetFormButton',
    },
    selector: '.new_form_page',

    init: function () {
        this._super.apply(this, arguments);
    },
    start: function () {
        var self = this;
        return this._super.apply(this, arguments).then(function () {
            self._onClickGetFormButton();
        });
    },

    _setStartValue: function (){
        console.log("Here0000000000000")
    },



    _onClickGetFormButton: function(e){
        console.log("THissssssssss||||||||||||||")
        jsonrpc('/get/form-data', {}).then(function (data) {
            console.log(data, "response=================")
            if (data) {
                console.log(data[0], "Here00000---------");
                var table = $('<table>').addClass('table');
                var header_row = '<thead><th>Name</th><th>First Name</th><th>Last Name</th><th>Birth Date</th><th>Email</th><th>Gender</th>'
                table.append(header_row)
                var row = '<tbody>'
                for (var i=0; i<data.length; i++){
                    row += '<tr class="info">';
                    row += '<td>' + data[i]['name'] + '</td>';
                    row += '<td>' + data[i]['first_name'] + '</td>';
                    row += '<td>' + data[i]['last_name'] + '</td>';
                    row += '<td>' + data[i]['birth_date'] + '</td>';
                    row += '<td>' + data[i]['email'] + '</td>';
                    row += '<td>' + data[i]['gender'] + '</td>';
                    row += '</tr>';
                }
                row += '</tbody>'
                table.append(row)
                console.log(table, "=====Table--------")
                $('#form_data_here').append(table)
            }
        });
    },

//    _onClickGetFormButton: function(e){
//        console.log("THissssssssss||||||||||||||")
//        jsonrpc('/get/form-data', {}).then(function (data) {
//            console.log(data, "response=================")
//            if (data) {
//                console.log(data[0], "Here00000---------");
//                var table = $('<table>').addClass('foo');
//                for (var i=0; i<data.length; i++){
//                    var row = $('<tr>').addClass('bar')
//                    var row_data = $('<td>').text(data[i]['name'])
//                    row.append(row_data)
//                    table.append(row)
//                }
//                console.log(table, "=====Table--------")
//                $('#form_data_here').append(table)
//            }
//        });
//    }


});
