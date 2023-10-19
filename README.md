# Live Crypto 

Crypto Explorer is a user-friendly app for exploring and analyzing various cryptocurrencies. With Crypto Explorer, you can search for specific coins, view detailed information, and keep track of your favorite cryptocurrencies all in one place.

![crypto](https://github.com/DanPongo/Live-Crypto-/assets/106473315/c8a6bc76-36e7-4632-ac13-e2c5ea9f18af)

## Features

- Search for specific cryptocurrencies and view detailed information.
- Add cryptocurrencies to your favorites list for easy access.
- View live market data for each cryptocurrency.
- Generate reports for selected cryptocurrencies.

## Getting Started

### Prerequisites

Before you start, make sure you have the following installed:

- A modern web browser
- A text editor or IDE of your choice

### Installing

1. Clone the repository to your local machine.


2. Open the `index.html` file in your web browser.

## Usage

- Use the search bar to find specific cryptocurrencies.
- Click on the "More Info" button to view detailed information about a cryptocurrency.
- Add cryptocurrencies to your favorites list by clicking the "Select" toggle button.
- View reports for selected cryptocurrencies in the "Reports" section.

## Code Examples

### Fetch Data from API

javascript
async function getJson(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}


### Search for a Specific Cryptocurrency
![crypto2](https://github.com/DanPongo/Live-Crypto-/assets/106473315/e2869337-2209-4a4b-b393-47b56dbe1e5a)

javascript
$("#searchButton").click(async () => {
    const searchTerm = $("#searchInput").val();
    const coins = await getJson("coins.json");
    const searchedCoins = coins.filter(c => c.symbol.toLowerCase() === searchTerm.toLowerCase() || c.name.toLowerCase() === searchTerm.toLowerCase());

    if (searchedCoins.length > 0) {
        // Display only the searched coins
        displayCoins(searchedCoins);
    } else {
        alert("No coin found with that name.");
    }
});


### View Detailed Information

javascript
$("#coinsContainer").on("click", ".more-info", async function () {
    const coinId = $(this).attr("id").substring(7);
    await handleMoreInfo(coinId);
});


## Built With

- HTML
- CSS
- JavaScript
- [CoinGecko API](https://www.coingecko.com/en/api)
- [CanvasJS](https://canvasjs.com/)

## Contributing

Im welcome contributions to make this project even better! Please read [CONTRIBUTING.md](link_to_contributing_file) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to CoinGecko API for providing the cryptocurrency data used in this app.
- Hat tip to everyone who contributed to this project!

