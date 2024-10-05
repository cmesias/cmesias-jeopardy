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
function handleClickOfPlay ()
{
  // todo set the game up if the play button is clickable
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
async function setupTheGame ()
{
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
async function getCategoryIds ()
{
  // todo fetch NUMBER_OF_CATEGORIES amount of categories
  const response = await axios.get(`https://rithm-jeopardy.herokuapp.com/api/categories/?count=${NUMBER_OF_CATEGORIES}`)

  // todo set after fetching
  let ids = [];

  response.data.forEach(function(value) {
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
 *    "title": <category name>
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
async function getCategoryData (categoryId)
{
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

}

// Loop through each category id from our promise
let currentColumnIdx = 0; // goes from left to right, 0-4 (inclusive)
let afterColumnIdx = 0; // goes from left to right, 0-4 (inclusive)
getCategoryIds().then((arr) => {

  // parse array of ids, need to access each element in the array to get the category id
  arr.forEach(function(id) {

    // Store category in 'categories' array
    getCategoryData(id).then((category) => {


        // For each clue, add them to the correct position in the <tr> row 
        // that corresponds with their respective group group_0, ..., group_4

        // The first clue
        // let idx = 0;
        // for (let clue of category.clues)
        // {
        //   // console.log(`clue.clue.id: ${clue.id}`);
        //   // console.log(`clue.question: ${clue.question}`);
        //   // console.log(`clue.answer: ${clue.answer}`);
        //   // console.log(``);

        //   // Create new 'td' fr clue
        //   const td = document.createElement('td');
        //   td.innerText = clue.question;
          
        //   // Get reference to each group_0, ..., group_4
        //   const tr0 = document.querySelector(`#group_0`);
        //   const tr1 = document.querySelector(`#group_1`);
        //   const tr2 = document.querySelector(`#group_2`);
        //   const tr3 = document.querySelector(`#group_3`);

        //   // console.log(`td ${td}`);
    
        //   // Append td clue question to corresponding column
        //   tr0.append(td);
        //   tr1.append(td);
        //   tr2.append(td);
        //   tr3.append(td);

        //   // Handle next clue in category
        //   idx++;
        // }




        // for (let i=0; row <5; row++) {
          
        //   // Reference to clues container
        //   const clues_container = document.querySelector('#clues');
  
        //   // Append tr to container
        //   clues_container.append(tr);

        // }

      // Store each category in 'categories' array
      categories.push(category);

      // // For each category, append a th element here
      // const th = document.createElement('th');

      // // Add column scope, for screen users, has n visual impact
      // th.scope = "col";

      // // Get and Store category title for this iteration
      // th.innerText = category.title;

      // // Get reference to categories id
      // const categories_id = document.querySelector('#categories');








      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      // Add each column head

      const wrap = document.querySelector('#wrap_for_all_tables');
      const categories_id = document.querySelector('#categories');
      const categry_th = document.createElement('th');

      // Create 'th'
      categry_th.innerText = category.title;

      // Append 'th' to '#categories
      categories_id.append(categry_th);







      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
        const arr = [];

      if (currentColumnIdx == 0) {
        // create 5 table rows (tr)
        for (let i=0; i<NUMBER_OF_CATEGORIES; i++)
        {
          // Create 5 new tr
          const tr = document.createElement('tr');
  
          // Give each a group id name
          tr.setAttribute("id", `group_${i}`);
    
          // Append to id #clues
          const clues_tr = document.querySelector('#clues');
  
          // Append new table row (tr) into clues_tr
          clues_tr.append(tr);

          arr.push();
        }

      } else {
        
            // const group0 = document.querySelector(`#group_0`);  // 'group_0'
            // const group1 = document.querySelector(`#group_1`);
            // const group2 = document.querySelector(`#group_2`);
            // const group3 = document.querySelector(`#group_3`);
            // const group4 = document.querySelector(`#group_4`);
  
            // // Add question to td
            // for (let clue of category.clues)
            // {
            //   // Create new 'td' for each clue
            //   const td2 = document.createElement('td');
            //   td2.innerText = clue.question;
  
            //   // Append each clue to all groups
            //   group0.append(td2);
            //   group1.append(td2);
            //   group2.append(td2);
            //   group3.append(td2);
            //   group4.append(td2);
            // }

      }

        
      const group0 = document.querySelector(`#group_0`);  // 'group_0'
      const group1 = document.querySelector(`#group_1`);  // 'group_1'
      const group2 = document.querySelector(`#group_2`);  // 'group_2'
      const group3 = document.querySelector(`#group_3`);  // 'group_3'
      const group4 = document.querySelector(`#group_4`);  // 'group_4'

      const groupAll = [group0, group1, group2, group3, group4];

        // Create new 'td' for each clue
        const td = document.createElement('td');
        td.innerText = category.clues[ currentColumnIdx ].question;
        
        // append each tr to each group
        groupAll[currentColumnIdx].append(td);


      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////






      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////

      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      // Add corresponding clue under each category clumn

      // Get clues tr
      {
        for (let clue of category.clues)
        {
          // const clues_tr = document.querySelector('#clues');

          //   // Create new tr
          //   const tr = document.createElement('tr');

          //   // Create new td
          //   const td = document.createElement('td');

          //   // Insert clue into tr
          //   td.innerText = clue.question;

          //   // Append table data (td) into new table row (tr)
          //   tr.append(td);

          //   // Append new table row (tr) into clues_tr
          //   clues_tr.append(tr);
        }

        // const wrap = document.querySelector('#wrap_for_all_tables');
        // const categories_id = document.querySelector('#categories');
        // const categry_th = document.createElement('th');
  
        // // Create 'th'
        // categry_th.innerText = category.title;
  
        // // Append 'th' to '#categories
        // categories_id.append(categry_th);
      }

      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////

















      // Append to #categories id
      // categories_id.append(th);

      // On first categry index, create column heads
      // For each category, create a tr element
      /////////////if (currentColumnIdx === 0) {
        // // console.log(`-----------------------------------------------------------------------------------------------`);
        // // console.log(`>>>>>>>>>>>>>>>>>> First now, currentColumnIdx: ${currentColumnIdx} <<<<<<<<<<<<<<<<<<<<<<<<<`);

        // // // // Debug
        // // console.log('#####################################################################');
        // // console.log(`####     Title: ${category.title}`);
        // // console.log(`####     Id: ${category.id}`);
        // // console.log(`####     Clues: ${category.clues.length}`);
        // // console.log(`###      Current category: ${category.title}, \t\tcategory index: ${currentColumnIdx}`);
        // // console.log('#####################################################################');

        // // First row
        // let row = 0;
        // for (row=0; row <NUMBER_OF_CATEGORIES; row++) {

        //   // Create table row
        //   const tr = document.createElement('tr');

        //   // Set id as '#group_0' and so on
        //   tr.setAttribute("id", `group_${row}`)

        //   // Get reference to categories id
        //   const clues_id = document.querySelector('#clues');
    
        //   // Append to #categories id
        //   // clues_id.append(tr);
        // }

        // // After creating 5 rows add the first clues from the first category only to each group
        // // console.log(`Adding ---------------->${category.title}`);
        // for (let clue of category.clues)
        // {
        //   // console.log('=============================================================');
        //   // console.log(`\t\t\t\tAdding clue: ${clue.question}, currently on category [${category.title}]`);
        //   // console.log(`\t\t\t\tClue id: ${clue.id}`);
        //   // console.log(`\t\t\t\tClue question: ${clue.question}`);
        //   // console.log(`\t\t\t\tClue answer: ${clue.answer}`);
        //   // console.log('=============================================================');
          
        //   const group0 = document.querySelector(`#group_0`);  // 'group_0
        //   const group1 = document.querySelector(`#group_1`);
        //   const group2 = document.querySelector(`#group_2`);
        //   const group3 = document.querySelector(`#group_3`);
        //   const group4 = document.querySelector(`#group_4`);

        //   // Create new 'td' for each clue
        //   const td = document.createElement('td');

        //   // Add question to td
        //   td.innerText = clue.question;

        //   // Append each clue to all groups
        //   // group0.append(td);
        //   // group1.append(td);
        //   // group2.append(td);
        //   // group3.append(td);
        //   // group4.append(td);
        // }
        // console.log(`------------------------------------- DONE FIRST APPENDING ------------------------------------`);
        // console.log(`-----------------------------------------------------------------------------------------------`);
      ///////////}
      
      // Now handle all other clues
      //////////////else {

        // console.log(``);
        // console.log(`------------------------------------------------------------------------------------------------------------`);
        // console.log(`>>>>>>>>>>>>>>>>>> else now, currentColumnIdx: ${currentColumnIdx} <<<<<<<<<<<<<<<<<<<<<<<<<`);

        // // // Debug
        // console.log('#####################################################################');
        // console.log(`####     Title: ${category.title}`);
        // console.log(`####     Id: ${category.id}`);
        // console.log(`####     Clues: ${category.clues.length}`);
        // console.log(`###      Current category: ${category.title}, \t\tcategory index: ${currentColumnIdx}`);
        // console.log('#####################################################################');

        // console.log(`Adding ---------------->${category.title}`);
        // for (let clue of category.clues)
        // {
        //   console.log('=============================================================');
        //   console.log(`\t\t\t\tAdding clue: ${clue.question}, currently on category [${category.title}]`);
        //   console.log(`\t\t\t\tClue id: ${clue.id}`);
        //   console.log(`\t\t\t\tClue question: ${clue.question}`);
        //   console.log(`\t\t\t\tClue answer: ${clue.answer}`);
        //   console.log('=============================================================');

        //     const group0 = document.querySelector(`#group_0`);  // 'group_0
        //     const group1 = document.querySelector(`#group_1`);
        //     const group2 = document.querySelector(`#group_2`);
        //     const group3 = document.querySelector(`#group_3`);
        //     const group4 = document.querySelector(`#group_4`);
  
        //     // Create new 'td' for each clue
        //     const td2 = document.createElement('td');
  
        //     // Add question to td
        //     td2.innerText = clue.question;
  
        //     // Append each clue to all groups
        //     // group0.append(td2);
        //     // group1.append(td2);
        //     // group2.append(td2);
        //     // group3.append(td2);
        //     // group4.append(td2);
        // }
        // console.log(`------------------------------------- DONE REST OF CATEGORIES APPENDING ------------------------------------`);
        // console.log(`------------------------------------------------------------------------------------------------------------`);
        // console.log(``);
     ////////////// }
    
      // Next categry
      currentColumnIdx++;
    });
  // After above function completes do this
  });
});

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
 * - To this row elements (tr) should add an event listener (handled by the `handleClickOfClue` function) 
 *   and set their IDs with category and clue IDs. This will enable you to detect which clue is clicked.
 */
function fillTable (categories)
{
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
function handleClickOfClue (event)
{
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
function handleClickOfActiveClue (event)
{
  // todo display answer if displaying a question

  // todo clear if displaying an answer
  // todo after clear end the game when no clues are left

  if (activeClueMode === 1)
  {
    activeClueMode = 2;
    $("#active-clue").html(activeClue.answer);
  }
  else if (activeClueMode === 2)
  {
    activeClueMode = 0;
    $("#active-clue").html(null);

    if (categories.length === 0)
    {
      isPlayButtonClickable = true;
      $("#play").text("Restart the Game!");
      $("#active-clue").html("The End!");
    }
  }
}