export function write(SolutionContainer){
	var filepath = "submissionFile";
	var output = String(Object.keys(SolutionContainer).length);
	for(var cacheID in SolutionContainer) {
		var videoIDs = SolutionContainer[cacheID];
		output += "\n" + cacheID + " " + videoIDs.join(" ");
	}
	writeTextFile(filepath, output);
}

export function writeTextFile(filepath, output) {
	console.log(output);
}

