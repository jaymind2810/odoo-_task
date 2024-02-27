/** @odoo-module */

// import { PosStore } from "@point_of_sale/app/store/pos_store";
// import { Order, Orderline } from "@point_of_sale/app/store/models";
// import { _t } from "@web/core/l10n/translation";
// import { patch } from "@web/core/utils/patch";
// import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";

// patch(PosStore.prototype, {
//     // is_french_country() {
//     //     var french_countries = ["FR", "MF", "MQ", "NC", "PF", "RE", "GF", "GP", "TF"];
//     //     if (!this.company.country) {
//     // this.env.services.popup.add(ErrorPopup, {
//     //     title: _t("Missing Country"),
//     //     body: _t("The company %s doesn't have a country set.", this.company.name),
//     // });
//     // return false;
//     //     }
//     //     return french_countries.includes(this.company.country?.code);
//     // },
//     disallowLineQuantityChange() {
//         const result = super.disallowLineQuantityChange(...arguments);
//         let selectedOrderLine = this.selectedOrder.get_selected_orderline();
//         //Note: is_reward_line is a field in the pos_loyalty module
//         if (selectedOrderLine?.is_reward_line) {
//             //Always allow quantity change for reward lines
//             return false || result;
//         }
//         return this.is_french_country() || result;
//     },
// });


// import { Component } from "@odoo/owl";
// import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
// import { usePos } from "@point_of_sale/app/store/pos_hook";
// export class ProductCombosButton extends Component {
//     static template = "custom_pos_screen.ProductCombosButton";
//     setup() {
//         this.pos = usePos();
//     }
//     async click() {
//         this.pos.showScreen("ProductCombosScreen");
//     }
// }
// ProductScreen.addControlButton({
//     component: ProductCombosButton,
//     condition: function () {
//         return true;
//     },
// });


// odoo.define('pos_customization.pos_product_confirm', function (require) {
//     'use strict';

// import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";

//     // const ProductScreen = require('point_of_sale.ProductScreen');
    
// const { Gui } = require('point_of_sale.Gui');

// const ProductScreenWidget = ProductScreen.prototype;

// ProductScreenWidget.clickProduct = function (product, event) {
//     const self = this;
//     Gui.showPopup('ConfirmPopup', {
//         title: 'Confirmation',
//         body: 'Are you sure you want to add this product to the cart?',
//         confirmText: 'Yes',
//         cancelText: 'No',
//         confirm: function () {
//             self._super(product, event);
//         },
//     });
// };

// });