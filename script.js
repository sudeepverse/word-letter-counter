window.onload = function() {
    // Clear the result area when the page loads
    document.getElementById('result').innerHTML = "";
}

function countWordsAndLetters() {
    var paragraph = document.getElementById('paragraphInput').value.trim();

    if (paragraph === "") {
        showAlert("Please write or paste something first.");
        // Clear the result area if the text area is empty
        document.getElementById('result').innerHTML = "";
        return;
    }

    // Count letter frequencies
    var letterFrequencies = {};
    // Split paragraph into characters
    var characters = paragraph.toLowerCase().match(/[a-z]/g);
    if (characters) {
        characters.forEach(function(char) {
            letterFrequencies[char] = (letterFrequencies[char] || 0) + 1; // Count each occurrence of the letter
        });
    }

    // Count word frequencies
    var wordFrequencies = {};
    // Split paragraph into words using any non-alphabetic character as separators
    var words = paragraph.split(/[^a-z]+/i).filter(function(word) {
        return word.length > 0; // Check if the word is not empty
    });

    words.forEach(function(word) {
        var lowercaseWord = word.toLowerCase();
        wordFrequencies[lowercaseWord] = (wordFrequencies[lowercaseWord] || 0) + 1;
    });

    // Counting total number of sentences
    var sentenceCount = (paragraph.match(/[a-z][.!?]+/ig) || []).length;

    // Find most used letter(s)
    var mostUsedLetter = '';
    var maxLetterFrequency = 1;
    for (var letter in letterFrequencies) {
        if (letterFrequencies[letter] >= 2 && letterFrequencies[letter] >= maxLetterFrequency) {
            if (letterFrequencies[letter] > maxLetterFrequency) {
                mostUsedLetter = letter.toUpperCase();
                maxLetterFrequency = letterFrequencies[letter];
            } else {
                mostUsedLetter += ', ' + letter.toUpperCase();
            }
        }
    }

    // Find most used words
    var mostUsedWords = [];
    var maxWordFrequency = 1;
    for (var word in wordFrequencies) {
        if (wordFrequencies[word] >= 2 && wordFrequencies[word] >= maxWordFrequency) {
            if (wordFrequencies[word] > maxWordFrequency) {
                mostUsedWords = [word];
                maxWordFrequency = wordFrequencies[word];
            } else {
                mostUsedWords.push(word);
            }
        }
    }

    // Prepare the result string
    var result = "Total Letters: " + (characters ? characters.length : 0) + "<br>" +
                 "Total Words: " + words.length + "<br>";

    // Add sentence count line if there are any
    if (sentenceCount > 0) {
        result += "Total Sentences: " + sentenceCount + "<br>";
    }

    // Add most used letter(s) line if there are any
    if (mostUsedLetter !== '') {
        result += "Most Used Letter(s): " + mostUsedLetter + "<br>";
    }

    // Add most used word(s) line if there are any
    if (mostUsedWords.length > 0) {
        result += "Most Used Word(s): " + mostUsedWords.join(', ') + "<br>";
    }

    // Display the result
    document.getElementById('result').innerHTML = result;
}

function showAlert(message) {
    var alertBox = document.getElementById('alertBox');
    var alertMessage = document.getElementById('alertMessage');
    alertMessage.innerHTML = message;
    alertBox.style.display = 'block';

    // Hide the alert box after 1.5 seconds
    setTimeout(function() {
        alertBox.style.display = 'none';
    }, 1500);
}
