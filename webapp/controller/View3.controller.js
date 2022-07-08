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

            bState : true,

            onInit: function() {
                var oData = {
                    orders: [
                        {orderNum : "001",  product: "필통", price: 1000, warehouse: "A창고"},
                        {orderNum : "007", product : "냉장고", price: 1000000, warehouse: "D창고"},
                        {orderNum : "003", product : "스마트폰", price: 980000, warehouse: "A창고"},
                        {orderNum : "009", product : "연필", price: 600, warehouse: "C창고"},
                        {orderNum : "005", product : "지우개", price: 500, warehouse: "A창고"},
                        {orderNum : "002", product : "필통", price: 2300, warehouse: "B창고"}
                    ]
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);

                var oRouter = this.getRouter();
                oRouter.getRoute("ViewRouteName3").attachMatched(this._onRouteMatched.bind(this));
                
            },
            
            _onRouteMatched:function(oEvent){
                // var oArg = oEvent.getParameter("arguments");
                this.setView().setBusy(false);
            },

            onPressItem: function(oEvent) {
                var oModel = this.getView().getModel();

                // 내가 누른 행의 데이터 바인딩 경로 ex) '/orders/0'
                var sPath = oEvent.getSource().getBindingContextPath();
                var oRowData = oModel.getProperty(sPath); // 내가 선택한 행의 [전체] 데이터
                var sProduct = oRowData.warehouse;
                var sOrderNum = oRowData.orderNum;

                // MessageToast로 상품명 띄워주기
                // MessageToast.show(sProduct);

                // navTo 두번째화면, { name : } <- sProduct
                this.getRouter().navTo("objectPage", { order : sOrderNum });
            },

            onViewSetting : function() {
                this._openDialog();
            },

            handleConfirm : function(oEvent) {
                // viewSettingDialog 의 컨펌 이벤트 파라미터로 사용자의 설정값을 받아옴
                var sSortPath = oEvent.getParameter("sortItem").getKey();
                var bDesc = oEvent.getParameter("sortDescending");
                var sGroupPath = oEvent.getParameter("groupItem").getKey();
                var bGroupDesc = oEvent.getParameter("groupDescending");
                var oTable = this.getView().byId("table");
                var oModel = oTable.getBinding("items");

                var oSorter = new Sorter(sSortPath, bDesc, function(oContext) {
					var name = oContext.getProperty(sGroupPath);
					return {
						key: name,
						text: name
					};
				});
                oModel.sort(oSorter);   // 테이블에 반영
                
            },

            _openDialog : function (sPage, fInit) {
                var oView = this.getView();
    
                // creates requested dialog if not yet created
                if (!this._mDialogs) {
                    this._mDialogs = Fragment.load({
                        id: oView.getId(),
                        name: "sap.training.sync.training.view.Dialog",
                        controller: this
                    }).then(function(oDialog){
                        oView.addDependent(oDialog);
                        if (fInit) {
                            fInit(oDialog);
                        }
                        return oDialog;
                    });
                }
                this._mDialogs.then(function(oDialog){
                    // opens the requested dialog
                    oDialog.open(sPage);
                });
            },

            onCheck: function(oEvent) {
                var oButton = oEvent.getSource();   // 버튼
                var oInput1 = this.getView().byId("input1");
                var oInput2 = this.getView().byId("input2");
                var oInput3 = this.getView().byId("input3");
                var sValue1 = oInput1.getValue();
                var sValue2 = oInput2.getValue();
                var sValue3 = oInput3.getValue();

                // 체크대상 인풋창 id 목록
                var aInputIds = ["input1", "input2", "input3"];
                var iLength = aInputIds.length; // 배열의 길이
                // for (var i=0; i<iLength; i++) {
                //     var sId = aInputIds[i]; // 배열에서 id를 하나씩 꺼내옴
                //     var oInput = this.getView().byId(sId);
                //     var sValue = oInput.getValue();
                //     if (this.bState && oInput.getRequired() && sValue === "") {
                //         oInput.setValueState("Error");
                //         oInput.setValueStateText("필수값입니다");
                //     } else {
                //         oInput.setValueState("None");
                //     }
                // }

                // 배열을 뒤지면서 내부 펑션을 배열 요소 개수만큼
                // (index 위치의 element와 index가 바뀌면서) 수행
                var that = this; // 1) that 도 컨트롤러 라는 객체
                // aInputIds.forEach(function(element, index){
                //     // console.log(element, index);
                //     var sId = element; // aInputIds[i]; // 배열에서 id를 하나씩 꺼내옴
                //     var oInput = this.getView().byId(sId);
                //     var sValue = oInput.getValue();
                //     if (that.bState && oInput.getRequired() && sValue === "") {
                //         oInput.setValueState("Error");
                //         oInput.setValueStateText("필수값입니다");
                //     } else {
                //         oInput.setValueState("None");
                //     }
                // }.bind(this)); // 2) .bind(this) this scope를 맞춰줌
                // * forEach 사용시 주의할 점 (순차함수가 아님!!)
                // 사이클을 다 안돌고 아래 코드를 실행시킬 경우가 있음

                var oBox = this.getView().byId("box1");
                console.log(oBox)
                oBox.getItems().forEach(function(element){ // 박스 안의 아이템을 하니씩 체크
                    // console.log(element instanceof Input); // 왼쪽이 오른쪽으로부터 만들어진 인스턴스 인지 boolean 값으로 체크 , 친자검증
                    if (element instanceof Input) {
                        var oInput = element; // this.getView().byId(sId);
                        var sValue = oInput.getValue();
                        if (that.bState && oInput.getRequired() && sValue === "") {
                            oInput.setValueState("Error");
                            oInput.setValueStateText("필수값입니다");
                        } else {
                            oInput.setValueState("None");
                        }
                    }
                })


                // validation check 입력값 검증
                // if (this.bState && oInput1.getRequired() && sValue1.length === 0) {
                //     oInput1.setValueState("Error");
                //     oInput1.setValueStateText("필수값입니다");
                // } else {
                //     oInput1.setValueState("None");
                // }

                // if (this.bState && oInput2.getRequired() && sValue2.length === 0) {
                //     oInput2.setValueState("Error");
                //     oInput2.setValueStateText("필수값입니다");
                // } else {
                //     oInput2.setValueState("None");
                // }

                // if (this.bState && oInput3.getRequired() && sValue3.length === 0) {
                //     oInput3.setValueState("Error");
                //     oInput3.setValueStateText("필수값입니다");
                // } else {
                //     oInput3.setValueState("None");
                // }

                if (this.bState) {
                    oButton.setText("초기화");
                } else {
                    oButton.setText("제출");
                }
                
                this.bState = !this.bState;
            },

            onSearchOrderNum: function(){
                var tb = this.getView().byId("table");
                var oTableBinding = tb.getBinding("items");

                var sSearchText = this.getView().byId("orderNumInput").getValue();
                var oSearchOrderNumFilter = new Filter({
                    path:'orderNum',
                    operator: FilterOperator.Contains,
                    value1: sSearchText
                });
                
                var sProductText = this.getView().byId("orderProductInput").getValue();
                var oSearchOrderProductFilter = new Filter({
                    path:'product',
                    operator:FilterOperator.Contains,
                    value1:sProductText
                })

                var aFilter = [];
                if (sSearchText.length !== 0) {
                    aFilter.push(oSearchOrderNumFilter);                    
                } 
                if (sProductText.length !== 0){
                    aFilter.push(oSearchOrderProductFilter);                    
                }

                oTableBinding.filter(aFilter);
            }
        });
    });
