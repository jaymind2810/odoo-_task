/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";
import PortalSidebar from "@portal/js/portal_sidebar";
import { jsonrpc } from "@web/core/network/rpc_service";
import { renderToElement } from "@web/core/utils/render";


const FeaturedCarzoneSnippet = publicWidget.Widget.extend({
    selector: '#featured_cars',

    start: function () {
        console.log("00000000---------0000000000")
        var self = this;
        return this._super.apply(this, arguments).then(function () {
            self._onClickGetFormButton();
        });
    },

    _onClickGetFormButton: function(e){
        console.log("THissssssssss||||||||||||||")
        let car_datails_row = this.el.querySelector('#featured_single_car')
        console.log(car_datails_row, "---------Car Details=============")
        jsonrpc('/get_featured_car', {}).then(function (data) {
            console.log(data, "response=================")
            if (data) {
                data.forEach(car=> {
                    console.log(car, "-----Car--------")
                })
                let html = ''
                data.forEach(car=>{
                      html += `<div class="slick-slide-item" style="width: 380px;">
                                    <div class="car-box-3">
                                        <div class="car-thumbnail">
                                            <a href="car-details.html" class="car-img">
                                                <div class="tag-2">Featured</div>
                                                <div class="price-box">
                                                    <span class="del"><del>$805.00</del></span>
                                                    <br/>
                                                    <span>$780.00</span>
                                                </div>
                                                <img class="d-block w-100" src="data:image/png;base64,${ car.car_image }" alt="car"/>
                                            </a>
                                            <div class="carbox-overlap-wrapper">
                                                <div class="overlap-box">
                                                    <div class="overlap-btns-area">
                                                        <div class="car-magnify-gallery">
                                                            <a href="img/car/car-1.jpg" class="overlap-btn">
                                                                <i class="fa fa-expand"></i>
                                                                <img class="hidden" src="/theme_carzone/static/src/img/car/car-1.jpg"/>
                                                            </a>
                                                            <a href="img/car/car-2.jpg" class="hidden">
                                                                <img class="hidden" src="/theme_carzone/static/src/img/car/car-2.jpg"/>
                                                            </a>
                                                            <a href="img/car/car-3.jpg" class="hidden">
                                                                <img class="hidden" src="/theme_carzone/static/src/img/car/car-3.jpg"/>
                                                            </a>
                                                            <a href="img/car/car-4.jpg" class="hidden">
                                                                <img class="hidden" src="/theme_carzone/static/src/img/car/car-4.jpg"/>
                                                            </a>
                                                            <a href="img/car/car-5.jpg" class="hidden">
                                                                <img class="hidden" src="/theme_carzone/static/src/img/car/car-5.jpg"/>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="detail">
                                            <h1 class="title">
                                                <a href="car-details.html">${ car.name } ${ car.car_model_name }</a>
                                            </h1>
                                            <div class="location">
                                                <a href="car-details.html">
                                                    <i class="flaticon-pin"></i>${ car.address } ${ car.city }
                                                </a>
                                            </div>
                                            <ul class="facilities-list clearfix">
                                                <li>Petrol</li>
                                                <li>4,000 km</li>
                                                <li>Manual</li>
                                                <li>Sport</li>
                                                <li>white</li>
                                                <li>2020</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>`
                });
                car_datails_row.innerHTML = html
            }
        });
    },


});

publicWidget.registry.featured_carzone_dynamic_snippet = FeaturedCarzoneSnippet;

export default FeaturedCarzoneSnippet;

