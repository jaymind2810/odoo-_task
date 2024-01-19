from odoo import models, fields, api, _, Command, tools
from odoo.exceptions import ValidationError, UserError

class AccountMove(models.Model):
    _inherit = "account.move"


    def create(self, vals):
        account_move = super(AccountMove, self).create(vals)
        for data in account_move.invoice_line_ids:
            # if data.second_discount != 0:
            data._onchange_amount_new_demo()
        return account_move



class AccountMoveLine(models.Model):
    _inherit = "account.move.line"


    second_discount = fields.Float(
        string="2nd Disc. %")

    price_subtotal = fields.Monetary(
        string="Subtotal",
        compute='_compute_amount_second',
        store=True)

    @api.onchange('product_template_id', 'product_uom_qty', 'price_unit', 'tax_id', 'discount')
    def _onchange_amount_new_demo(self):
        print(self, "=====da==")
        self._compute_amount_second()

    @api.depends('second_discount')
    def _compute_amount_second(self):
        for line in self:
            if line.move_id.move_type == 'out_invoice':
                line.price_subtotal = line.price_subtotal - line.price_subtotal * (line.second_discount / 100.0)


#
# class AccountPaymentInherit(models.Model):
#     _inherit = "account.payment"
#
#
#     payment_sample_data = fields.Char(string="Payment Sample Field")

