from odoo import models, fields, api, _, Command, tools
from odoo.exceptions import ValidationError, UserError

class SaleOrder(models.Model):
    _inherit = "sale.order"


class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'


    second_discount = fields.Float(
        string="2nd Disc. %")

    price_subtotal = fields.Monetary(
        string="Subtotal",
        compute='_compute_amount_second',
        store=True)

    @api.depends('second_discount')
    def _compute_amount_second(self):
        print(self, "=========+here =====This is the New compute_amount_second")
        self.price_subtotal = self.price_subtotal - self.price_subtotal * (self.second_discount / 100.0)


    @api.onchange('product_template_id', 'product_uom_qty', 'price_unit', 'tax_id', 'discount')
    def _onchange_amount_new_demo(self):
        print(self, "=====da==")
        self._compute_amount_second()

    def _prepare_invoice_line(self, **optional_values):
        res = super(SaleOrderLine, self)._prepare_invoice_line(**optional_values)
        res['second_discount'] = self.second_discount
        res['price_subtotal'] = self.price_subtotal
        return res

