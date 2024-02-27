{
    'name': "POS Customization",
    'version': '17.0.1.0',
    'category': 'Education',
    'sequence': 4,
    'summary': "Pos Customization Task",
    'author': 'Jaymin Patel',
    'website': '',
    'depends': [
        'sale',
        'purchase',
        'point_of_sale',
    ],
    'data': [
        # 'security/ir.model.access.csv',
        # 'views/sale_order_view.xml',
        # 'views/report.xml',
    ],
    'demo': [
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'custom_pos_screen/static/src/app/**/*',   
        ],
        'web.assets_frontend': [
            # 'customer_sss/static/src/js/000.js',
        ],
    },
    'installable': True,
    'auto_install': False,
    'application': True,
    'price': 75,
    'currency': 'EUR',
    'license': 'Other proprietary',
}
