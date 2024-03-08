from odoo import http
from odoo.http import request,Response


class Main(http.Controller):
    @http.route(['/registration'], website=True, auth='user', csrf=False, methods=['GET'])
    def new_registration_form(self, **post):
        values = {}
        print(values, "Here-----In Form View========")

        return request.render("tic_tac.sample_new_form_template", values)

    @http.route(['/get/form-data'], type="json", auth="user", website=True)
    def get_new_registration_form(self, **post):
        data = request.env['sample.form'].sudo().search([])
        print(data, "-___Daata0000------")
        form_data_list = []
        for row in data:
            form_dict = {}
            form_dict['name'] = row.name
            form_dict['first_name'] = row.first_name
            form_dict['last_name'] = row.last_name
            form_dict['birth_date'] = row.birth_date
            form_dict['email'] = row.email
            form_dict['gender'] = row.gender
            form_data_list.append(form_dict)
        return form_data_list
    
    
    
    
    #
    # @http.route(['/new-building-demo'], website=True, auth='user', csrf=False)
    # def get_new_building_data(self, **post):
    #     print("Here....First")
    #     # buil_details = request.env['building'].sudo().search([])
    #     # # print(buil_details, "============Buil_details")
    #     # return request.render("building_menagement.new_building_demo", {"information" : buil_details})
    #     return request.render("building_menagement.new_building_demo", {})
    #
    # @http.route(['/new-building-demo/get'], type='json', website=True, auth='user', csrf=False)
    # def get_new_building1_data(self, **post):
    #     # print("Here....")
    #     building_data = request.env['building'].sudo().search([])
    #     # print(buil_details, "============Buil_details")
    #     return building_data