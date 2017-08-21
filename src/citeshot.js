/*
 * Citeshot
 */



var documentHtml = document.body.innerHTML;


// var newWin = window.open();
// var newDoc = newWin.document;
// var newScript = newDoc.document.createElement('script');
// newScript.type='text/javascript';
// newScript.src='https://citeshot.com/citeshot.js';
// newDoc.body.appendChild(newScript);


// Append styles to document

style = document.createElement('style');
style.type='text/css';
var decs = document.createTextNode('\
	.block{\
		text-align: left;\
		color: #333;\
		width: 600px;\
		font-family: Georgia;\
		line-height: 1.5;\
		background-color: white;\
		padding: 2em;\
	}\
	.quote{\
		font-family: Georgia;\
		-webkit-box-decoration-break: clone;\
		box-decoration-break: clone;\
		background-color: yellow;\
		font-size: 20px;\
	}\
	.source,\
	.url{\
		margin: 5px 0;\
		font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;\
		line-height: 1.2;\
	}\
	.url{\
		font-size: 13px;\
		color: #aaa;\
	}\
	.source{\
		margin-top: 20px;\
		font-weight: 700;\
		font-size: 16px;\
	}\
');

style.appendChild(decs);
document.getElementsByTagName('head')[0].appendChild(style);



// Create outer element

var block = document.createElement('div');
block.classList.add('block');



// Create quote part

var quoteWrapper = document.createElement('p');

var quote = document.createElement('span');
quote.classList.add('quote');

var s = window.getSelection();
var t = document.createTextNode(s.toString());

quote.appendChild(t);
quoteWrapper.appendChild(quote);
block.appendChild(quoteWrapper);



// Add title

var cite = document.createElement('p');
cite.classList.add('source');

var s = document.title;
var t = document.createTextNode(s.toString());

cite.appendChild(t);
block.appendChild(cite);



// Add url

var url = document.createElement('p');
url.classList.add('url');

var s = document.URL;
var tmp        = document.createElement('a');
    tmp.href   = s;
var hostname = tmp.hostname;
var t = document.createTextNode(hostname.toString());

url.appendChild(t);
block.appendChild(url);



// From https://stackoverflow.com/a/30407959/2642773
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}



// Create and download image

var dateString = new Date().toISOString();
var filename = 'citeshot_' + hostname + '_' + dateString + '.png';



function addBlock() {
	return new Promise(function (fulfill, reject){
		document.body.innerHTML = '';
		var theChild = document.body.appendChild(block);
		fulfill(theChild);
	});
} 



function saveImage() {
	html2canvas(block).then(function(canvas){
		var dataUrl = canvas.toDataURL();
		var blob = dataURLtoBlob(dataUrl, 'image/png');
		download(blob, filename, 'image/png');
		document.body.removeChild(block);
		console.log('citeshot successful');
		// document.body.innerHTML = documentHtml;
	});
}



addBlock().then(function() {
	saveImage();
});
