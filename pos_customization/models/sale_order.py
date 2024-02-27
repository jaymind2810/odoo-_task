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


class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'


class StockPicking(models.Model):
    _inherit = "stock.picking"



    
    
