function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}

//this is a computationnally heavy and imperfect method for justification of text, but considering the scope of the project, this methods will do just fine
function justifyText(textObject, text, maxWidth){
    const words = text.split(' ');
    let space = " "
    let currentLine = words[0];
    let justifiedText = "";
    
    //measure space width: BUGG
    textObject.setText(' ');
    const spaceWidth = textObject.width;
    
    for (let i = 1; i < words.length; i++) {
        let potentialLine = currentLine + space + words[i];
        textObject.setText(potentialLine)
        //si la longueure en pixels de la chaine de characters (potential)
        
        if (textObject.width <= maxWidth) {
            currentLine = potentialLine;
        } 
        else {
            textObject.setText(currentLine)
            let extraSpacePixels = maxWidth - textObject.width; 
            
            let numSpacesInLine = currentLine.split(' ').length - 1;
            let spacesToAdd = Math.floor(extraSpacePixels / (spaceWidth * numSpacesInLine));
            let remainingSpaces = extraSpacePixels - (spacesToAdd * spaceWidth * numSpacesInLine);
            
            let newWords = currentLine.split(' ');
            
            currentLine = newWords[0];
            for (let j = 1; j < newWords.length; j++) {
                let additionalSpace = spacesToAdd;
                if (remainingSpaces > 0) {
                    additionalSpace++;
                    remainingSpaces -= spaceWidth;
                }
                currentLine += ' '.repeat(1 + additionalSpace) + newWords[j];
            }
            
            justifiedText += currentLine + "\n";
            currentLine = words[i];
        }
    }
    justifiedText += currentLine;  // add the last line
    
    return justifiedText;
}