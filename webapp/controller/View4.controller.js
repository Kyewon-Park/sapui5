sap.ui.define([
    // "sap/ui/core/mvc/Controller",
    "sap/training/sync/training/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",

    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "../model/daumPost",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/m/Input"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, formatter, Filter,
        FilterOperator, Sorter, Fragment, Dialog, daumPost, MessageToast, History, UIComponent, Input) {

        "use strict";

        return BaseController.extend("sap.training.sync.training.controller.View3", {


            onInit: function() {
                var oData = {
                    orders: [
                        {orderNum : "001", product : "필통", price: 1000, warehouse: "A창고", customer: "삼성"},
                        {orderNum : "007", product : "냉장고", price: 1000000, warehouse: "D창고", customer: "LG"},
                        {orderNum : "003", product : "스마트폰", price: 980000, warehouse: "A창고", customer: "LG"},
                        {orderNum : "009", product : "연필", price: 600, warehouse: "C창고", customer: "삼성"},
                        {orderNum : "005", product : "지우개", price: 500, warehouse: "A창고", customer: "LG"},
                        {orderNum : "002", product : "필통", price: 2300, warehouse: "B창고", customer: "현대"}
                    ],
                    customers : [
                        {
                            customerName: "삼성", contract: "010-0000-1010", email: "sss@samsung.com", address: "강남 삼성", post: "00232"
                        },{
                            customerName: "LG", contract: "010-9999-1010", email: "ggg@lg.com", address: "여의도 삼성", post: "01232"
                        },{
                            customerName: "현대", contract: "010-0111-1010", email: "hhh@hyundai.com", address: "양재 현대", post: "09332"
                        }
                    ],
                    customer: {}
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);

                var oRouter = this.getRouter();
                oRouter.getRoute("objectPage").attachMatched( this._onRouteMatched.bind(this) );
            },

            _onRouteMatched: function(oEvent) {

                var oArg = oEvent.getParameter("arguments");
                console.log(oArg);
                var sOrderNum = oArg.order;

                var oModel = this.getView().getModel();
                var aOrderData = oModel.getProperty("/orders");
                var aCustomerData = oModel.getProperty("/customers");
                var sCustomerName = "";
                for (var i=0; i<aOrderData.length; i++) {
                    if (aOrderData[i].orderNum === sOrderNum) {     // 내가 지금화면으로 넘어올때 전달받은 주문번호가 실제 데이터에 있는지 찾고있는 조건
                        sCustomerName = aOrderData[i].customer;
                        // 실제 데이터안에서 그 주문건의 고객정보를 읽어오기
                        for (let j = 0; j < aCustomerData.length; j++) {
                            if (sCustomerName == aCustomerData[j].customerName){
                                oModel.setProperty("/customer", aCustomerData[j]);
                                console.log(oModel.getProperty("/customer"))
                                break;
                            }
                        }
                        break;
                    }
                    if (i === aOrderData.length-1) {
                        MessageToast.show("주문번호가 잘못되었습니다.")
                    }
                }

            },
        });
    });
