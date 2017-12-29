var loremIpsum = "Lorem ipsum dolor sit amet consectetur adipiscing elit Praesent ex magna cursus quis justo nec imperdiet gravida diam Fusce pretium rhoncus mollis Aenean vitae sem dolor Vestibulum mollis neque in porta egestas Sed arcu nisi ultrices at imperdiet sed congue nec eros Etiam dapibus bibendum libero ut congue Nunc sed metus velit Sed iaculis blandit consequat Sed laoreet ultricies condimentum Suspendisse vel sapien feugiat tempor tortor vitae gravida diam Nam est tortor faucibus ut feugiat ac pharetra sit amet felis Maecenas in turpis pellentesque nibh euismod laoreet Pellentesque suscipit enim at dignissim ultrices In tristique lectus elementum pretium tempor lectus"
var wordCount = loremIpsum.split(" ").length;
var rndNumSize = 100;
var colOpt = [ "number", "word" ];								


var inputNumCols = document.getElementById('inputNumCols');
var buttonTable = document.getElementById('buttonTable');

// Event Listeners
inputNumCols.addEventListener('change', function(){
	if (Number(inputNumCols.value) < 1){
		inputNumCols.value = "1";
	}
	var numCols = inputNumCols.value;
	console.log(numCols);
	drawButtonTable(numCols);
});

function drawOptionRow(cols){
	var output = "";

	output += "<tr>";
	for(var i = 0; i < cols; i++){
		output += "<td><select>";
		for (var j = 0; j < colOpt.length; j++){
			output += makeOptions(j);
		}
		output += "</select></td>";
		//console.log(output);
	}
	output += "</tr>"
	//console.log(output);

	return output;
}

function drawHeader(cols){
	var output = "<tr>"
	for(var i = 0; i < cols; i++){
		output += "<td>" + "Col#" + (i+1) +"</td>";
	}
	output += "</tr>";
	return output;
}

function drawButtonTable(cols){
	buttonTable.innerHTML = drawHeader(cols);
	buttonTable.innerHTML += drawOptionRow(cols);
}

var h_opt = [ '<option value=\"', '\">', "</option>" ];

function makeOptions(i){
	return h_opt[0] + colOpt[i] + h_opt[1] + colOpt[i] + h_opt[3];
}

function rng(size){
	var rand = (Math.floor(Math.random() * size));
	return rand;
}

function getDummyString(numWords){
	var dummy = "";
	var foundCap = false;
	var start = rng()

	var counter = 0;

	for(var i = 0; i === numWords;){
		for(var j = 0; j < loremIpsum.size; j++){

		}
	}

	return dummy;
}
