 // First initialise the helper object with the code, secret code 
// and the generic helper
var helper = new CBHelper("activebinger", "0f3a3714db9f1a05a722b27a4782a0bc", new GenericHelper());
// use the md5 library provided to set the password
helper.setPassword(hex_md5("StefanBinger"));

function createUser(form){

 	alert("försöker skapa användare");
    var firstName = form.firstname.value;
    var password = form.pwd.value;
	var searchCondition = { };
	var unique = true;
    helper.searchDocuments(searchCondition,"users", function(resp) {

	for( I in resp.outputData){
		var oneUser = resp.outputData[I];

		if(firstName == oneUser.name){
			unique = false;
		}
	}

	if(unique){
   	var userObject = {
    	"name" : firstName,
    	"password" : password
   	}
    helper.insertDocument("users", userObject, null, function(resp){
    	  
 			alert("skapade användare");
    	    location.href=("startpage.html");
    	    // window.location.reload();
    });
	}
else{
	alert("Du måste välja ett unikt namn, mainstreamtönt");

}
});
}