// dictionary of html tags
var h = {
  button_add: '<button type="button" class="btn btn-primary btn-xs">add</button>',
  table_o: '<table>',
  table_c: "</table>",
  tr_o: "<tr>",
  tr_c: "</tr>",
  td_o: "<td>",
  td_c: "</td>",
  string: "",
  headline_o: "<h2>File: ",
  headline_c: "</h2>",
  preview: '<h4>Preview</h4>',
  preview_textarea_o: '<textarea rows="4" cols="80" id=\"id',
  preview_textarea_c: '\"></textarea>',
  preview_ids: ["id0","id1","id2","id3","id4","id5","id6","id7","id8","id9","id10",
                "id11","id12","id13","id14","id15","id16","id17","id18","id19",
                "id20","id21","id22","id23","id24","id25","id26","id27","id28","id29",
                "id30","id31","id32","id33","id34","id35","id36","id37","id38","id39",
                "id40","id41","id42","id43","id44","id45","id46","id47","id48","id49","id50",]
}

// container for data
var contents = [];
var fs;

//handle the multi-file selector box
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li class="list-group-item"><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    fs = files;
  }
document.getElementById('files').addEventListener('change', handleFileSelect, false);
// End handleFileSelect

// load the selected files in to memory at var contents
function onChange(event){
  var temp = event.target.files;
  for(var i = 0; i < temp.length; i++){
    var file = event.target.files[i];
    var reader = new FileReader();
    reader.onload = function(event){
      console.log(event.target.result);
      contents.push(event.target.result);
    };

    reader.readAsText(file);
  }
}
// end load contents

// do the actual parsing of each file's contents
function parseCSV(csv){
  var output = "";  // string to hold result
  var linestart = true; //first run is a linestart.
  //open table
  output += h.table_o;

  //start to parse string
  for (var i = 0; i < csv.length; i++){
    // at linestart, add tr, td, and button then
    // set linestart to false and continue
    if (linestart === true){
      output += h.tr_o + h.td_o + h.button_add + h.td_c + h.td_o;
      linestart = false;
    }
    if (csv[i] === "\n") {
      output += h.td_c + h.tr_c;
      linestart = true;
    } else if (csv[i] === ','){
      output += h.td_c + h.td_o;
    } else if (csv[i] !== ','){
      output += csv[i];
    } 
  }
  output += h.table_c;

  return output;
}
//end parse

// Interface for converting one array ot the other: CSV -> HTML
function convertAll(){
  var h_contents = [];

  contents.forEach(function(str){
    var h_result = parseCSV(str);

    h_contents.push(h_result);
  });
  return h_contents;
}
// end array conversion

// function for onclick
$( "#convert" ).on("click", function(){
  if (fs === undefined){
    alert("Choose at least one .csv file");
    return;
  }
  var h_result = convertAll();
  var h_total = "";
  var newlines_regexp = /(\r\n|\n|\r)/gm;
  for (var i = 0; i < h_result.length; i++){
    h_result[i] = h_result[i].replace(newlines_regexp, "");
    h_total += h.headline_o + fs[i].name + h.headline_c + h.preview_textarea_o + i + h.preview_textarea_c + h.preview + h_result[i];
  }
  
  $( "#preview" ).html(h_total);
  // document.getElementById("preview").innerHTML = h_total;
  for (var i = 0; i < h_result.length; i++){
    $( "#" + h.preview_ids[i] ).html( h_result[i] );
  }
})