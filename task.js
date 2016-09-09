var fs = require('fs');
var readline = require('readline');

const PATH_FILES_ONE = __dirname + '\\files_1\\',
	  PATH_FILES_TWO = __dirname + '\\files_2\\';

const EXPRESSION_ONE = '/**',
	  EXPRESSION_TWO = '*',
	  EXPRESSION_THREE = '*/';

var superFile = PATH_FILES_ONE.concat('SuperFile.java'),
	basicFile = PATH_FILES_TWO.concat('BasicFile.java');

execute(superFile);
execute(basicFile);

var files = [];
function execute(path) {
	fs.exists(path, function(exists) {
		if (!exists) {
			console.error('File not found.');
			return;
		}
		configure(path);
		if(files.length == 2) doTask(files);
	});
};

function configure(path) {
	var lineReader = readline.createInterface({input: fs.createReadStream(path)});
	files.push(lineReader);
};

function doTask(files) {
	var fileOne = files[0],
		filesTwo = files[1];

	var lineBuffer = [],
		lineNumberBuffer,
		lineNumber = 0;
	fileOne.on('line', function(line) {
		lineNumber++;
		if(line.contains(EXPRESSION_ONE) && line.contains(EXPRESSION_THREE)) {
			addLine(lineNumber, [line]);
			clear();
		} else if (line.contains(EXPRESSION_ONE) || line.contains(EXPRESSION_TWO) || line.contains(EXPRESSION_THREE)) {

			lineBuffer.push(line);
			if(line.contains(EXPRESSION_ONE)) {
				lineNumberBuffer = lineNumber;
				return;
			}
			if(line.contains(EXPRESSION_THREE)) {
				addLine(lineNumberBuffer, lineBuffer);
				clear();
			}
		}
	});

	function clear() {
		lineBuffer = [];
		lineNumberBuffer = undefined;
	};
};

var buffer = [];
function addLine(lineNumber, lineArray) {
	var match = {};
	if(lineNumber) match.lineNumber = lineNumber;
	match.lines = lineArray;

	buffer.push(match);
}

String.prototype.contains = function(expression) {
	return this.indexOf(expression) != -1;
};
