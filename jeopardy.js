/*
 * TODOs 1
 * [x] - todo show the spinner while setting up the game
 * [x] - todo reset the DOM (table, button text, the end text)
 * [x] - todo fetch the game data (categories with clues)
 * [x] - todo fill the table
 *
 * TODOs 2
 * [x] - show clue question when being clicked on
 * [x] - find and remove the clue from the categories
 */

const API_URL = "https://rithm-jeopardy.herokuapp.com/api/"; // The URL of the API.
const NUMBER_OF_CATEGORIES = 5; // The number of categories you will be fetching. You can change this number.
const NUMBER_OF_CLUES_PER_CATEGORY = 5; // The number of clues you will be displaying per category. You can change this number.

/*
[
  {
    "id": <category ID>,
    "title": <category name>,
    "clues": [
      {
        "id": <clue ID>,
        "value": <value (e.g. $200)>,
        "question": <question>,
        "answer": <answer>
      },
      ... more categories
    ]
  },
  ... more categories
]
 */
let categories = []; // The categories with clues fetched from the API.

/* 
  All clues, it will have an array of objects with 'clue.question', and 'clue.answer': 
  [
    {question: 'Question 1', answer: "Im an answer 1", id: "1183"},
    {question: 'Question 2', answer: "Im an answer 2", id: "632"},
    {question: 'Question 3', answer: "Im an answer 3", id: "1"},
    {question: 'Question 4', answer: "Im an answer 4", id: "42"}
  ]
*/
let clues = [];

let activeClue = null; // Currently selected clue data.
let activeClueMode = 0; // Controls the flow of #active-clue element while selecting a clue, displaying the question of selected clue, and displaying the answer to the question.
/*
    0: Empty. Waiting to be filled. If a clue is clicked, it shows the question (transits to 1).
    1: Showing a question. If the question is clicked, it shows the answer (transits to 2).
    2: Showing an answer. If the answer is clicked, it empties (transits back to 0).
 */

let isPlayButtonClickable = true; // Only clickable when the game haven't started yet or ended. Prevents the button to be clicked during the game.

// bufferoverflow - use code to jailbreak ps4

/**
 * Sets up the game.
 *
 * 1. Cleans the game since the user can be restarting the game.
 * 2. Get category IDs
 * 3. For each category ID, get the category with clues.
 * 4. Fill the HTML table with the game data.
 *
 * Hints:
 * - The game play is managed via events.
 */
function resetGame() {

  // [x] - enable spinner
  $('#spinner').removeClass('disabled');

  // [x] - clear thead
  $(".clicking-outside table thead #categories").html("");

  // [x] - clear tbody
  $(".clicking-outside table tbody").html("");

  // [x] - clear active-clue box
  $(".clicking-outside #active-clue").html("");

  // [x] - hide active-clue box
  $("#active-clue").addClass("disabled");

  // [x] - Create 'x' box inside 'active-clue' box
  {
    // Create this
    // <div class="close-active">x</div>

    // create div to close-active box
    const div = document.createElement('div');

    // add class 'close-active'
    div.classList.add('close-active'); 

    // add 'x' text
    div.innerText = 'x';

    // append to 'active-clue' box
    const activeClueBoxById = document.getElementById('active-clue');
    activeClueBoxById.append(div);
  }

  // [ ] - modify button text to 'Start The Game'
  $("#play").text("Start the Game!");//

}

function Create5Rows() {

  // Create amount of rows from 'NUMBER_OF_CATEGORIES' variable

  for (let i = 0; i < NUMBER_OF_CATEGORIES; i++) {
    // Get the table element in which you want to add row
    let tbody = document.querySelector("tbody");

    // Create a row using the inserRow() method and
    // specify the index where you want to add the row
    let row = tbody.insertRow(-1); // We are adding at the end

    // Give each a group id name: "row_0", ..., "row_4"
    row.setAttribute('id', `row_${i}`);
  }
}

// Listen for 'Start the Game' button
$("#play").on("click", handleClickOfPlay);

/**
 * Manages the behavior of the play button (start or restart) when clicked.
 * Sets up the game.
 *
 * Hints:
 * - Sets up the game when the play button is clickable.
 */
function handleClickOfPlay() {
  if (isPlayButtonClickable) {
    isPlayButtonClickable = false;

    // Clear the table
    resetGame()

    // Create 5 rows under table heads
    Create5Rows();

    // todo set the game up if the play button is clickable
    AppendClueToCategryColumn();
  }
}

/**
 * Gets as many category IDs as in the `NUMBER_OF_CATEGORIES` constant.
 * Returns an array of numbers where each number is a category ID.
 *
 * Hints:
 * - Use /categories endpoint of the API.
 * - Request as many categories as possible, such as 100.
 * - Randomly pick as many categories as given in the `NUMBER_OF_CATEGORIES` constant
 * - if the number of clues in the category is enough (<= `NUMBER_OF_CLUES_PER_CATEGORY` constant).
 * 
 */
async function getCategoryIds() {
  // todo fetch NUMBER_OF_CATEGORIES amount of categories
  const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/categories/?count=${NUMBER_OF_CATEGORIES}`)

  // todo set after fetching
  let ids = [];

  // Store 'response.data' in 'data'
  let data = response.data;

  // Loop through response data
  data.forEach(function (value) {
    if (value.clues_count <= NUMBER_OF_CLUES_PER_CATEGORY) {
      ids.push(value.id)
    }
  });

  return ids;
}

// Gets category with as many clues as given in the `NUMBER_OF_CLUES_PER_CATEGORY` constant.
async function getCategoryData(categoryId) {

  /**
   * Gets category with as many clues as given in the `NUMBER_OF_CLUES_PER_CATEGORY` constant.
   * Returns the below data structure:
   *  {
   *    "id": <category ID>
   *    "title": <category name> // baseball
   *    "clues": [
   *      {
   *        "id": <clue ID>,
   *        "value": <value of the question>,
   *        "question": <question>,
   *        "answer": <answer to the question>
   *      },
   *      ... more clues
   *    ]
   *  }
   *
   */
  const categoryWithClues = {
    id: categoryId,
    title: undefined, // TODO [x] - todo set after fetching
    clues: []         // TODO [x] - todo set after fetching
  };

  // todo fetch the category with NUMBER_OF_CLUES_PER_CATEGORY amount of clues
  let res = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/category?id=${categoryId}`)

  // This is a category we fetched with it's id, store it in 'categories' array
  categoryWithClues.title = res.data.title;
  categoryWithClues.clues = res.data.clues;

  return categoryWithClues;
}

async function AppendClueToCategryColumn() {

  // Loop through each category id from our promise
  await getCategoryIds().then((arr) => {

    // parse array of ids, need to access each element in the array to get the category id
    arr.forEach(function (id) {

      // Store category in 'categories' array
      getCategoryData(id).then((category) => {

        // Store each category in 'categories' array
        categories.push(category);

        ///////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////
        // Add each column head /// "baseball", "movies", "time", "odd jobs", "cat" egory

        const categories_id = document.querySelector('#categories');

        // Create table header
        const th = document.createElement('th');

        // Added the category title to a table header
        th.innerText = category.title.toUpperCase(); // baseball, ...

        // Append 'th' to '#categories
        categories_id.append(th);

        // Get reference to each row
        const row_0 = document.getElementById('row_0');  // 'row_0'
        const row_1 = document.getElementById('row_1');  // 'row_0'
        const row_2 = document.getElementById('row_2');  // 'row_0'
        const row_3 = document.getElementById('row_3');  // 'row_0'
        const row_4 = document.getElementById('row_4');  // 'row_0'

        /////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////
        // Insert each clue from each category at the end of each row

        // Create clues arr for this category
        let clueIdx = 0;

        // Loop through each clue, then append to corresponding column
        for (let clue of category.clues) {
          // Create td to store clue value
          const td = document.createElement('td');
          td.innerText = `$${clue.value}`;  // "$100", "$500" /// td.innerText = clue.question; // console.log(`clue.question: ${clue.question}`)

          // Store all clues in an object and append it it 'clues' array of objectts
          const clue_object = {
            question: clue.question,
            answer: clue.answer,
            value: clue.value,
            id: clue.id,
          };

          // Append to 'clues' array
          clues.push(clue_object);

          // Add class 'clue' to 'td'
          td.classList.add(`clues`);

          // Store clue.id in clue id
          td.setAttribute('id', clue.id)

          ///////////////////////////////////////////////////////////////////////
          /// Loop through each clue array then append at the end of each row ///

          // Append each clue into each row
          if (clueIdx == 0) {
            row_0.append(td);
          }
          else if (clueIdx == 1) {
            row_1.append(td);
          }
          else if (clueIdx == 2) {
            row_2.append(td);
          }
          else if (clueIdx == 3) {
            row_3.append(td);
          }
          else if (clueIdx == 4) {
            row_4.append(td);
          }

          /// Loop through each clue array then append at the end of each row ///
          ///////////////////////////////////////////////////////////////////////

          // Next clue
          clueIdx++;

          // Insert each clue from each category at the end of each row
          /////////////////////////////////////////////////////////////////////////////////////
          /////////////////////////////////////////////////////////////////////////////////////
        }

      });
      // After above function completes do this
    });
  });

  // If content loaded, show table
  $('table').removeClass('disabled');

  // If content loaded, disable spinner
  $('#spinner').addClass('disabled');
}

// Listen for clicks on 'x' out of active-clue box
$('section').on('click', '.close-active', function () {
  
  // Remove any questions
  $('#active-clue .clue-question').remove();

  // Remove any answers
  $('#active-clue .clue-answer').remove();

  // Check if clues exist
  let cluesExist = categories.some(function (category) {
    return category.clues.length > 0;
  });

  // If clues still exist, continue game
  if (cluesExist)
  {
    // Get reference to #active-clue box
    const activeClueBox = document.getElementById('active-clue');
  
    // Hide active clue
    activeClueBox.classList.add('disabled');
  
    // Reset activeClueMode 0
    activeClueMode = 0;
  } 

  // If no more clues exist, end the game
  else {

    // Get reference to #active-clue box
    const activeClueBox = document.getElementById('active-clue');
  
    // Hide active clue
    activeClueBox.classList.add('disabled');

    // Set play button clickable
    isPlayButtonClickable = true;

    // Remove 'clue-end' from active-clue box
    $('#active-clue .clue-end').remove();

    // Modify button to 'Restart the Game!'
    $("#play").text("Restart the Game!");//

    // Ovverides above 'activeClueMode' if we're at the last clue
    activeClueMode = 0;
  }
});

// Listen for clicks on clues
$('table').on('click', '.clues', function (event) {

  // [x] - todo mark clue as viewed (you can use the class in style.css), display the question at #active-clue
  const target = event.target;

  // Check if target already has 'viewed' class
  if (target.classList.contains('viewed')) {
    alert('Clue removed, you viewed it already!');
  } 
  
  // If it doesn't exist, add 'viewed' class and add it to activeClue
  else {

    // Clear question from active-clue box when viewing a clue
    $("#active-clue .clue-question").remove();

    // Add class 'viewed' to 'td'
    target.classList.add('viewed');   
  
    // Usually the child inside a parent
    const clueId = event.target.getAttribute("id");
  
    // Handle click of clue
    handleClickOfClue(clueId)

    // Clear clue from category when viewed
    removeClueFromCategory(activeClue);
  }
});

/**
 * Manages the behavior when a clue is clicked.
 * Displays the question if there is no active question.
 *
 * Hints:
 * - Control the behavior using the `activeClueMode` variable.
 * - Identify the category and clue IDs using the clicked element's ID.
 * - Remove the clicked clue from categories since each clue should be clickable only once. Don't forget to remove the category if all the clues are removed.
 * - Don't forget to update the `activeClueMode` variable.
 *
 */
function handleClickOfClue(clueId) {

  // Get reference to #active-clue box
  const activeClueBox = document.getElementById('active-clue');

  // Get clue object if matches
  const matchingClue = clues.find(function (clue) {
    return clueId == clue.id;
  });

  // Create div for question
  const div = document.createElement('div');

  // Add clue question to div
  div.innerText = matchingClue.question;

  // Give clue a class 'question'
  div.classList.add('clue-question');

  // Append div to #active-clue box
  activeClueBox.append(div);

  // Unhide active clue box
  activeClueBox.classList.remove('disabled');

  // Store active clue here
  activeClue = {
    question: matchingClue.question,
    answer: matchingClue.answer,
    id: matchingClue.id,
  };

  // Set next mode for active clue
  activeClueMode = 1;
}

// Remove clue from category
function removeClueFromCategory(currentActiveClue) {
  
  // Get category index
  const catIdx = categories.findIndex(function (category) {
   
    return category.clues.some(function (clue) {   // this will return the clue's corresponding categry index 
      
      return clue.id == currentActiveClue.id;     // returns true or false
    });
  })

  // Get clue index
  const clueIdx = categories[catIdx].clues.findIndex(function (clue) {
    return clue.id == currentActiveClue.id;
  });

  // Remove clue from category
  categories[catIdx].clues.splice(clueIdx, 1);
}

// Liste for #active-clue box clicks
$("#active-clue").on("click", handleClickOfActiveClue);

/**
 * Manages the behavior when a displayed question or answer is clicked.
 * Displays the answer if currently displaying a question.
 * Clears if currently displaying an answer.
 *
 * Hints:
 * - Control the behavior using the `activeClueMode` variable.
 * - After clearing, check the categories array to see if it is empty to decide to end the game.
 * - Don't forget to update the `activeClueMode` variable.
 */
function handleClickOfActiveClue(event) {

  // Remove clue question, then go to remove-answer mode
  if (activeClueMode === 1) {

    // Set active clue mode to remove-answer mode
    activeClueMode = 2;

    // Remove question from active-clue box
    $("#active-clue .clue-question").remove();

    // add answer
    {
      // Get reference to #active-clue box
      const activeClueBox = document.getElementById('active-clue');

      // Create div for answer
      const div = document.createElement('div');

      // Add clue question to div
      div.innerText = activeClue.answer;

      // Give clue a class 'question'
      div.classList.add('clue-answer');

      // Append div to #active-clue
      activeClueBox.append(div);
    }
  }

  // Remove clue answer, and hide active-clue box
  else if (activeClueMode === 2) {

    // Set active clue mode to nothing mode
    activeClueMode = 0;

    // Remove answer from active-clue box
    $("#active-clue .clue-answer").remove();

    // Check if clues exist
    let cluesExist = categories.some(function (category) {
      return category.clues.length > 0;
    });

    // If no more clues exist, end the game
    if (!cluesExist)
    {
      // Set play button clickable
      isPlayButtonClickable = true;

      // Create clue-end text
      {
        // <div class="clue-end">The End</div>
        const div = document.createElement('div');
        div.classList.add('clue-end');
        div.innerText = 'The End!';

        // append to active-clue box
        const activeClueBox = document.getElementById('active-clue');
        activeClueBox.append(div);
      }

      // Ovverides above 'activeClueMode' if we're at the last clue
      activeClueMode = 3;
    } 
    
    // If clues still exist, hide #active-clue box
    else {

      // Get reference to #active-clue
      const activeClueBox = document.getElementById('active-clue');

      // Hide active clue
      activeClueBox.classList.add('disabled');
    }
  }

  // 'The End' mode
  else if (activeClueMode === 3) {

    // Get reference to #active-clue
    const activeClueBox = document.getElementById('active-clue');
    
    // Hide active clue
    activeClueBox.classList.add('disabled');

    // Remove 'clue-end' from active-clue box
    $('#active-clue .clue-end').remove();

    // Modify button to 'Restart the Game!'
    $("#play").text("Restart the Game!");//

    // Default
    activeClueMode = 0;
  }
}