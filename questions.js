var helper = new CBHelper("activebinger", "0f3a3714db9f1a05a722b27a4782a0bc", new GenericHelper());
// use the md5 library provided to set the password
helper.setPassword(hex_md5("StefanBinger"));
var name = sessionStorage.getItem("name");

document.getElementById("userNameQuestion").innerHTML = name;

var answer1 = "";
var answer2 = "";
var answer3 = "";
var answer4 = "";
var correct = "";
var oneQuestion = "";

function runQuestion(){



	var searchCondition = { };


	helper.searchDocuments(searchCondition,"questions", function(resp) {
		

		//for( E in resp.outputData){
			var numQuestions = resp.outputData.length;

			var E = Math.floor((Math.random() * numQuestions)); 

			oneQuestion = resp.outputData[E];

			var question = oneQuestion.question;

			answer1 = oneQuestion.answer1;
			answer2 = oneQuestion.answer2;
			answer3 = oneQuestion.answer3;
			answer4 = oneQuestion.answer4;

			correct = oneQuestion.correct;
			
			$("#quizDiv #questionDiv").empty();

			$("#quizDiv #answer1Div button").empty();
			$("#quizDiv #answer2Div button").empty();
			$("#quizDiv #answer3Div button").empty();
			$("#quizDiv #answer4Div button").empty();

			$("#mainDiv").attr('style', 'display: none');
			$("#quizDiv").attr('style', 'display: block');

			$("#quizDiv #questionDiv").append("Fråga nr: "+(E+1)+"<br> "+question+ "<br><br>");

			$("#quizDiv #answer1Div button").append(answer1);
			$("#quizDiv #answer2Div button").append(answer2);
			$("#quizDiv #answer3Div button").append(answer3);
			$("#quizDiv #answer4Div button").append(answer4);



		});



};



function userAnswer(answer){

	if(answer==1){
		answer=answer1;
	}

	else if(answer==2){
		answer=answer2;
	}

	else if(answer==3){
		answer=answer3;
	}

	else if(answer==4){
		answer=answer4;
	}

	console.log(answer);

	if(answer != correct){
		alert("Fel!");
	}

	else{
		alert("Bra jobbat!");
		var searchCondition = {'name' : name };

		totPoints = totPoints + 1;

		var update = {'name' : name,
					'password' : password,
					'totPoints' : totPoints
		 };

		helper.updateDocument(update, searchCondition,"users",function(resp){


		});
		updatePoints();


		}

	$("#quizDiv").attr('style', 'display: none');


	$("#mainDiv").attr('style', 'display: block');
 	distanceLeft = startDistance;
 	barvar = startDistance;
    loadGeo();



};


runQuestion();

