sap.ui.define([], function () {
	"use strict";
	return {
        setGrade: function(iscore){
            if(iscore> 80 && iscore <= 100){
                return 'A'
            } else if (iscore> 60 && iscore <= 80){
                return 'B'
            } else if (iscore> 40 && iscore <= 60){
                return 'C'
            } else {
                return 'F'
            } 
        },
	};
});