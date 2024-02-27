# Part of OpenEduCat. See LICENSE file for full copyright & licensing details.

##############################################################################
#
#    OpenEduCat Inc.
#    Copyright (C) 2009-TODAY OpenEduCat Inc(<http://www.openeducat.org>).
#
##############################################################################

from odoo import http, modules, SUPERUSER_ID
from odoo.http import request
from datetime import datetime, date
from odoo.addons.website.controllers.form import WebsiteForm
from odoo.addons.openeducat_esign.controllers.main import SignDocument
import string
import random
import base64
from odoo.exceptions import ValidationError


class Main(http.Controller):
    pass