from odoo import models, fields, api, _, Command, tools


class PurchaseOrder(models.Model):
    _inherit = "purchase.order"

    # @api.constrains('order_line')
    # def _check_product_availability(self):
    #     for line in self.order_line:
    #         print(line)
    #         if line.product_id.qty_available <= 0:
    #             raise ValidationError("Product %s is out of stock!\nForecasted Quantity: %s\nOn Hand Quantity: %s" % (
    #                     line.product_id.display_name,line.product_id.virtual_available, line.product_id.qty_available))


class PurchaseOrderLine(models.Model):
    _inherit = 'purchase.order.line'

    purchase_line_ref = fields.Char(string='Purchase Line Ref')

    def _prepare_account_move_line(self, **optional_values):
        values = super(PurchaseOrderLine, self)._prepare_account_move_line(**optional_values)
        print(values, "-------In Purchase order Prepare Values------")
        values.update({'purchase_line_ref': self.purchase_line_ref})
        return values



# class StockPicking(models.Model):
#     _inherit = "stock.picking"
#
#

class StockMove(models.Model):
    _inherit = 'stock.move'


    @api.model_create_multi
    def create(self, vals_list):
        print(vals_list, "======Value List---In Purchase------")
        for data in range(len(vals_list)):
            print(data, "------_Data-------")
            if 'purchase_line_id' in vals_list[data]:
                # print("Herer-------------")
                oder_line = self.env['purchase.order.line'].browse(vals_list[data]['purchase_line_id'])
                # print(oder_line, "======oder-----Line")
                vals_list[data].update({'purchase_line_ref': oder_line.purchase_line_ref})

        res = super(StockMove, self).create(vals_list)
        return res


    purchase_line_ref = fields.Char(string='Purchase Line Ref')


class StockMoveLine(models.Model):
    _inherit = 'stock.move.line'

    purchase_line_ref = fields.Char(string="Purchase Line Ref")


class AccountMoveLine(models.Model):
    _inherit = 'account.move'


class AccountMoveLine(models.Model):
    _inherit = 'account.move.line'


    purchase_line_ref = fields.Char(string="Purchase Line Ref")

    
    
