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

            myFormatter : formatter,
            // "sap/ui/core/mvc/Controller" 의 설계구조, onInit : void
            // onInit, onExit, onBeforeRendering, onAfterRendering
            // 이 네개의 메소드(함수)는 이 뷰가 동작할때 자동으로 각자의 조건에 맞게 알아서 동작
            onInit: function () {   // 화면이 처음 그려질 때, 브라우저가 이 화면을 처음 만들어 낼때만 실행
                // 주로 뷰를 컨트롤 하기 위한 모델(JSONModel) 을 여기서 선언

                // 1단계 - JSONModel을 만들 초기값(기본구조를 객체형태로) 선언
                var oSampleData = {
                    // 프로퍼티 - 키 (변수명 처럼 맘대로) : 값 (어떤 자료형도 상관 없음)
                    bVisible : true,
                    bDesc: true, //맨 아래 테이블 이름 정렬
                    bTableDesc: false,
                    sInitValue : "입력",
                    comboItems : [
                        {
                            key: "add", text: "+"
                        },
                        {
                            key: "min", text: "-"
                        },
                        {
                            key: "mul", text: "x"
                        },
                        {
                            key: "div", text: "/"
                        }
                    ],
                    students : [
                        {
                            name : "lee", score: 12, grade: 'F', pass: false
                        },{
                            name : "kim", score: 100, grade: 'A', pass: true
                        },{
                            name : "lim", score: 45, grade: 'F', pass: false
                        },{
                            name : "oh", score: 80, grade: 'A', pass: true
                        },{
                            name : "park", score: 77, grade: 'B', pass: true
                        }
                    ],
                    dialogModel : [
                        {
                            name: "name1", count:10
                        },
                        {
                            name: "name2", count:20
                        },
                        {
                            name: "name3", count:30
                        },
                    ]
                };
                // 2단계 - 객체를 참고하여 JSONModel 로 만들어줌
                var oModel = new JSONModel(oSampleData);
                // new - 자바스크립트 생성 키워드
                // new JSONModel( [json 화 시킬 구조를 넣어줌 - { ... } ] )

                // 3단계 - onInit의 지역객체인 oModel와 같은 형태의 JSONModel 을 뷰와 연결시켜 줌 (복사)
                // 지역객체 - onInit { 여기 } 안에서만 접근,사용 가능
                this.getView().setModel(oModel);
                // 이 때 oModel 자체가 아닌, oModel 과 같은 구조의 JSONModel이 뷰에 들어감.
                // MVC 패턴대로 모델을 뷰나 컨트롤러에서 접근해서 읽거나 쓸 수 있음
            },

            onExit: function () {   // 이 화면을 떠날 때, 메모리 관리를 위해서 더이상 안쓰는 대상들을 지워버릴때 종종 사용

            },
            onBeforeRendering: function () {    // 이 화면이 렌더링 되기 전

            },
            onAfterRendering: function () {     // 이 화면이 렌더링 된 후

            },

            myCustomFunc: function () { // 뷰의 이벤트 나 컨트롤러 자체에서 실행시킬 펑션(기능)을 등록해서 사용함

            },

            onChange1: function (oEvent, sId) {
                // 이 함수가 구동하는데 필요한 변수들은 상단에서 선언
                var oInput1 = this.getView().byId("input1");
                console.log(oEvent, sId);
                // console.log(
                //     oEvent.getSource(),
                //     oEvent.getParameters(),
                //     oEvent.getParameter("value")
                // );   // 개발자 콘솔 창에 내가 원하는 객체를 출력해줌 <- 개발자만을 위함
                
                /**
                 * this <- js 코드 실행되는 그 SCOPE (범위)를 지정
                 * 화면이 구동될 경우를 생각하면
                 * 이 컨트롤러가 실행이 됨. 그러면 this가 지정하는 건 이 컨트롤러 그 자체
                 * sap/ui/core/mvc/Controller <- extend 한 내 뷰에 연결된 컨트롤러 [View1.controller]
                 * 
                 * sap/ui/core/mvc/Controller 의 메소드 getView()를 통해서 실제 뷰를 지정
                 * => this.getView() 내 화면이라는 객체
                 * => byId() 라는 메소드를 호출해서 id값으로 뷰에 만들어 놓은 컨트롤러의 함수 내부에 컨텐츠을 불러올 수 있음(지정할 수).
                 */
            },

            onCheck: function(oEvent) {
                var oInput3 = this.getView().byId("input3");
                // console.log(oEvent.getSource().getParent().getParent());

                // console.log(
                //     oInput3.getValue(),
                //     oEvent.getSource(),
                //     oEvent.getParameter("value")
                // );
            },

            onSearch: function() {
                var oTable = this.getView().byId("uiTable");
                var oModel = oTable.getBinding("rows"); // JSONModel 자체에 필터를 걸면 그 데이터 자체가 변형
                console.log(oModel);

                // 검색 단어 가져옴
                var sSearchValue = this.getView().byId("searchInput").getValue(),
                    startScore = this.getView().byId("scoreStart").getValue(),
                    endScore = this.getView().byId("scoreEnd").getValue();
                
                // 테이블이 가지고 있는 바인딩 정보에 필터를 추가 / xml path: '', filters: '배열' <-
                var aFilter = []; // filter 를 담을 배열 하나 선언

                if(startScore.length !== 0 && endScore.length !== 0){
                    var iStart = parseInt(startScore),
                        iEnd = parseInt(endScore);
                    var oFilter = new Filter({
                        path: "score",
                        operator: FilterOperator.BT,
                        value1: iStart,
                        value2: iEnd,
                    });
                    aFilter.push(oFilter);     
                } else if (startScore.length !== 0){
                    var iStart = parseInt(startScore);
                    var oFilter = new Filter({
                        path: "score",
                        operator: FilterOperator.GE,
                        value1: iStart,
                    });
                    aFilter.push(oFilter);
                } else if (endScore.length !== 0){
                    var iEnd = parseInt(endScore);
                    var oFilter = new Filter({
                        path: "score",
                        operator: FilterOperator.LE,
                        value1: iEnd,
                    });
                    aFilter.push(oFilter);
                }


                if(sSearchValue.length > 0){
                    var oFilter = new Filter({
                        path: "name",
                        operator: FilterOperator.EQ,
                        value1: sSearchValue,
                        caseSensitive: false
                    });
                    // push 배열에 항목을 추가할 때 js 문법(메소드)
                    aFilter.push(oFilter);

                    // new Filter("name", FilterOperator.Contains, "lee")
                   // ( sPath, 조건, sQuery(검색문) )          
                }
                
                oModel.filter(aFilter)
            },

            onSort: function(){
                var oTable = this.getView().byId("uiTable");
                var oModel = oTable.getBinding("rows");
                
                var oViewModel = this.getView().getModel();
                var bDesc = oViewModel.getProperty("/bDesc");
                oViewModel.setProperty("/bDesc", !bDesc);

                var oSorter = new Sorter("name", bDesc);
                oModel.sort(oSorter);

            },

            _tableSearch: function(){
                var oTable = this.getView().byId("table"),
                    oModel = oTable.getBinding("items"),
                    sInput = this.getView().byId("search01").getValue();

                var aFilter = []; //array type 필터를 담을 빈 배열 선언

                var oSearchFilter;
                if (sInput !== ""){ //입력값이 있는 경우
                    oSearchFilter = new Filter({
                        path: "name",
                        operator: FilterOperator.Contains,
                        value1: sInput
                    }) //path, opereator, value1은 필수 속성
    
    
                    aFilter.push(oSearchFilter);
                }

                // oModel.filter(aFilter);
                return oSearchFilter;
            },

            onTableSort: function(){
                var oTable = this.getView().byId("table"),
                    oModel = oTable.getBinding("items");
                
                var oViewModel = this.getView().getModel(),
                    bTableDesc = oViewModel.getProperty("/bTableDesc");
                oViewModel.setProperty("/bTableDesc", !bTableDesc)
                

                var oSorter = new Sorter("name", bTableDesc) //경로, DESC인지, 기본값이 false: 생략하면 오름차순
                //소터는 안에 객체가 아니라 파라미터로 생성

                oModel.sort(oSorter)
            },

            _tableNumberFilter: function(){
                var oTable = this.getView().byId("table"),
                    oModel = oTable.getBinding("items");
                var oInputMin = this.getView().byId("inputNum1"),
                    oInputMax = this.getView().byId("inputNum2");
                var sInputMin = oInputMin.getValue(),
                    sInputMax = oInputMax.getValue();

                var aFilter =[];
                var oFilter;
                //필터 생성
                if(sInputMin.length !== 0 && sInputMax.length !== 0){
                    var iStart = parseInt(sInputMin),
                        iEnd = parseInt(sInputMax);
                    oFilter = new Filter({
                        path: "score",
                        operator: FilterOperator.BT,
                        value1: iStart,
                        value2: iEnd,
                    });
                    aFilter.push(oFilter);
                } else if (sInputMin.length !== 0){
                    var iStart = parseInt(sInputMin);
                    oFilter = new Filter({
                        path: "score",
                        operator: FilterOperator.GE,
                        value1: iStart,
                    });
                    aFilter.push(oFilter);
                } else if (sInputMax.length !== 0){
                    var iEnd = parseInt(sInputMax);
                    oFilter = new Filter({
                        path: "score",
                        operator: FilterOperator.LE,
                        value1: iEnd,
                    });
                    //필터를 생성하여 afilter에 담은
                    aFilter.push(oFilter);
                }
                
                // 테이블 바인딩 정보에 필터 적용
                // oModel.filter(aFilter);
                return oFilter;
            },

            onTotalSearch: function(){
                var oTable = this.getView().byId("table"),
                oModel = oTable.getBinding("items");

                var aFilter = [];
                var oFilter1 = this._tableSearch();
                var oFilter2 = this._tableNumberFilter();

                if(oFilter1){
                    aFilter.push(oFilter1);
                }
                if (oFilter2){
                    aFilter.push(oFilter2);
                }
                oModel.filter(aFilter);
            },

            onCreateDialog: function(){
                // console.log(this.pDialog); = undefined
                if (!this.pDialog){ //이증으로 에러나는 경우를 없애기 위해 this.pDialog가 이미 만들어져 있는지 체크하고 없으면 만듦.
                    // this.pDialog = this.loadFragment({
                    //     name:"sap.training.sync.training.view.Hello"
                    // })
                    this.pDialog = new Dialog({
                        title: "Simple Dialog",
                        content: new sap.m.List({
                            items: {
                                path: "/dialogModel",
                                template: new sap.m.StandardListItem({
                                    title: "{name}",
                                    counter: "{count}"
                                })
                            }
                        }),
                        endButton: new sap.m.Button({
                            text: "Close",
                            press: function () {
                                this.pDialog.close();
                            }.bind(this)
                        })
                    })
                } 
                this.pDialog.open();
                // this.pDialog.then(function(oDialog){
                //     oDialog.open();
                // })
                
            },

            onCloseDialog: function(){
                var oDialog = this.getView().byId("helloDialog");
                oDialog.close();
            }

        });
    });