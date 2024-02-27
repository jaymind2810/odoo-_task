{
    'name': "Sale Customization",
    'version': '17.0.1.0',
    'category': 'Education',
    'sequence': 3,
    'summary': "Sale Customization Task",
    'author': 'Jaymin Patel',
    'website': '',
    'depends': [
        'sale',
        'purchase',
    ],
    'data': [
        # 'security/ir.model.access.csv',
        'views/sale_order_view.xml',
        'report/sale_report.xml',
    ],
    'demo': [
    ],
    'assets': {
        'web.report_assets_pdf': [
            # '/customer_sss/static/src/scss/fonts.scss',
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
