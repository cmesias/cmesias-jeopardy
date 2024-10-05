// You only need to touch comments with the todo of this file to complete the assignment!

/*
=== How to build on top of the starter code? ===

Problems have multiple solutions.
We have created a structure to help you on solving this problem.
On top of the structure, we created a flow shaped via the below functions.
We left descriptions, hints, and to-do sections in between.
If you want to use this code, fill in the to-do sections.
However, if you're going to solve this problem yourself in different ways, you can ignore this starter code.
 */

/*
=== Terminology for the API ===

Clue: The name given to the structure that contains the question and the answer together.
Category: The name given to the structure containing clues on the same topic.
 */

/*
=== Data Structure of Request the API Endpoints ===

/categories:
[
  {
    "id": <category ID>,
    "title": <category name>,
    "clues_count": <number of clues in the category where each clue has a question, an answer, and a value>
  },
  ... more categories
]

/category:
{
  "id": <category ID>,
  "title": <category name>,
  "clues_count": <number of clues in the category>,
  "clues": [
    {
      "id": <clue ID>,
      "answer": <answer to the question>,
      "question": <question>,
      "value": <value of the question (be careful not all questions have values) (Hint: you can assign your own value such as 200 or skip)>,
      ... more properties
    },
    ... more clues
  ]
}
 */

const API_URL = "https://rithm-jeopardy.herokuapp.com/api/"; // The URL of the API.
const NUMBER_OF_CATEGORIES = 5; // The number of categories you will be fetching. You can change this number.
const NUMBER_OF_CLUES_PER_CATEGORY = 5; // The number of clues you will be displaying per category. You can change this number.

let categories = []; // The categories with clues fetched from the API.
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

let activeClue = null; // Currently selected clue data.
let activeClueMode = 0; // Controls the flow of #active-clue element while selecting a clue, displaying the question of selected clue, and displaying the answer to the question.
/*
    0: Empty. Waiting to be filled. If a clue is clicked, it shows the question (transits to 1).
    1: Showing a question. If the question is clicked, it shows the answer (transits to 2).
    2: Showing an answer. If the answer is clicked, it empties (transits back to 0).
 */

let isPlayButtonClickable = true; // Only clickable when the game haven't started yet or ended. Prevents the button to be clicked during the game.

$("#play").on("click", handleClickOfPlay);

/**
 * Manages the behavior of the play button (start or restart) when clicked.
 * Sets up the game.
 *
 * Hints:
 * - Sets up the game when the play button is clickable.
 */
function handleClickOfPlay() {
  // todo set the game up if the play button is clickable
  AppendClueToCategryColumn();
}

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
async function setupTheGame() {
  // todo show the spinner while setting up the game

  // todo reset the DOM (table, button text, the end text)

  // todo fetch the game data (categories with clues)

  // todo fill the table
}

/**
 * Gets as many category IDs as in the `NUMBER_OF_CATEGORIES` constant.
 * Returns an array of numbers where each number is a category ID.
 *
 * Hints:
 * TODO [x] - Use /categories endpoint of the API.
 * TODO [x] - Request as many categories as possible, such as 100.
 * TODO [x] - Randomly pick as many categories as given in the `NUMBER_OF_CATEGORIES` constant
 * TODO [x] - if the number of clues in the category is enough (<= `NUMBER_OF_CLUES_PER_CATEGORY` constant).
 * 
 */
async function getCategoryIds() {
  // todo fetch NUMBER_OF_CATEGORIES amount of categories
  const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/categories/?count=${NUMBER_OF_CATEGORIES}`)

  // todo set after fetching
  let ids = [];

  // Loop through response data
  response.data.forEach(function (value) {
    if (value.clues_count <= NUMBER_OF_CLUES_PER_CATEGORY) {
      ids.push(value.id)
    }
  });

  return ids;
}

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
 * Hints:
 * TODO [x] - You need to call this function for each category ID returned from the `getCategoryIds` function.
 * TODO [x] - Use /category endpoint of the API.
 * TODO [ ] - In the API, not all clues have a value. You can assign your own value or skip that clue.
 */
async function getCategoryData(categoryId) {

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

function AppendClueToCategryColumn() {

  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  // Create 5 rows
  // Create amount of rows from NUMBER_OF_CATEGORIES variable

  for (let i = 0; i < NUMBER_OF_CATEGORIES; i++) {
    // Get the table element in which you want to add row
    let tbody = document.querySelector("tbody");

    // Create a row using the inserRow() method and
    // specify the index where you want to add the row
    let row = tbody.insertRow(-1); // We are adding at the end

    // Give each a group id name: "row_0", ..., "row_4"
    row.setAttribute('id', `row_${i}`);
  }

  // Create amount of rows from NUMBER_OF_CATEGORIES variable
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////

  // Loop through each category id from our promise
  let currentCategoryIdx = 0; // goes from left to right, 0-4 (inclusive)
  let afterColumnIdx = 0; // goes from left to right, 0-4 (inclusive)

  getCategoryIds().then((arr) => {

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

        ///////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////
        // Insert each clue from each category at the end of each row

        // Create clues arr for this category
        let clueIdx = 0;

        // Loop through each clue, then push it to 'clues' array
        for (let clue of category.clues) {
          // Create td to store clue value
          const td = document.createElement('td');
          td.innerText = `$${clue.value}`;  // "$100", "$500" /// td.innerText = clue.question;

          // Store category.id in class of a clue
          // td.classList.add(`category_${category.id}`);
          td.classList.add(`clue`);

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
          ///////////////////////////////////////////////////////////////////////
          ///////////////////////////////////////////////////////////////////////
        }
      });
      // After above function completes do this
    });
  });
}

/**
 * Fills the HTML table using category data.
 *
 * Hints:
 * - You need to call this function using an array of categories where 
 *   each element comes from the `getCategoryData` function.
 * 
 * - Table head (thead) has a row (#categories).
 *   For each category, you should create a cell element (th) and append that to it.
 * 
 * - Table body (tbody) has a row (#clues).
 *   For each category, you should create a cell element (td) and append that to it.
 * 
 *   Besides, for each clue in a category, you should create a row element (tr) 
 *   and append it to the corresponding previously created and appended cell element (td).
 * 
 * - TODO [ ] - To this row elements (tr) should add an event listener (handled by the `handleClickOfClue` function) 
 *   and set their IDs with category and clue IDs. This will enable you to detect which clue is clicked.
 */
function fillTable(categories) {
  // todo
}

$(".clue").on("click", handleClickOfClue);

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
function handleClickOfClue(event) {
  
  // TODO [ ] - show clue question when being clicked on
  // const clues = document.querySelectorAll('.clue');
  // console.log('clues: ', clues);

  // clues.addEvenetListener('click', function(clue) {

  //   console.log('clue: ', clue);
  });
  // todo find and remove the clue from the categories

  // todo mark clue as viewed (you can use the class in style.css), display the question at #active-clue
}

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
  // todo display answer if displaying a question

  // todo clear if displaying an answer
  // todo after clear end the game when no clues are left

  if (activeClueMode === 1) {
    activeClueMode = 2;
    $("#active-clue").html(activeClue.answer);
  }
  else if (activeClueMode === 2) {
    activeClueMode = 0;
    $("#active-clue").html(null);

    if (categories.length === 0) {
      isPlayButtonClickable = true;
      $("#play").text("Restart the Game!");
      $("#active-clue").html("The End!");
    }
  }
}