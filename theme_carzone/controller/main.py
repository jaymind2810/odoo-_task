from odoo import http
from odoo.http import request


class DynamicSnippets(http.Controller):
  """This class retrieves data for the dynamic snippet"""

  @http.route('/get_featured_car', type='json', auth='public')
  def get_car_featred_data(self):
    car_details_ids = request.env['carzone.car'].search_read([], ['name', 'car_model_name', 'address', 'city', 'car_image'])
    return car_details_ids