sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.training.sync.training.controller.View1", {
            onInit: function () {
                var oData = {
                    operator: [
                        {
                            keyName: "add",
                            valueName: "+"
                        },
                        {
                            keyName: "minus",
                            valueName: "-"
                        },
                        {
                            keyName: "mul",
                            valueName: "*"
                        },
                        {
                            keyName: "div",
                            valueName: "/"
                        },
                    ]
                }

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);

                //값이 없으면 안보이는 속성
                var oData1 = {
                    bVisible: true,
                    bEditable: true,
                    bButtonEnable: false,
                }
                var oViewModel = new JSONModel(oData1);
                this.getView().setModel(oViewModel,"oView");


            },

            checkDivException: function(){
                //연산자 key값
                var sSelect = this.getView().byId("select1").getSelectedKey();
                //input2 값
                var sInput2 = this.getView().byId("input2").getValue();
                console.log(sSelect, sInput2);
                //get model
                var oViewModel = this.getView().getModel("oView")

                var oInput1 = this.getView().byId("input1");
                var oInput2 = this.getView().byId("input2");
                var sl1 = oInput1.getValue().length;
                var sl2 = oInput2.getValue().length;

                if (sSelect === 'div' && sInput2 === '0'){
                        console.log("inside,", oViewModel.getProperty("/bButtonEnable"))
                        oViewModel.setProperty("/bButtonEnable", false);
                } else if (sl1==0 || sl2==0){
                    oViewModel.setProperty("/bButtonEnable", false);
                } else{
                    oViewModel.setProperty("/bButtonEnable", true);
                }
            },


            onEnableButton: function(){
                var oInput1 = this.getView().byId("input1");
                var oInput2 = this.getView().byId("input2");
                var sl1 = oInput1.getValue().length;
                var sl2 = oInput2.getValue().length;
                // var bStatus1 = new Boolean(sl1);
                // var bStatus2 = new Boolean(sl2);
                console.log(sl1,sl2);
                var oViewModel = this.getView().getModel("oView");
                var bFlag = false;//
                if (sl1!==0 && sl2!==0){ //둘다 값이 있을때만 킴
                    bFlag = true;
                    this.checkDivException();
                } else {
                    bFlag = false;
                }
                oViewModel.setProperty("/bButtonEnable", bFlag);

                
            },

            onCalc: function () {
                // var oViewModel = this.getView().getModel("oView");
                var oViewModel = this.getView().getModel();

                var oSelectBox = this.getView().byId("select1");
                var sSelectKey = oSelectBox.getSelectedKey();
                
                
                var sSelectValue = oSelectBox.getSelectedItem().getText();
                var oInput1 = this.getView().byId("input1");
                var oInput2 = this.getView().byId("input2");
                var oResult = this.getView().byId("input3");
                var estring = oInput1.getValue() + sSelectValue + oInput2.getValue();
                var iResult = eval(estring);
                
                // switch(sSelectKey){
                //     case 'add':
                //         iResult = parseInt(oInput1.getValue()) + parseInt(oInput2.getValue());
                //         break;
                //     case 'minus':
                //         iResult = parseInt(oInput1.getValue()) - parseInt(oInput2.getValue());
                //         break;
                //     case 'mul':
                //         iResult = parseInt(oInput1.getValue()) * parseInt(oInput2.getValue());
                //         break;
                //     case 'div':
                //         iResult = parseInt(oInput1.getValue()) / parseInt(oInput2.getValue());
                //         break;
                //     default:
                //         break

                // }
                oResult.setValue(iResult);

                
            },

            onChange: function (oEvent) {
                debugger;
                // var sv = oEvent.getParameter("value");
                // var svv = oEvent.getSource() //이벤트가 발생한 객체 대상.getValue() 
                var sv1 = this.getView().byId("input1").getValue();
                var sv2 = this.getView().byId("input2").getValue();

                var iResult;
                if (sv1.length === 0 && sv2.length === 0) {
                    iResult = '';
                } else if (sv1.length === 0) {
                    iResult = parseInt(sv2);
                } else if (sv2.length === 0) {
                    iResult = parseInt(sv1);
                } else {
                    iResult = parseInt(sv1) + parseInt(sv2);
                }
                var oResult = this.getView().byId("input3");
                oResult.setValue(iResult);
            },

            onLiveChange: function () {
                var sv1 = this.getView().byId("input1").getValue();
                var sv2 = this.getView().byId("input2").getValue();

                var iResult;
                if (sv1.length === 0 && sv2.length === 0) {
                    iResult = '';
                } else if (sv1.length === 0) {
                    iResult = parseInt(sv2);
                } else if (sv2.length === 0) {
                    iResult = parseInt(sv1);
                } else {
                    iResult = parseInt(sv1) + parseInt(sv2);
                }
                var oResult = this.getView().byId("input3");
                oResult.setValue(iResult);
            },

        });
    });
