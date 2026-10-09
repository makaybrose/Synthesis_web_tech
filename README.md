# FOUND IT! 🔑

**The lost-and-found board for Ashesi University.**

Students lose keys, ID cards, chargers and wallets every week, and the people who find them often don't know who to give them to. FOUND IT! is a campus noticeboard on the web: report what you lost or found, browse the board, and follow a guided process to get things back to their owners.



> A Web Technologies synthesis project by Vannessa Brose. Built only with HTML, CSS and basic JavaScript, without frameworks or libraries. Not an official Ashesi University service.

---

## Features

- **The board.** Every reported item, pinned to a cork board as an index card with a LOST, FOUND or RETURNED stamp.
- **Two filters that work together.** *Category* shows only keys, ID cards, electronics, or bags and wallets. *Highlight a place* fades out items from other parts of campus. Both are built with CSS only.
- **Report an item.** A form that checks every answer before it lets you post: required fields, lengths, a valid Ashesi email, a 10-digit phone number and a date within the semester.
- **Item pages.** Full details for each item, a colour-coded status banner and the right form for the situation: *"Is this yours? Prove it"* for found items, *"Have you found it?"* for lost ones.
- **Guided recovery in 3 steps.** Make contact → meet at the security desk → both people confirm the hand-over → the item is marked **Returned**. A progress bar shows where you are.
- **Campus stats.** Items reported, items returned and the recovery rate, calculated with JavaScript.
- **Recent recoveries.** A table of items that made it home, with the average number of days it took.
- **Thank-you email.** One click opens your email app with a thank-you message to the finder already written.
- **Works on phones.** One column on phones, two on tablets and three on large screens.

---

## Built with

| Technology | Used for |
|---|---|
| **HTML** | Semantic page structure, tables, description lists, figures, and forms with built-in validation (`required`, `pattern`, `minlength`, `min`/`max`) |
| **CSS** | The noticeboard design, grid and flexbox layout, mobile-first media queries, and the filters (`:checked` with the `+` combinator) |
| **JavaScript** | Stats and averages, status banners (`switch`), the recovery progress bar (`for` loop), and an `onerror` safety net |

---

## Run it on your computer

1. Download or clone this repository.
2. Open the folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.

Opening `index.html` directly in a browser also works. An internet connection is needed for the fonts; without one, backup fonts are used.

---

## Project structure

```
found-it/
├── index.html            Home page
├── board.html            The board with filters
├── item-*.html           One page per item (6)
├── report.html           Report a lost or found item
├── report-sent.html      Report confirmation
├── match.html            Recovery step 2: meet and confirm
├── recovered.html        Recovery step 3: returned
├── css/style.css         All styles
├── js/script.js          Shared JavaScript functions
└── images/               Campus photo
```

---

## How the filters work without JavaScript

The radio buttons sit *before* the board in the HTML, and each card has classes for its category and place (for example `class="card keys library"`). CSS finds the chosen radio with `:checked`, steps along to the board with the `+` combinator, then hides the cards that don't match:

```css
#cat-keys:checked + label + input + label + input + label + input + label + .loc-area .card {
  display: none;
}
#cat-keys:checked + label + input + label + input + label + input + label + .loc-area .keys {
  display: block;
}
```

The category filter changes `display` and the place filter changes `opacity`. Because they change different properties, both can be used at once.

---

## What's real and what's simulated

| Really works | Simulated |
|---|---|
| Filtering the board | The items on the board are sample data |
| All form checks and validation | Reports aren't saved: there's no database |
| Every calculation in the stats and table | Claims and messages aren't actually sent |
| Moving through the recovery steps | Marking an item as returned doesn't update the board |

---

## Future improvements

- **Save reports** with PHP and MySQL, so new items appear on the board for everyone.
- **Search as you type,** using JavaScript to read the search box and update the board.
- **Notifications** by email or SMS when someone matches your item.
- **Log in with an Ashesi email,** so only students and staff can post.
- **Photo uploads** stored on the server.

---

## Credits

- Campus photo: *add the source here (for example: Ashesi University, ashesi.org)*.
- Fonts: Archivo Black, Kalam, Work Sans and Courier Prime from Google Fonts.
- Ashesi University's name and images belong to Ashesi University. This is a student project, not an official university service.
