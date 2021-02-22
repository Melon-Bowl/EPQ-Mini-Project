// Egor's test classification code for the Feasibility Study.
  
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/5199OCYIx/';
  
// Define variables in the gloabl scope
let classifier;
let species;
let confidence_level;
let confidence_level_output;
let myResults;

// Asyncronous function which loads the classifier alongisde the main web page --> faster loading
async function initClassifier() {
    let promise = new Promise((res, rej) => {   
        res(ml5.imageClassifier(imageModelURL + 'model.json'))
    });
    classifier = await promise;
    console.log("Model Loaded.");
}

// This function runs when the user clicks the "Upload image button"
let loadFile = function(event) {
    try {
        // Gets the user uploaded image and displays it on the web page
        let image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
    
        classifier.predict(document.getElementById('output'), function(err, results) {
            console.log(results); // Prints the raw results to the console
            myResults = results; // Assigns the array of objects to a variable so that I can work with the results

            species = myResults[0].label; // Gets the label of the first object in the array (a.k.a. the one with the highest confidence)
            console.log(species); // Prints to the console
            document.getElementById('ml-result').innerHTML = species; // Displays the species recognised on the web page
            
            confidence_level = myResults[0].confidence; // Get the confidence level from the array of objects
            confidence_level = confidence_level * 100; // Make percentage
            confidence_level_output = confidence_level.toFixed(2); // Round up
            document.getElementById('confidence-level').innerHTML = confidence_level_output; // Output
        });
    } catch(e) {
        console.log(e);
    }
}

// Runs the initClassifier function to initialise the classifier.s
initClassifier();
