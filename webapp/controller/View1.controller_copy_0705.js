sap.ui.define([ // (1) 라이브러리를 컨트롤러에서 사용할 때 종속성을 등록해서 사용
    "sap/ui/core/mvc/Controller",    // (2) 모든 UI5 프레임워크 내에서 구동하는 컨트롤러 기능을 가진 원본
    "sap/ui/model/json/JSONModel",
	"../model/formatter", // ../ <- 상위폴더

	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/Sorter",
    "sap/ui/core/Fragment",
    "sap/m/Dialog"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, formatter, Filter, FilterOperator, Sorter, Fragment, Dialog) { 
        // (1) define에서 등록한 라이브러리의 이름을 등록해서 내부에서 그 이름 그대로 사용
        "use strict";

        /** 
         * (2) controller 의 extend 메소드를 이용해서 지금 이 컨트롤러 -> .extend("...") 이 파일을 확장해서 사용
         * .extend("[컨트롤러 파일명]", { [ 내 컨트롤러 로직 코드 (우리가 작성하는 장소, 노트) ] })
         */
        return Controller.extend("sap.sync.ui5training.controller.View1", {
            
            onInit: function(){
                var oData = {
                    sValue1 : "",
                    sValue2 : "",
                    sResult : "",
                    dateString : "",
                    results: [
                        {string:"1"},
                        {string:"2"},
                        {string:"3"},
                        {string:"4"},
                        {string:"5"},
                        {string:"6"},
                        {string:"7"},
                        {string:"8"},
                        {string:"9"},
                    ],
                }
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);
            },

            onCompare: function(){
                console.log(this.getView())
                var sInput1 = this.getView().byId("num1").getValue(),
                    sInput2 = this.getView().byId("num2").getValue();
                
                var result="";
                if (sInput1 !== "" && sInput2 !== "" ){
                    var iInput1 = parseInt(sInput1);
                    var iInput2 = parseInt(sInput2);
                    if (iInput1 === iInput2){
                        result="="
                    } else {
                        result = (iInput1 > iInput2) ? '>' : '<';
                    }
                }
                var oInput3 = this.getView().byId("resultBox");
                oInput3.setValue(result);
            },

            onCompareByPropertyBinding: function(){
                var oViewModel = this.getView().getModel();

                var sInput1 = oViewModel.getProperty("/sValue1"),
                    sInput2 = oViewModel.getProperty("/sValue2");
                
                var result="";
                if (sInput1 !== "" && sInput2 !== "" ){
                    var iInput1 = parseInt(sInput1);
                    var iInput2 = parseInt(sInput2);
                    if (iInput1 === iInput2){
                        result="="
                    } else {
                        result = (iInput1 > iInput2) ? '>' : '<';
                    }
                }
                oViewModel.setProperty("/sResult", result);
            },

            onDateChange: function(oEvent){
                var oViewModel = this.getView().getModel();
                var oDatePicker = oEvent.getSource(),
                    oDate = oDatePicker.getDateValue(); //Date형식의 값을 추출

                var totalDate = oDate.getFullYear() +'-' + (oDate.getMonth() + 1).toString().padStart(2, '0') + '-' + oDate.getDate().toString().padStart(2, '0');

                oViewModel.setProperty("/dateString", totalDate );
            },

            onCalc: function(){
                var oViewModel = this.getView().getModel();

                var iInput1 = parseInt(this.getView().byId("num1").getValue());
                iInput1 -= 1                

                for (let i = iInput1; i >= -iInput1; i--) {
                    // var iInput = parseInt(sInput1);
                    // var s = sInput1 + ' * ' + (i+1) + ' = ' + (iInput*(i+1));
                    var s = '*'.repeat((iInput1+1)-Math.abs(i));
                    oViewModel.setProperty(`/results/${Math.abs(iInput1-i)}/string`,s);
                }

            },




        });
    });