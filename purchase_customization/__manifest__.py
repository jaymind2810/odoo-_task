{
    'name': "Purchase Customization",
    'version': '17.0.1.0',
    'category': 'Education',
    'sequence': 4,
    'summary': "Purchase Customization Task",
    'author': 'Jaymin Patel',
    'website': '',
    'depends': [
        'sale',
        'purchase',
        'stock',
        'account',
    ],
    'data': [
        # 'security/ir.model.access.csv',
        'views/purchase_order_view.xml',
        'report/bill_report.xml',
        'report/purchase_report.xml',
    ],
    'demo': [
    ],
    'assets': {
        'web.report_assets_pdf': [
            # '/customer_sss/static/src/scss/fonts.scss',
        ],
        'web.assets_frontend': [],
    },
    'installable': True,
    'auto_install': False,
    'application': True,
    'price': 75,
    'currency': 'EUR',
    'license': 'Other proprietary',
}
