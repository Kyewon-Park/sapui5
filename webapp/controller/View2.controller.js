sap.ui.define([ // (1) 라이브러리를 컨트롤러에서 사용할 때 종속성을 등록해서 사용
    "sap/training/sync/training/controller/BaseController",    // (2) 모든 UI5 프레임워크 내에서 구동하는 컨트롤러 기능을 가진 원본
    "sap/ui/model/json/JSONModel",
	"../model/formatter", // ../ <- 상위폴더

	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
    "sap/ui/core/Fragment",
    "sap/m/Dialog",
    "../model/daumPost",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, formatter, Filter, FilterOperator, Sorter,
        Fragment, Dialog, daumPost, MessageToast, History, UIComponent) { 
        // (1) define에서 등록한 라이브러리의 이름을 등록해서 내부에서 그 이름 그대로 사용
        "use strict";

        /** 
         * (2) controller 의 extend 메소드를 이용해서 지금 이 컨트롤러 -> .extend("...") 이 파일을 확장해서 사용
         * .extend("[컨트롤러 파일명]", { [ 내 컨트롤러 로직 코드 (우리가 작성하는 장소, 노트) ] })
         */
        return BaseController.extend("sap.training.sync.training.controller.View2", {
            
            onInit: function(){
                var oViewData = {
                    htmlContent: '<iframe width="560" height="315" src="https://www.youtube.com/embed/977et8J7uKQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
                }
                var oModel = new JSONModel(oViewData);
                this.getView().setModel(oModel);


                var oRouter = this.getRouter();
                oRouter.getRoute("ViewRouteName2").attachMatched(this._onRouteMatched, this);
                //라우터에서 View2로 이동할 때 matched이벤트가 발생하여 this(controller)의 _onRouteMatched함수 실행하게 함.
            },

            _onRouteMatched:function(oEvent){
                var oArg = oEvent.getParameter("arguments");
                var sName = oArg.name;

                this.getView().byId("displayParam").setText(sName);
            },

            // getRouter: function(){
            //     return UIComponent.getRouterFor(this); //컨트롤러의 라우터
            // },

            // onNavBack: function () {
            //     var oHistory, sPreviousHash;
    
            //     oHistory = History.getInstance();
            //     sPreviousHash = oHistory.getPreviousHash();
    
            //     if (sPreviousHash !== undefined) {
            //         window.history.go(-1); //window는 브라우저의 최상단 객체
            //     } else {
            //         this.getRouter().navTo("RouteView1", {}, true /*no history*/);
            //     }
            // }
        });
    });