// ==========================================================
// FOUND IT! Shared JavaScript
//
// This file is loaded in the <head> WITHOUT "defer".
// That's on purpose: the pages call these functions WHILE
// they are loading, using document.write. The functions must
// already exist when the browser reaches those calls.
//
// Concepts used (Lessons 8 and 9):
//   let, functions with parameters, arithmetic and precedence,
//   parseInt, the ternary operator, if...else, switch,
//   for loops, document.write, onerror.
// ==========================================================


// ---------- 1. Safety net (onerror, Lesson 8) ----------
// If any script on the page breaks, show a friendly message
// instead of failing silently. The function is written below
// this line, but it still works because JavaScript reads all
// function declarations before running the code (hoisting).
onerror = errorHandler;

function errorHandler(message, url, line) {
  let out = "Sorry, part of this page didn't load properly.\n\n";
  out += "Please refresh the page. If it keeps happening, tell the developer:\n";
  out += "Error: " + message + "\n";
  out += "Line: " + line;
  alert(out);
  return true; // we handled it, so the browser doesn't need to
}


// ---------- 2. Home page stats ----------
// Writes four stat tiles from three numbers.
//   lost      = items reported lost this semester
//   found     = items reported found this semester
//   returned  = items that got back to their owners
function writeStats(lost, found, returned) {
  let total = lost + found;
  let waiting = total - returned;

  // / and * have the same precedence, so they work left to right:
  // first returned / total, then times 100. parseInt cuts off the
  // decimals (it doesn't round).
  let rate = parseInt((returned / total) * 100);

  document.write("<div class='stats'>");

  document.write("<div class='stat'>");
  document.write("<p class='stat-number'>" + total + "</p>");
  document.write("<p class='stat-label'>items reported</p>");
  document.write("</div>");

  document.write("<div class='stat'>");
  document.write("<p class='stat-number'>" + returned + "</p>");
  document.write("<p class='stat-label'>back with their owners</p>");
  document.write("</div>");

  document.write("<div class='stat'>");
  document.write("<p class='stat-number'>" + waiting + "</p>");
  // The ternary picks the right word: "item" for 1, "items" for more
  document.write("<p class='stat-label'>" + (waiting == 1 ? "item" : "items") + " still waiting</p>");
  document.write("</div>");

  document.write("<div class='stat'>");
  document.write("<p class='stat-number'>" + rate + "%</p>");
  document.write("<p class='stat-label'>recovery rate</p>");
  document.write("</div>");

  document.write("</div>");

  // A message that depends on how well the board is doing
  let message;
  if (rate >= 50) {
    message = "More than half of everything reported goes home. Keep it up!";
  } else if (rate >= 25) {
    message = "About one in four items finds its owner. Every report helps.";
  } else {
    message = "Most items are still waiting. Check the board if you've lost something.";
  }
  document.write("<p class='stat-message'>" + message + "</p>");
}


// ---------- 3. Status banner on item pages (switch) ----------
// status is one of: "lost", "found", "returned"
function writeStatus(status) {
  let text;
  let style;

  switch (status) {
    case "lost":
      text = "Still missing. If you've seen it, use the form on this page.";
      style = "status-lost";
      break;
    case "found":
      text = "Found and waiting for its owner. Is it yours? Claim it below.";
      style = "status-found";
      break;
    case "returned":
      text = "Back with its owner. Thank you, finder!";
      style = "status-returned";
      break;
    default:
      text = "We don't know this item's status yet.";
      style = "status-unknown";
      break;
  }

  document.write("<p class='status " + style + "'>" + text + "</p>");
}


// ---------- 4. Recovery progress bar (for loop) ----------
// Shows the 3 steps of getting an item back.
// currentStep = the step the user is on (1, 2 or 3).
// Use 4 to show every step as done.
function writeProgress(currentStep) {
  document.write("<ol class='progress'>");

  for (let step = 1; step <= 3; step++) {
    // Pick the name of this step
    let name;
    switch (step) {
      case 1:
        name = "Make contact";
        break;
      case 2:
        name = "Meet at the security desk";
        break;
      case 3:
        name = "Confirm the hand-over";
        break;
    }

    // Pick how this step looks: done, current, or not yet
    let look;
    if (step < currentStep) {
      look = "done";
    } else if (step == currentStep) {
      look = "current";
    } else {
      look = "upcoming";
    }

    // The ternary adds a tick to finished steps
    let tick = look == "done" ? "✓ " : "";

    document.write("<li class='" + look + "'>" + tick + "Step " + step + ": " + name + "</li>");
  }

  document.write("</ol>");
}
