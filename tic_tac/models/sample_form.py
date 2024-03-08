from odoo import models, fields, api


class SampleForm(models.Model):
    _name = "sample.form"
    _description = "Sample Form"
    _inherit = ['mail.thread', 'mail.render.mixin']
    _rec_name = "name"

    name = fields.Char(
        'Name')
    first_name = fields.Char(
        'First Name')
    last_name = fields.Char(
        'Last Name')
    birth_date = fields.Date(
        'Birth Date')
    email = fields.Char(
        'Email')
# states={'done': [('readonly', True)]})
    gender = fields.Selection(
        [('m', 'Male'), ('f', 'Female'), ('o', 'Other')],
        string='Gender')
    state = fields.Selection([
        ('draft', 'Draft'),
        ('confirm', 'Confirmed'),
        ('cancel', 'Cancelled'),
        ('done', 'Done')],
        default='draft', tracking=True, string="Status")