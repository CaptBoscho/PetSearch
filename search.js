// After the API loads, call a function to enable the search box.
/*function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}*/

// Search for a specified string.
$(document).ready(function(){
$("#search-button").click(function(e) {
  gapi.client.setApiKey('AIzaSyARvwirFktEIi_BTaKcCi9Ja-m3IEJYIRk');
  gapi.client.load('youtube', 'v3', function() {
     e.preventDefault();
     searchA();
  });
});

function searchA() {
  var q = "cute pet " + $('#query').val();
  console.log(q);
  console.log(gapi);
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });
  console.log(q);
  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    // console.log(str);
    $('#search-container').html('<pre>' + str + '</pre>');
    var id = response['items']['0']['id']['videoId'];
    var videoURL = "https://www.youtube.com/embed/" + id;
    console.log(videoURL);
    $('#youtubeVideo').attr('src',videoURL);;
    console.log('check');
 });

	
	var key = "223447a770589a3ea900c78154e2537e";

	var petURL = "http://api.petfinder.com/";
	var method2 = "pet.getRandom";
	var argument = "animal=" + $('#query').val().toLowerCase();
	var argument2 = "output=basic";

	var fullURL = petURL + method2 + "?key=" + key + "&" + argument2 + "&"+argument+ "&format=json";
	console.log(fullURL);	


	$.ajax({

		url:fullURL,
		dataType:"jsonp",
		success:function(data){
			console.log(data);	
			//var obj = JSON.parse(data);
			//console.log(obj);	
			var photos = $('#photos');
			var list;	
			var greeting;		
			var name;
			var breed = "";

			if(data.petfinder.pet.name.hasOwnProperty("$t"))
			{
				name = data.petfinder.pet.name.$t;
			}

			if(data.petfinder.pet.breeds.breed.hasOwnProperty("$t"))
			{
				breed = data.petfinder.pet.breeds.breed.$t;
			}
			else
			{
				$.each(data.petfinder.pet.breeds.breed, function(i, item){
					if(item.$t !== null){breed += item.$t + " ";}
					console.log(item.$t);
				});
			
			}
			console.log(breed);
			console.log(name);
			greeting += "Meet ";
			
			if(name !== null)
			{
				greeting += name + " ";
			}			
			
			if(breed !== "")
			{

				greeting += "the " + breed;
			}

			var count = 0;
			var media;
			greeting = greeting.replace("undefined","");
			list = greeting + "<br>";
					
	
			if(data.petfinder.pet.media.hasOwnProperty("photos") &&
				data.petfinder.pet.media.photos.hasOwnProperty("photo"))
			{
				media = data.petfinder.pet.media.photos.photo;
			}
			else
                        {

                                //no photos available
                               list += "<p>No Photos Available</p>";
                        }

			
			if(media !== null && media !== undefined)
			{
				list += "<ul>";
				$.each(media,function(i, item){
				//	console.log(item.$t);
					
					count = count % 5;
					
				//	console.log(count);

					if(count === 2){
						
						list += "<li><img src=" + item.$t +">";	
		
					}

					count++;		
				});
				list += "</ul>";
			}
			
			photos.html(list);
		}	
	});

}
});
