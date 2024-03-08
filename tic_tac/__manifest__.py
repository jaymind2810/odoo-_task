{
    'name': 'Tic Tac',
    'version': '17.0.0.1',
    'depends': ['web','mail','website'],
    'author': 'Jaymin',
    'category': 'category',
    'description': """
    Sample Form js Module.
    """,
    'data': [
        'security/ir.model.access.csv',
        # 'security/floor.csv',
        'views/tic_tac_view.xml',
        'views/sample_form_view.xml',
        'controller/sample_form.xml',
        'menus/menu.xml',
          
            
    ],
    'demo': [],
    'assets': {
        'web.assets_backend': [
            # 'account/static/src/css/account_bank_and_cash.css',
            'tic_tac/static/src/scss/calculator.scss',
            'tic_tac/static/src/xml/calculator_page.xml',
            'tic_tac/static/src/js/calculator.js',
        ],
        'web.assets_frontend': [
            'tic_tac/static/src/js/new_form.js',

        ],
    },

}