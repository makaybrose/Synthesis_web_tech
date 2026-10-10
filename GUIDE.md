# FOUND IT! Project guide

The campus lost-and-found board. A Web Technologies synthesis project by Hecson.

Read this before you present. It explains how to run the project, where every course topic is used, how the tricky parts work, how to test it, and what to say in your demo.

---

## 1. How to run it

1. Unzip `found-it.zip` and open the `found-it` folder in VS Code.
2. Right-click `index.html` and choose **Open with Live Server**.
3. You need internet for the fonts. Without it, the site still works with backup fonts.

---

## 2. Folder structure

```
found-it/
├── index.html            Home: hero, stats, latest reports, how it works, recoveries table
├── board.html            The full board with the two filters
├── item-car-key.html     Item pages (6). Each has details + a recovery form
├── item-charger.html
├── item-student-id.html
├── item-wallet.html
├── item-backpack.html
├── item-phone.html
├── report.html           Report a lost or found item (the big form)
├── report-sent.html      "Your report passed every check"
├── match.html            Recovery step 2: meet at security, confirm hand-over
├── recovered.html        Recovery step 3: "Returned!"
├── css/style.css         All the styling (one file for every page)
└── js/script.js          Shared JavaScript functions
```

---

## 3. Feature map: what each part uses, and where it's from

| Feature | What the user does | What happens | Course concepts | Lesson |
|---|---|---|---|---|
| Page structure | Moves around the site | Same header, menu and footer everywhere | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, headings | 1–3, HTML lab |
| Category filter | Clicks Keys, ID cards, Electronics or Bags | Only matching cards stay on the board | Radio buttons, `label for`, `:checked`, chained `+`, `display: none / block` | 5, 6, 7 |
| Place highlight | Clicks a place | Cards from other places fade out | Same technique, but with `opacity` | 5, 6 |
| Report form | Fills in the form | Blocked until every field is right; boxes turn green when correct | `required`, `minlength`, `maxlength`, `pattern`, `type="email"`, `type="tel"`, `type="date"` with `min`/`max`, `type="file"` with `accept`, `select`, `textarea`, `fieldset`/`legend`, `:valid` | 5 |
| Claim form (found items) | Proves the item is theirs | Needs an 8-digit ID, a school email, 15+ characters of proof and a pickup place | `pattern="[0-9]{8}"`, `pattern=".+@.+\.edu\.gh"`, `minlength`, required `select` | 5 |
| Finder form (lost items) | Says where they found it | Needs a place, a 10-digit phone number and a hand-over choice | `type="tel"`, `pattern="0[0-9]{9}"`, required radio group in a nested `fieldset` | 5 |
| Guided recovery | Goes claim → meet → confirm | Progress bar moves through 3 steps; hand-over needs all 3 boxes ticked | Form `action` to the next page, required checkboxes, `writeProgress()` | 4, 5, 8 |
| Stats tiles | Opens the home page | 4 numbers calculated from 3 values, plus a message | `let`, `+ - * /`, precedence, `parseInt`, ternary, `if / else if / else`, `document.write` | 8, 9 |
| Average days | Reads the recoveries table | The average is calculated in the table footer | Brackets and precedence: `(2 + 1 + 6 + 3) / 4` | 9 |
| Status banner | Opens an item | Red, green or purple banner that matches the item | Function with a parameter, `switch` with `break` and `default` | 8 |
| Progress bar | Opens an item or recovery page | 3 steps marked done, current or upcoming | `for` loop, `switch`, `if / else if`, ternary | 8, 9 |
| Error safety net | (Only if something breaks) | Friendly pop-up instead of a silent failure | `onerror`, `alert`, `return true` | 8 |
| Recoveries table | Reads it | Clear table with headings that screen readers understand | `caption`, `thead`, `tbody`, `tfoot`, `th scope`, `colspan`, `border-collapse`, `nth-of-type` | 4 |
| Thank-you email | Clicks "Send the finder a thank-you" | Email app opens with subject and message filled in | `mailto:` with `subject` and `body`, `%20` and `%0A` | 4 |
| Item details | Reads an item card | Labels and values laid out clearly | `<dl>`, `<dt>`, `<dd>` | HTML lab |
| Layout | Uses a phone or a laptop | 1 column on phones, 2 on tablets, 3 on big screens | Mobile-first `@media (width >= 40em)`, grid with `fr`, flexbox, `flex: 1` | 6, 7 |
| Look and feel | (Visual) | Cork board, pinned index cards, rubber stamps | `transform: rotate()`, `border-radius`, negative margin for the pins, `box-sizing: border-box`, `inline-block` buttons | 6, 7 |
| Keyboard use | Presses Tab | Yellow outline shows where you are | `:focus` styles | 4 (tip), 6 |

### Small properties that aren't in the readings

Simple styling properties, no new concepts. Be ready to say what each one does:
- `text-transform: uppercase` makes text capitals.
- `letter-spacing` adds space between letters (used on stamps and filter titles).
- `outline` draws the yellow focus ring.
- `cursor: pointer` shows a hand over clickable things (the Links reading mentions the `cursor` property).

---

## 4. How the tricky parts work

### The filters (no JavaScript)

In `board.html` the order of elements is:

```
radio (All) · label · radio (Keys) · label · radio (ID cards) · label · radio (Electronics) · label · radio (Bags) · label
<div class="loc-area">
    radio (Everywhere) · label · radio (Library) · label · ... · radio (Hostels) · label
    <div class="board"> the cards </div>
</div>
```

Each card has classes for its category and place, for example `class="card keys library"`.

The CSS (sections 11 and 12) reads like this:

```css
#cat-keys:checked + label + input + label + input + label + input + label + .loc-area .card {
  display: none;
}
#cat-keys:checked + label + input + label + input + label + input + label + .loc-area .keys {
  display: block;
}
```

In words: *"When the Keys radio is checked, step over each element after it until you reach `.loc-area`, then hide every card inside it. Then show the cards with the class `keys` again."*

- Each `+` means "the very next sibling" (Lesson 6: next-sibling combinator).
- Both rules are equally specific, so **the one written last wins**. That's why "show" comes after "hide".
- The category filter changes `display` and the place filter changes `opacity`. Because they change **different properties**, both filters work at the same time.
- The radio buttons are kept visible on purpose. Hidden radio buttons can't be reached with the keyboard.
- **Warning:** if you add anything between the radios, the number of steps changes and the filter stops working.

### The forms (no JavaScript)

All checking is done by HTML attributes. When you press submit, the browser checks every rule. If one fails, it shows a message on the first wrong field and doesn't submit. If all pass, it goes to the `action` page.

- `pattern="[0-9]{8}"` means exactly 8 digits.
- `pattern="0[0-9]{9}"` means a 0 followed by 9 more digits.
- `pattern=".+@.+\.edu\.gh"` means something, then @, then something, then .edu.gh.
- A `select` with `required` and a first option of `value=""` counts as empty until the user picks something.
- `.field:valid` turns the border green as soon as a field passes. Optional fields are valid even when empty, so `.optional:valid` keeps them grey.

**Adjust before presenting:** if your university's student IDs aren't 8 digits or its emails don't end in `.edu.gh`, change the `pattern` and the hint text in `report.html` and the item pages.

### The JavaScript

- `script.js` is loaded in the `<head>` **without `defer`**. The pages call `writeStats()`, `writeStatus()` and `writeProgress()` while they load, so the functions must already exist. (With `defer`, the file would load last and the calls would fail.)
- `document.write` only works while the page is loading. That's why every call sits in a `<script>` exactly where its content should appear.
- `onerror = errorHandler` works even though the function is written below it, because JavaScript reads function declarations first (hoisting).

---

## 5. Test checklist

Tick each one before you present.

**Navigation**
- [ ] Every menu link works on every page.
- [ ] Clicking a card title opens its item page; "← Back to the board" returns.
- [ ] The three pinned notes on the home page open their items.

**Board filters**
- [ ] Keys shows 1 card, ID cards 1, Electronics 2, Bags & wallets 2, All 6.
- [ ] Main library keeps 2 cards bright, Cafeteria 2, Lecture halls 1, Hostels 1.
- [ ] Electronics + Cafeteria: 2 cards show, only the phone is bright.
- [ ] Tab to a filter and use the arrow keys: it still works.

**Report form**
- [ ] Empty form: submitting is blocked.
- [ ] A date in 2027: blocked.
- [ ] Phone "12345": blocked. Phone left empty: allowed.
- [ ] Email without `.edu.gh`: blocked.
- [ ] A full, correct form goes to "Your report passed every check".

**Recovery flow**
- [ ] Charger page: ID "123" is blocked; "10234567" is accepted.
- [ ] Wallet page: phone "02412345" is blocked; "0241234567" is accepted.
- [ ] Match page: 2 of 3 boxes is blocked; 3 of 3 goes to "Returned!".
- [ ] "Send the finder a thank-you" opens your email app with the message filled in.

**JavaScript output**
- [ ] Home stats show 25, 13, 12 and 52%, and the green "More than half" message.
- [ ] The table footer shows an average of 3.
- [ ] Lost items have a red banner, found items green, returned items purple.
- [ ] Returned items show all 3 progress steps ticked.

**Layout and quality**
- [ ] F12 → phone view: no sideways scrolling on any page.
- [ ] F12 → Console: no red errors (a font error is fine if you're offline).

The navigation, filter, form, JavaScript and phone-width checks were run automatically in a real browser before delivery (138 checks, 0 failures). Do the keyboard and email checks yourself, since they depend on your computer.

---

## 6. Demo script (about 5 minutes)

1. **The problem (30 s).** "Students lose keys, ID cards and chargers all the time, and people who find them don't know who to give them to. FOUND IT! is a lost-and-found board for campus."
2. **Home page (45 s).** Point out the cork-board design, the stats and the recoveries table. "These numbers are calculated by JavaScript. Brackets matter here: without them, only the last number would be divided." Show the code: `parseInt((2 + 1 + 6 + 3) / 4)`.
3. **The board (1 min).** Click Electronics, then Cafeteria. "This filtering uses no JavaScript. It's radio buttons, `:checked` and the `+` combinator." Show one selector and explain it.
4. **Report form (1 min).** Submit it empty, then with a bad phone number, then correctly. "All of this checking is HTML attributes: `required`, `pattern`, `min` and `max`."
5. **Guided recovery (1 min).** Open the charger, fill in the claim, go to the meeting page, tick 2 boxes (blocked), then 3 (returned). Point out the progress bar and the status banner: "a `for` loop and a `switch`."
6. **Honesty (30 s).** "There's no database, so reports aren't saved and nothing is actually sent. I say that clearly in the app. With PHP and MySQL, the next version would save reports for everyone."
7. **Phone view (15 s).** Show the layout changing at phone size.

---

## 7. Limitations and future improvements

| Limitation now | Why | With more advanced skills |
|---|---|---|
| New reports don't appear on the board | No database or server | PHP and MySQL to save and load reports |
| No typed search | Needs JavaScript that reads input and changes the page (DOM), not covered yet | A search box that filters cards as you type |
| Claims and messages aren't really sent | No server | Email or SMS notifications from the server |
| "Mark as returned" doesn't change the board | Nothing is saved | Update the item's status in the database |
| Filters depend on the exact order of the HTML | CSS `+` only steps to the next sibling | JavaScript filtering, or newer CSS selectors |
| Photos aren't uploaded | No server | Store images on the server |
| No logins | No accounts system | Secure login with school email |

---

## 8. Questions your lecturer might ask

**Why is `script.js` not using `defer`, when Lesson 2 recommends it?**
Because the pages call the functions *while they load*, using `document.write`. With `defer`, the functions wouldn't exist yet when the browser reaches those calls.

**How does the board filter without JavaScript?**
Each radio button is followed by its label and then the next radio. `:checked` finds the chosen one, and each `+` steps to the next sibling until the selector reaches the board. Then it hides or fades the cards that don't match.

**What happens if someone types an 8-digit phone number?**
`pattern="0[0-9]{9}"` needs exactly 10 digits starting with 0, so the field stays invalid and the browser blocks the form and shows a message.

**Why `<dl>` for the item details?**
They're pairs: a label (Category) and its value (Electronics). That's what a description list is for.

**Why does the average need brackets?**
Division has higher precedence than addition. Without brackets, `2 + 1 + 6 + 3 / 4` would only divide the 3 by 4.

**Is any data real?**
No. The items are sample data, and the app says so on every page.
