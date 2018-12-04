/** Container class for main HodhSite script */
class HodhScript {
  constructor() {
    console.log("JS file loaded!");

    this.pageOut = document.getElementById("page-out");

    if (typeof this.pageOut === "undefined") {
      console.error(
        "Something has gone terribly wrong and we can't find the #page-out element!"
      );
      return;
    }

    this.loadPage("home");
  }

  /** Loads page by name. */
  async loadPage(pgName) {
    const fetchRes = await fetch(`pages/${pgName}.html`);
    if (!fetchRes.ok) {
      console.error(
        "HodhScript.loadPage failed for",
        pgName,
        "expected a string to a valid page."
      );
      return;
    }

    const text = await fetchRes.text();
    this.pageOut.innerHTML = text;
    console.log(fetchRes, text);
  }
}
//Create instance
const hodhScript = new HodhScript();

/** Awaitable (promise-ified) 'setTimeout(milliseconds)' */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
