`use strict`;

const inputDaysWithout = document.querySelector(`.input-days-without`);
const btnGo = document.querySelector(`.btn-go`);
const container = document.querySelector(`.content-container`);
const containerInner = document.querySelector(`.content-container-inner`);
const btnRefresh = document.querySelectorAll(`.btn-refresh`);
const sugg = document.querySelector(`.suggestion`);
const btnDiffUp = document.querySelector(`.difficulty-up`);
const btnDiffDown = document.querySelector(`.difficulty-down`);

let isActive = false;

//These are tiers based on severity of the symptoms with tier 3 being more involved solutions for the beginners and tier3 being quick fixes for the people who just need a hand not to relapse
const tier3Solutions = [
  `Go for a walk`,
  `try supplementing cigarettes with bottled water`,
  `Get something to figit with in your hands`,
  `Do 30 pushups every time you get a craving`,
  `Get yourself something to chew on like a toothpick`,
  `Do tasks you put off when a craving strikes`,
  `Take a shower or a bath`,
  `light incense or a candle instead of a cigarette`,
  `Remind yourself why you are doing this and you cannot have just 1`,
  `Wear a rubber band on your wrist and snap it when you get cravings`,
];

const tier2Solutions = [
  `Avoid any triggers`,
  `Avoid spicy and sugary foods`,
  `Nibble on low calorie or healthy foods when getting cravings`,
  `Consider hosting dinners or game nights to keep busy at home`,
  `Learn relaxation teqniques that can deploy in times of frustration`,
  `spread out your meals so that they are more enjoyable when you do have them`,
  `Celebrate the milestones that you have been without smoking`,
  `Frozen grapes can be a great snack to reduce cravings`,
  `Make a list of why you are doing this and refer to it often`,
  `have a portable hobby that you can pck up and put down any time`,
];

const tier1Solutions = [
  `Get a vape pen`,
  `Nicotine replacement therapy`,
  `Nicotine Patches Or Nicotine Gum`,
  `Starting with a gym`,
  `Get a new active hobby such as bike riding`,
  `Buy some herbal cigarettes and use real ones less and less`,
  `Seek a quit smoking counsellor`,
  `Change your eating habits drink more water and eat well `,
  `Try to stay away from people and areas where smoking is common place`,
  `Try to stay clear of alcohol and coffee or any drinks that you link with smoking`,
];

const tier1String = `As you are just starting your quitting journey the suggestions you see here will be more intense and involved if you want some quick fixes simply click the reduce difficulty button`;
const tier2String = `These solutions are for people who have been without for a little while and just need a little help when a craving occurs`;
const tier3String = `Here are some quick fixes that you can quickly use to help stop a craving in its tracks, keep up the good work`;

let tick = 0;
let currTier;
let currSuggestion;

btnGo.addEventListener(`click`, function (e) {
  if (isNaN(Number(inputDaysWithout.value))) {
    alert(`Please Enter A Number`);
  } else {
    e.preventDefault();

    containerInner.innerHTML = ``;

    let numDays = Number(inputDaysWithout.value);
    let getTier =
      numDays < 20
        ? 3
        : numDays < 60 && numDays > 20
        ? 2
        : numDays > 60
        ? 1
        : 1;

    let currTierString =
      getTier === 1
        ? tier3String
        : getTier === 2
        ? tier2String
        : getTier === 3
        ? tier1String
        : tier3String;

    currTier = getTier;

    container.insertAdjacentHTML(
      `afterbegin`,
      `<h2 class="suggestion-title">${currTierString}</h2>`
    );

    container.insertAdjacentHTML(
      `beforeend`,
      `
    <div class="btns-difficulty">
    <button class="btn-difficulty difficulty-down">Solution Strength +1</button>
    <p class="solution-strength-text">Solution Strength: ${currTier}</p>
    <button class="btn-difficulty difficulty-up">Solution Strength -1</button>
   
    </div>
    `
    );

    //loop this if i wanted more than 3 suggestions

    // runApp(numDays, getTier);
    // runApp(numDays, getTier);
    // runApp(numDays, getTier);

    generateSuggs();
  }
});

const generateSuggs = function () {
  for (let i = 0; i < 3; i++) {
    runApp(currTier);
  }
};

const getSuggestion = function (tier) {
  let randomNum = Math.trunc(Math.random() * 10);

  return tier === 1
    ? tier3Solutions[randomNum]
    : tier === 2
    ? tier2Solutions[randomNum]
    : tier === 3
    ? tier1Solutions[randomNum]
    : tier3Solutions[randomNum];
};

const runApp = function (tier) {
  let currSugg = getSuggestion(tier);
  tick++;

  const html = `
  
  
  <div class="suggestion">
  <div class="sugg-container">
  <p class="suggestion-num">${tick}.</p>
  <p class="suggestion-text">
    ${currSugg}
  </p>
  </div>
  <button class="btn-refresh">New Suggestion</button>
</div>`;

  containerInner.insertAdjacentHTML(`afterbegin`, html);
  currSuggestion = currSugg;
};

// btnDiffUp.addEventListener(`click`, function (e) {
//   e.preventDefault();
// });

container.addEventListener(`click`, function (e) {
  e.preventDefault();

  if (e.target.classList.contains(`difficulty-up`) && currTier > 1) {
    tick = 0;
    containerInner.innerHTML = ``;

    currTier--;
    generateSuggs();
    document.querySelector(
      `.solution-strength-text`
    ).textContent = `Solution Strength: ${currTier}`;
  }
  if (e.target.classList.contains(`difficulty-down`) && currTier < 3) {
    tick = 0;
    containerInner.innerHTML = ``;

    currTier++;
    generateSuggs();
    document.querySelector(
      `.solution-strength-text`
    ).textContent = `Solution Strength: ${currTier}`;
  }
});

containerInner.addEventListener(`click`, function (e) {
  e.preventDefault();

  if (e.target.classList.contains(`btn-refresh`)) {
    tick = Number(
      e.target.parentNode.querySelector(`.suggestion-num`).textContent
    );

    // e.target.parentNode.remove();
    // runApp(currTier);
    // console.log(e);
    const htmlInner = ` 
    <div class="sugg-container">
    <p class="suggestion-num">${tick}.</p>
    <p class="suggestion-text">
      ${getSuggestion(currTier)}
    </p>
    </div>
    <button class="btn-refresh">New Suggestion</button>`;

    e.target.parentNode.innerHTML = htmlInner;
    document.querySelector(
      `.solution-strength-text`
    ).textContent = `Solution Strength: ${currTier}`;
  }
});
