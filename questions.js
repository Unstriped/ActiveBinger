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

			answer1 = { 'answer' : oneQuestion.answer1 , 'check' : 1};
			answer2 = { 'answer' : oneQuestion.answer2 , 'check' : 0};
			answer3 = { 'answer' : oneQuestion.answer3 , 'check' : 0};
			answer4 = { 'answer' : oneQuestion.answer4 , 'check' : 0};

			correct = answer1;


			var templist = [answer1, answer2, answer3, answer4];

			var shufflelist = shuffle(templist);
			answer1 = shufflelist.pop();
			answer2 = shufflelist.pop();
			answer3 = shufflelist.pop();
			answer4 = shufflelist.pop();


			
			$("#quizDiv #questionDiv").empty();

			$("#quizDiv #answer1Div button").empty();
			$("#quizDiv #answer2Div button").empty();
			$("#quizDiv #answer3Div button").empty();
			$("#quizDiv #answer4Div button").empty();

			$("#mainDiv").attr('style', 'display: none');
			$("#quizDiv").attr('style', 'display: block');

			$("#quizDiv #questionDiv").append("Fråga nr: "+(E+1)+"<br> "+question+ "<br><br>");

			$("#quizDiv #answer1Div button").append(answer1.answer);
			$("#quizDiv #answer2Div button").append(answer2.answer);
			$("#quizDiv #answer3Div button").append(answer3.answer);
			$("#quizDiv #answer4Div button").append(answer4.answer);



		});



};

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};



function userAnswer(answer){

	if(answer==1){
		answer=answer1.answer;
	}

	else if(answer==2){
		answer=answer2.answer;
	}

	else if(answer==3){
		answer=answer3.answer;
	}

	else if(answer==4){
		answer=answer4.answer;
	}

	console.log(answer);

	if(answer1.check == 1){
		document.getElementById("answer1Div").style.backgroundColor = 'green'; 
		document.getElementById("answer2Div").style.backgroundColor = 'red'; 
		document.getElementById("answer3Div").style.backgroundColor = 'red';
		document.getElementById("answer4Div").style.backgroundColor = 'red'; 
	}

	else if(answer2.check == 1){
		document.getElementById("answer1Div").style.backgroundColor = 'red'; 
		document.getElementById("answer2Div").style.backgroundColor = 'green'; 
		document.getElementById("answer3Div").style.backgroundColor = 'red';
		document.getElementById("answer4Div").style.backgroundColor = 'red'; 
	}

	else if(answer3.check == 1){
		document.getElementById("answer1Div").style.backgroundColor = 'red'; 
		document.getElementById("answer2Div").style.backgroundColor = 'red'; 
		document.getElementById("answer3Div").style.backgroundColor = 'green';
		document.getElementById("answer4Div").style.backgroundColor = 'red'; 
	}

	else if(answer4.check == 1){
		document.getElementById("answer1Div").style.backgroundColor = 'red'; 
		document.getElementById("answer2Div").style.backgroundColor = 'red'; 
		document.getElementById("answer3Div").style.backgroundColor = 'red';
		document.getElementById("answer4Div").style.backgroundColor = 'green'; 
	}











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
		document.onClick(){
	$("#quizDiv").attr('style', 'display: none');


	$("#mainDiv").attr('style', 'display: block');
 	distanceLeft = startDistance;
 	barvar = startDistance;
    loadGeo();
	}


};


runQuestion();

