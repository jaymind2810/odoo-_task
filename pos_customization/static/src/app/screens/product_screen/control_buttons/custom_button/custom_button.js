/** @odoo-module */
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { CustomButtonPopup } from "@pos_customization/app/screens/product_screen/control_buttons/custom_button_popup";
import { useService } from "@web/core/utils/hooks";
import { usePos } from "@point_of_sale/app/store/pos_hook";
import { _t } from "@web/core/l10n/translation";
import { Component } from "@odoo/owl";
/**
* This class represents a custom button in the Point of Sale product screen.
*/
export class CustomButton extends Component {
    static template = "pos_customization.CustomButton";
     /**
     * Initializes the component and sets up necessary dependencies.
     */
     setup() {
         this.pos = usePos();
         this.popup = useService("popup");
     }
     /**
     * Handles the click event of the Custom button.
     * Opens a popup for adding products and updates the order.
     */
     async click() {
         const order = this.pos.get_order();
         await this.popup.add(CustomButtonPopup, {
            title: _t("Customer Details"),
         });
     }
}
// Adds the custom button to the ProductScreen controls.
ProductScreen.addControlButton({
    component: CustomButton,
     condition: function () {
            return true;
        },
});