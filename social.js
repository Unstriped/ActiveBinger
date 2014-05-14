var helper = new CBHelper("activebinger", "0f3a3714db9f1a05a722b27a4782a0bc", new GenericHelper());
// use the md5 library provided to set the password
helper.setPassword(hex_md5("StefanBinger"));

function showSocial(){

	if(showing){
	$("#statusInfo").attr('style', 'display: block');
	$("#socialDiv").attr('style', 'display: none');
	showing = false;
	}
	else{
	$("#socialDiv").attr('style', 'display: block');
	$("#statusInfo").attr('style', 'display: none');
	showing = true;
	}
}

function addFriend(){

    var person = prompt("Add friend: ");
    var searchCondition = { };

    helper.searchDocuments(searchCondition,"users", function(resp) {
    	var found = false;
    	for( I in resp.outputData){
    		var oneUser = resp.outputData[I];
    		if(person == oneUser.name){
    			//add friend
    			found = true;
    			break;
    		}
		}
		if(found==false){
			alert("HAN FINNS INTEE");
		}
	});	


}