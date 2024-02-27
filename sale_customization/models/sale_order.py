from datetime import datetime, date
from dateutil.relativedelta import relativedelta
from odoo import models, fields, api, _, Command, tools
from odoo.exceptions import ValidationError, UserError
import base64
from odoo.tools import misc
from odoo.http import request
from random import choice
from odoo.modules.module import get_resource_path, get_module_path


class SaleOrder(models.Model):
    _inherit = "sale.order"

    def _prepare_invoice_line(self, **kwargs):
        res = super(SaleOrder, self)._prepare_invoice_line(**kwargs)
        res['new_field'] = self.new_field  
        return res
    


    @api.constrains('order_line')
    def _check_product_availability(self):
        for line in self.order_line:
            print(line)
            if line.product_id.qty_available <= 0:
                raise ValidationError("Product %s is out of stock!\nForecasted Quantity: %s\nOn Hand Quantity: %s" % (
                        line.product_id.display_name,line.product_id.virtual_available, line.product_id.qty_available))


class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'

    line_ref = fields.Char(string='Line Ref')

    def _prepare_invoice_line(self, **optional_values):
        values = super(SaleOrderLine, self)._prepare_invoice_line(**optional_values)
        values.update({'line_ref': self.line_ref})
        print(values, "-------In Sale order Prepare Values------")
        return values


class StockPicking(models.Model):
    _inherit = "stock.picking"



class StockMove(models.Model):
    _inherit = 'stock.move'


    @api.model_create_multi
    def create(self, vals_list):
        print(vals_list, "======Value List-------")
        for data in range(len(vals_list)):
            print(data, "------_Data-------")
            if 'sale_line_id' in vals_list[data]:
                print("Herer-------------")
                oder_line = self.env['sale.order.line'].browse(vals_list[data]['sale_line_id'])
                print(oder_line, "======oder-----Line")
                vals_list[data].update({'line_ref': oder_line.line_ref})

        res = super(StockMove, self).create(vals_list)
        return res
    

    line_ref = fields.Char(string='Line Ref')


class StockMoveLine(models.Model):
    _inherit = 'stock.move.line'

    line_ref = fields.Char(string="Line Ref")


class AccountMoveLine(models.Model):
    _inherit = 'account.move'


class AccountMoveLine(models.Model):
    _inherit = 'account.move.line'


    line_ref = fields.Char(string='Line Ref')

    
    
