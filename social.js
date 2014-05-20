
var helper = new CBHelper("activebinger", "0f3a3714db9f1a05a722b27a4782a0bc", new GenericHelper());
// use the md5 library provided to set the password
helper.setPassword(hex_md5("StefanBinger"));


var firstName = sessionStorage.getItem("name");
function showSocial(){
	$("#scoreBoard table").empty();
	if(showing){
		$("#statusInfo").attr('style', 'display: block');
		$("#buttonImage").attr('src', 'images/Podium.png');

		$("#socialDiv").attr('style', 'display: none');


		showing = false;
	}
	else{

		showFriends();


		$("#socialDiv").attr('style', 'display: block');
		$("#buttonImage").attr('src', 'images/wolf.png');

		$("#statusInfo").attr('style', 'display: none');

		showing = true;

	}



}

//Visar scoreboard
function showFriends(){

	$("#scoreBoard table").empty();
	$("#scoreBoard table").append("<tr><th>Name</td><th>Score</td></tr>");
	var friendList =[];

	var searchCondition = { };
	helper.searchDocuments(searchCondition,"users", function(test) {
		for( I in test.outputData){
			var oneUser= test.outputData[I];
			if(firstName == oneUser.name){							
				var newFriend = { 'friendName' : oneUser.name , 'friendScore' : oneUser.totPoints};
				friendList.push(newFriend);
				break;
			}

		}
		helper.searchDocuments(searchCondition,"friends", function(resp) {

			for( I in resp.outputData){
				var oneFriend = resp.outputData[I];
				if(firstName == oneFriend.name){

					for( J in test.outputData){
						var oneUser = test.outputData[J];
						if(oneFriend.friend== oneUser.name){
							var newFriend = { 'friendName' : oneUser.name , 'friendScore' : oneUser.totPoints};
							friendList.push(newFriend);
							//$("#scoreBoard table").append("<tr><td>"+oneUser.name+"</td><td class='sort'>"+oneUser.totPoints+"</td><tr>");
						}
					}
				}
			}


		friendList.sort(function(a,b){
			var dCount = a.friendScore - b.friendScore;

			if(dCount) return dCount;

			var dName = a.friendName - b.friendName;
			return dName;
		});
		friendList.reverse();
		var i = friendList.length;
		for(var sortCounter = 0; sortCounter < i; sortCounter++ ){
			$("#scoreBoard table").append("<tr><td>"+friendList[sortCounter].friendName+"</td><td>"+friendList[sortCounter].friendScore+"</td><tr>");
		}
	});
		});
	friendList =[];	

}

function addFriend(){


	var person = prompt("Add friend: ");
	var score = 0;
	var searchCondition = { };
	var found = false;
	var friend = false;

	helper.searchDocuments(searchCondition,"users", function(resp) {
		for( I in resp.outputData){
			var oneUser = resp.outputData[I];
			if(person == oneUser.name){
    			//add friend
    			found = true;
    			score = oneUser.totPoints;    			
    			 }
    	}
    	if(found==false){
    		alert("HAN FINNS INTEE");
    	}

	helper.searchDocuments(searchCondition,"friends", function(resp) {
		if(found==true){
			for( I in resp.outputData){
				var oneFriend = resp.outputData[I];
				if(firstName == oneFriend.name && person == oneFriend.friend){
					alert("NI ÄR JU REDAN VÄNNER");
					friend = true;
					break;
				}

			}

			if(friend == false){
				var chatroom;

				if(firstName<person){
					chatroom = firstName+person;
				}

				else{
					chatroom = person+firstName;

				}

				var userObject = {
					"name" : firstName,
					"friend" : person,
					"chatroom" : chatroom
				}
				helper.insertDocument("friends", userObject, null, function(resp){
					alert("det blev en vän");
					$("#scoreBoard table").append("<tr><td>"+person+"</td><td>"+score+"</td><tr>");

					$("#scoreBoard table").empty();	
					showFriends();

				});
			}
		}

	});

	});
}