function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}

// function justifyText(questionText,lengthObject) 
//      {
// //PLAN:
//         // il faut que je puissechanger la texture du gameobject avec la forme justifiée du texte de la prochaine question
//         //questionTextObject.setText(justifyText(questionJSON.questions[currentIndex].title));

//         // ICI 
//         //je dois chercher le texte qu'il faut mtn : questionJSON.questions[currentIndex].title
//         // le justifier:
//             //on entre une chaine de caractères et on ajoute un espace à la fin de la chaine
//             //on creer un faut gameobject pour mesurer la taille d'un empty comme ref (textObject)
//             //on sort un chaine de caractères
//             let justifiedText = "";
        
//             //the question is added, the question logic is linked to the next question

//             //ICI: same problem as before... I need to link the scene to this fake text object
//             //solution: mettre les this.blabla dans le create pour que ca soit plus facile avec la scene
//             textObject = context.add.text(50, config.height / 3 - 50, " ", textStyle);
//             const spaceWidth = lengthObject;
//             let maxWidth = config.width - 100;
            
            
            
//             const words = questionText.split(' ')
//             let currentLine = words[0];
            
//             for (let i = 1; i < words.length; i++) {
//                 let potentialLine = currentLine + " " + words[i];
//                 textObject.setText(potentialLine);
                
//                 if (textObject.width <= maxWidth) {
//                     currentLine = potentialLine;
//                 } 
//                 else {
//                     textObject.setText(currentLine)
//                     let extraSpacePixels = maxWidth - textObject.width; 
                    
//                     let numSpacesInLine = currentLine.split(' ').length - 1;
//                     let spacesToAdd = Math.floor(extraSpacePixels / (spaceWidth * numSpacesInLine));
//                     let remainingSpaces = extraSpacePixels - (spacesToAdd * spaceWidth * numSpacesInLine);
                    
//                     let newWords = currentLine.split(' ');
                    
//                     currentLine = newWords[0];
//                     for (let j = 1; j < newWords.length; j++) {
//                         let additionalSpace = spacesToAdd;
//                         if (remainingSpaces > 0) {
//                             additionalSpace++;
//                             remainingSpaces -= spaceWidth;
//                         }
//                         currentLine += ' '.repeat(1 + additionalSpace) + newWords[j];
//                     }
                    
//                     justifiedText += currentLine + "\n";
//                     //return a chain on characters with the added spaces
//                     currentLine = words[i];
//                 }
//             }
//             justifiedText += currentLine;  // add the last line
            
//             return justifiedText;

//         }

