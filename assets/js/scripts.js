/******************** Classes ********************/
/** Class for handling routing */
class Router {
	constructor() {
		this.pageOut = document.getElementById("page-out");

		if (typeof this.pageOut === "undefined") {
			console.error(
				"Something has gone terribly wrong and we can't find the #page-out element!"
			);
			return;
		}

		//Listener for manual page navigation
		window.addEventListener(
			"popstate",
			event => {
				this.onNavigate();
			},
			false
		);

		this.onNavigate();
	}

	/** Used to navigate to a new page */
	navigate(pgName) {
		history.pushState(null, "", `?p=${pgName}`);
		//Signal that we're done
		this.onNavigate();
	}

	/** To be called after navigation  */
	onNavigate() {
		const route = this.getRouteFromUrl();
		this.loadPage(route);
	}

	/** Grabs the route from the query string (?p=route) */
	getRouteFromUrl() {
		const queryString = new URLSearchParams(window.location.search);
		let route = queryString.get("p");
		if (!route) {
			route = "home";
		}
		return route;
	}

	/** Loads page by name. */
	async loadPage(pgName) {
		const fetchRes = await fetch(`pages/${pgName}.html`);
		if (!fetchRes.ok) {
			console.error(
				"HodhScript.loadPage failed for",
				`"${pgName}",`,
				"expected a string to a valid page."
			);
			this.pageOut.classList.add("not-found");
			return;
		}
		this.pageOut.classList.remove("not-found");
		this.pageOut.innerHTML = await fetchRes.text();
	}
}

/******************** Functions ********************/
/** Awaitable (promise-ified) 'setTimeout(milliseconds)' */
function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

/******************** Initialize stuff ********************/
const router = new Router();
