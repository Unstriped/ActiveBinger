var helper = new CBHelper("activebinger", "0f3a3714db9f1a05a722b27a4782a0bc", new GenericHelper());
// use the md5 library provided to set the password
helper.setPassword(hex_md5("StefanBinger"));


function testUser(form){
var searchCondition = { };
var firstName = form.firstname.value;
var password = form.pwd.value;
helper.searchDocuments(searchCondition,"users", function(resp) {
	var logIn = false;
	for( I in resp.outputData){
		var oneUser = resp.outputData[I];
		if(firstName == oneUser.name){
			if(password == oneUser.password){
				logIn=true;
				break;
			}
			else{
				//Byt ut till text senare nubs helsningar past justbingit
				alert("Fel lösen - buuu");
			}
		}
	}

	if(logIn){
		//alert("Nu åker du vidare till en annan sida");
		sessionStorage.setItem("name",firstName);
		location.href=("homepage.html");
	}

});
}