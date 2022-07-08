
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
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController, JSONModel, formatter, Filter, FilterOperator, Sorter, Fragment, Dialog, daumPost, MessageToast, UIComponent, MessageBox){ 
        // (1) define에서 등록한 라이브러리의 이름을 등록해서 내부에서 그 이름 그대로 사용
        "use strict";

        /** 
         * (2) controller 의 extend 메소드를 이용해서 지금 이 컨트롤러 -> .extend("...") 이 파일을 확장해서 사용
         * .extend("[컨트롤러 파일명]", { [ 내 컨트롤러 로직 코드 (우리가 작성하는 장소, 노트) ] })
         */
        return BaseController.extend("sap.training.sync.training.controller.View1", {
            
            onInit: function(){
                var oData = {
                    students:[
                        {name:"LWWE", score1:"B", score2:"F", result:"", address:""},
                        {name:"CSDDF", score1:"A", score2:"A", result:"", address:""},
                        {name:"LZXB", score1:"B", score2:"B", result:"", address:""},
                        {name:"ZBWE", score1:"C", score2:"C", result:"", address:""},
                        {name:"QLW", score1:"A", score2:"C", result:"", address:""},
                        {name:"ABSD", score1:"F", score2:"A", result:"", address:""},
                    ],
                    studentsLen:0,
                    searchValue:"",
                    nameInput:"",
                    score1Input:"",
                    score2Input:"",

                    SelectedScore:"",

                    grades :[
                        {grade:"A"},
                        {grade:"B"},
                        {grade:"C"},
                        {grade:"F"},
                    ],
                    addressInput:"",
                }
                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);

                //students len
                var oViewModel = this.getView().getModel();
                oViewModel.setProperty("/studentsLen", oData.students.length);

                // var oTable = this.getView().byId("uiTable");
                // var oTemplate = oTable.setRowActionTemplate(oTemplate);

            },

            onNavToView2: function(){
                
                var oTable = this.getView().byId("uiTable");
                var iIndex = oTable.getSelectedIndices()[0];
                var oViewModel = this.getView().getModel();

                var sPath = "/students/" + iIndex + "/name";
                var sName = oViewModel.getProperty(sPath);
                
                if (iIndex === undefined){
                    this.onWarning2MessageBoxPress();
                } else {
                    this.getRouter().navTo("ViewRouteName2", {name:sName}); //manifest.json안에 있는 route의 name
                }

            },

            onNavToView3: function(){
                this.getRouter().navTo("ViewRouteName3"); //manifest.json안에 있는 route의 name
            },

            // getRouter: function(){
            //     return UIComponent.getRouterFor(this); //컨트롤러의 라우터
            // },
            onWarning2MessageBoxPress: function () {
                var sText = "목록에서 학생 한명을 선택하여주세요."
                MessageBox.warning(sText, {
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK,
                });
            },

            onSearch: function(){
                var oViewModel = this.getView().getModel();
                var sSearchText = oViewModel.getProperty("/searchValue");

                var oTable = this.getView().byId("uiTable");
                var oTableBinding = oTable.getBinding("rows");

                console.log(oTableBinding);
                console.log(oTableBinding.getContexts());
                
                var aFilter = []; //필터를 담을 배열 
                //------------------------------
                var oFilterObject = {
                    path:'name',
                    operator: FilterOperator.Contains,
                    value1: sSearchText,
                }
                var oSearchFilter = new Filter(oFilterObject);
                aFilter.push(oSearchFilter);

                oTableBinding.filter(aFilter);
            },

            onEval: function(){
                //점수1가 B 이상일때만 합격
                var oViewModel = this.getView().getModel();
                var aStudents = oViewModel.getProperty('/students');
                for (let i = 0; i < aStudents.length; i++) {
                    console.log(aStudents[i].score1);
                    var sPathToReadScore1 = "/students/" + i + "/score1";
                    var sPathToReadScore2 = "/students/" + i + "/score2";
                    var sPathToChange = "/students/" + i + "/result";
                    var sScore1 = oViewModel.getProperty(sPathToReadScore1);
                    var sScore2 = oViewModel.getProperty(sPathToReadScore2);

                    if ((sScore1 === 'A' || sScore1 === 'B') && (sScore2 === 'A' || sScore2 === 'B')){
                        oViewModel.setProperty(sPathToChange, '합격'); 
                    } else {
                        oViewModel.setProperty(sPathToChange, '불합격'); 
                    }

                }
            },

            onChange: function(oEvent){
                console.log(oEvent);
                console.log(oEvent.getParameter("value"));
                console.log(oEvent.getParameters());
                console.log(oEvent.getSource());

            },

            onRegister: function(){
                var oInputName = this.getView().byId("nameInput");
                var sName = oInputName.getValue();

                var oViewModel = this.getView().getModel();
                var sScore1 = oViewModel.getProperty("/score1Input");
                var sScore2 = oViewModel.getProperty("/score2Input");
                var addressInput = oViewModel.getProperty("/addressInput");

                var oStudents = oViewModel.getProperty("/students");
                var oStudent = {
                    name: sName,
                    score1: sScore1,
                    score2: sScore2,
                    result:"",
                    address:addressInput,
                }
                oStudents.push(oStudent);
                oViewModel.setProperty("/students", oStudents);
                oViewModel.setProperty("/studentsLen", oStudents.length);

                var msg = "등록이 완료되었습니다.";
                MessageToast.show(msg);

                this.onCloseDialog();
            },

            onDelete: function(){
                var oViewModel = this.getView().getModel();

                var oTable = this.getView().byId("uiTable");
                var iIndice = oTable.getSelectedIndices()[0];
                
                var oStudents = oViewModel.getProperty("/students");
                oStudents.splice(iIndice,1);
                oViewModel.setProperty("/students", oStudents);
            },

            onPopupAddress: function(oEvent){
                var oInput = oEvent.getSource();
                new daum.Postcode({
                    oncomplete: function(data) {
                        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
                        oInput.setValue(data.zonecode);
                    }
                }).open();
            },

            onRegistPopup: function(){
                if(!this.pDialog){
                    this.pDialog = this.loadFragment({
                        name:"sap.training.sync.training.view.Regist"
                    })
                }

                this.pDialog.then(function(oDialog){
                    oDialog.open();
                    oDialog.setBusy(true);

                    setTimeout(function(){
                        oDialog.setBusy(false);
                    }, 3000);
                })
            },

            _onGradeToNum: function(grade){
                switch (grade) {
                    case 'A':
                        return 4;   
                    case 'B':
                        return 3; 
                    case 'C':
                        return 2;   
                    case 'F':
                        return 0;   
                    default:
                        break;
                }
            },


            onCloseDialog: function(){
                var oDialog = this.getView().byId("helloDialog");
                oDialog.close();
            }

        });
    });