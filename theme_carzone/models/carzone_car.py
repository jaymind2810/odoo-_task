from odoo import models, fields, api, _, Command, tools


class CarZoneCar(models.Model):
    _name = "carzone.car"
    _description = "Car Details"
    _rec_name = 'name'

    name = fields.Char(string="Car Name")
    car_image = fields.Image(string="Car Image")
    car_model_name = fields.Char(string="Car Model")
    address = fields.Char(string="Address")
    city = fields.Char(string="City")
