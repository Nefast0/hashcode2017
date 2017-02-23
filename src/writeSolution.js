function write(SolutionContainer){
	var filepath = "submissionFile";
	var output = Object.keys(SolutionContainer).length;
	for(var cacheID in SolutionContainer) {
		var videoIDs = SolutionContainer[cacheID];
		output += "\n" + cacheID + " " + videoIDs.join(" ");
	}
	writeTextFile(filepath, output);
}

function writeTextFile(filepath, output) {
	var txtFile = new File(filepath);
	txtFile.open("w");
	txtFile.writeln(output);
	txtFile.close();
}

