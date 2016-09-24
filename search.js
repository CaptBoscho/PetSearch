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
  var q = $('#query').val();
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
}
});
