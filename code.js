//
// function to get information from a given text
//
function getStats(txt) {
    let txtInfo = {
        nChars: txt.length,
        nWords: 0,
        nLines: 0,
        nNonEmptyLines: 0,
        maxLineLength: 0,
        averageWordLength: 0,
        palindromes: [],
        longestWords: [],
        mostFrequentWords: [],
    };

    (function getLineInfo() {
        let lines = txt.split('\n');
        txtInfo.nLines = txt.length === 0 ? 0 : lines.length;
        for(let l of lines) {
            if(l.trim().length !== 0) {
                txtInfo.nNonEmptyLines++;
            }
            if(l.length > txtInfo.maxLineLength) {
                txtInfo.maxLineLength = l.length;
            }
        }
    })();

    (function getWordInfo() {
        let wordDict = {};
        let wordLengths = [];
        let uniqueWords = [];
        let word = "";
        let c;
        if(txtInfo.nChars !== 0) {
            for (c of txt) {
                if (c.match(/^[0-9a-zA-Z]+$/)) {
                    word += c;
                }
                else {
                    if (word.length > 0) {
                        addToVars();
                    }
                }
            }
            //add the last word in the txt
            //if the txt doesn't end with non alphanumeric
            if (c.match(/^[0-9a-zA-Z]+$/)) {
                addToVars();
            }
        }

        //helper function to populate variables
        function addToVars() {
            wordLengths.push(word.length);
            txtInfo.nWords++;
            word = word.toLowerCase();
            if (uniqueWords.indexOf(word) === -1) {
                uniqueWords.push(word);
            }
            if (isNaN(wordDict[word])) {
                wordDict[word] = 1;
            }
            else {
                wordDict[word]++;
            }
            word = "";
        }

        //average word length
        if(wordLengths.length !== 0) {
            (function getAvgWordLength() {
                for (let len of wordLengths) {
                    txtInfo.averageWordLength += len;
                }
                txtInfo.averageWordLength /= wordLengths.length;
            })();
        }

        //palindromes
        (function getPalindromes() {
            for (let w of uniqueWords) {
                if (w.length > 2) {
                    if (w.split("").reverse().join("") === w) {
                        txtInfo.palindromes.push(w);
                    }
                }
            }
        })();

        //longest words
        (function getLongestWords() {
            uniqueWords.sort(function(a, b) {
                return b.length - a.length || a.localeCompare(b);
            });
            txtInfo.longestWords = uniqueWords.slice(0, 10);
        })();

        //word frequency
        (function getWordFreq() {
            let wordFreq = Object.keys(wordDict).map(function(key) {
                return [key, wordDict[key]];
            });
            wordFreq.sort(function(a, b) {
                return b[1] - a[1] || a[0].localeCompare(b[0]);
            });
            wordFreq = wordFreq.slice(0, 10);
            for (let i = 0; i < wordFreq.length; i++) {
                txtInfo.mostFrequentWords.push(wordFreq[i][0] + "(" + wordFreq[i][1] + ")");
            }
        })();
    })();

    return txtInfo;
}

