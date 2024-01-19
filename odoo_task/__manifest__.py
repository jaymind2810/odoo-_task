{
    'name' : 'Odoo Task',
    'version' : '16.0.0.1',
    'depends' : ['web','mail','website_sale', 'sale', 'account', 'purchase'],
    'author' : 'anand',
    'category' : 'category',
    'description' : """
    Hello welcome to Odoo Tasks.
    """,
    'data' : [
       
        # 'security/ir.model.access.csv',
        'views/sale_order_line_view.xml',
        'views/account_move_line_view.xml',
        'report/sale_order_quation_inherit.xml',
    ],
    'demo': [
    ]

}