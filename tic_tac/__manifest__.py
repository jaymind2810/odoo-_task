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
            'tic_tac/static/src/scss/calculator.scss',
            'tic_tac/static/src/xml/calculator_page.xml',
            'tic_tac/static/src/js/calculator.js',
            'tic_tac/static/src/js/counter_component.js',
            'tic_tac/static/src/xml/my_awesome_counter.xml',
            'tic_tac/static/src/js/todo_item.js',
            'tic_tac/static/src/js/awesome_dashboard.js',
            'tic_tac/static/src/js/some_card.js',
            # 'tic_tac/static/src/js/toggel_button.js',
            'tic_tac/static/src/js/counter/counter.js',
            'tic_tac/static/src/js/counter/counter.xml',

        ],
        'web.assets_frontend': [
            'tic_tac/static/src/js/new_form.js',

        ],
    },

}