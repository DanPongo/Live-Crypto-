# Live Crypto

Crypto Explorer is an intuitive platform designed to facilitate the exploration and analysis of a plethora of cryptocurrencies. With this app, users can easily search for specific coins, access comprehensive information, and seamlessly keep track of their preferred cryptocurrencies in one centralized location.

![crypto](https://github.com/DanPongo/Live-Crypto-/assets/106473315/c8a6bc76-36e7-4632-ac13-e2c5ea9f18af)

## Demo
Access the live demo here: [Live Crypto Demo](https://danpongo.github.io/Live-Crypto-/)

## Features
- Efficient search functionality for locating specific cryptocurrencies and accessing detailed information.
- Favourites list for streamlined tracking of preferred cryptocurrencies.
- Real-time market data for each listed cryptocurrency.
- Capability to generate and access reports for selected cryptocurrencies.

## Getting Started

### Prerequisites
Ensure you have the following prerequisites installed prior to proceeding:
- An up-to-date web browser.
- A text editor or Integrated Development Environment (IDE) of your preference.

### Installation

1. Clone the repository to your local machine.
```
git clone https://github.com/DanPongo/Live-Crypto-.git
```

2. Open the `index.html` file in your web browser to launch the app.

## Usage
- Leverage the search bar to locate specific cryptocurrencies.
- Click on "More Info" to access detailed information about a particular cryptocurrency.
- Utilize the "Select" toggle button to add cryptocurrencies to your favourites list.
- Generate and view reports for selected cryptocurrencies under the "Reports" section.

## Code Examples

### Fetch Data from API
```javascript
async function getJson(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}
```

### Search for a Specific Cryptocurrency
![crypto2](https://github.com/DanPongo/Live-Crypto-/assets/106473315/e2869337-2209-4a4b-b393-47b56dbe1e5a)

```javascript
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
```

### View Detailed Information
```javascript
$("#coinsContainer").on("click", ".more-info", async function () {
    const coinId = $(this).attr("id").substring(7);
    await handleMoreInfo(coinId);
});
```

## Built With
- HTML
- CSS
- JavaScript
- [CoinGecko API](https://www.coingecko.com/en/api)
- [CanvasJS](https://canvasjs.com/)

## Contributing
Contributions are highly appreciated! Please refer to [CONTRIBUTING.md](link_to_contributing_file) for contribution guidelines.

## License
This project is licensed under the MIT License. For more details, see the [LICENSE.md](LICENSE.md) file.

## Acknowledgments
- A special thanks to CoinGecko API for providing the invaluable cryptocurrency data used in this app.
- A shoutout to everyone who contributed to the project's success!
