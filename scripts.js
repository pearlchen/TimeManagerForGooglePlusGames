var links = document.body.getElementsByTagName( "a" );
var numLinks = links.length;
var gamesButton;
for ( var i=0; i<numLinks; i++ ) {
	var a = links[i];
	if ( a.getAttribute( "aria-label" ) == "Games" ) {
		gamesButton = a;
		break;
	}
}

//on start up, ask the background page for start and end times
// 	NOTE: NOW INSTEAD BEING TAKEN CARE OF FROM BACKGROUND.HTML
/*
chrome.extension.sendRequest( {}, function( response ){
	if ( response.success == true ) {
		updateVisibility( response );
	}
});
*/

//page should be based on an update from the options page
chrome.extension.onRequest.addListener( function( request, sender, sendResponse ) {
	//console.log( "scripts.js: update! hide?" + request.hide + ", " + request.startTime + "-" + request.endTime );
	updateVisibility( request );
	sendResponse({}); // snub them.
});

function updateVisibility( response ) {
	if ( gamesButton == null ) return;
	
	if ( response.hide ) 
		gamesButton.style.display = "none";
	else
		gamesButton.style.display = "inline-block";
		
	if ( response.hide ) {
		var url = window.location.href;
		if ( url.indexOf('games') > -1 ) {
			alert( 'Get back to real life! ;)');
			window.location.href = 'https://plus.google.com';
		}
	}
}