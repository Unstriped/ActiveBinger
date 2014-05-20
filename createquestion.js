 // First initialise the helper object with the code, secret code 
// and the generic helper

var helper = new CBHelper("activebinger", "0f3a3714db9f1a05a722b27a4782a0bc", new GenericHelper());
// use the md5 library provided to set the password
helper.setPassword(hex_md5("StefanBinger"));

function createQuest(form){
    var question = form.question.value;
    var answer1 = form.answer1.value;
    var answer2 = form.answer2.value;
    var answer3 = form.answer3.value;
    var answer4 = form.answer4.value;
    var userObject = {
        "question" : question,
        "answer1" : answer1,
        "answer2" : answer2,
        "answer3" : answer3,
        "answer4" : answer4
    }
    helper.insertDocument("questions", userObject, null, function(resp){
          
            alert("Created a question");
            //window.location.reload();
    });
    }

