"use strict";
$(() => {

    handleHome();

    $("a.nav-link").click(function () {
        $("a.nav-link").removeClass("active");
        $(this).addClass("active");
        const sectionId = $(this).attr("data-section");
        $("section").hide();
        $("#" + sectionId).show();
    });

    $("#coinsContainer").on("click", ".more-info", async function () {
        const coinId = $(this).attr("id").substring(7);
        await handleMoreInfo(coinId);
    });

    $("#homeLink").click(async () => await handleHome());
    $("#reportsLink").click(() => { showSelectedCoins(); });
    $("#aboutLink").click(() => { });

    $("#searchButton").click(async () => {
        const searchTerm = $("#searchInput").val();
        const coins = await getJson("coins.json");
        const searchedCoins = coins.filter(c => c.symbol.toLowerCase() === searchTerm.toLowerCase() || c.name.toLowerCase() === searchTerm.toLowerCase());

        if (searchedCoins.length > 0) {
            // Clear the coins container
            $("#coinsContainer").html('');

            // Display only the searched coins
            displayCoins(searchedCoins);
        } else {
            // No coins found with the search term
            alert("No coin found with that name.");
        }
    });



    async function handleHome() {
        const coins = await getJson("coins.json");
        displayCoins(coins);

        const selectedCoins = []; // Array to store the selected coins

        $(".coin-toggle").change(function () {
            const coinId = $(this).attr("id").substring(7); // Get the coin ID
            if (this.checked) {
                if (selectedCoins.length >= 5) {
                    this.checked = false; // Uncheck the toggle button if the limit is reached
                    return;
                }
                selectedCoins.push(coinId); // Add the coin ID to the selected coins array
            } else {
                const index = selectedCoins.indexOf(coinId);
                if (index > -1) {
                    selectedCoins.splice(index, 1); // Remove the coin ID from the selected coins array
                }
            }
        });
    }


    function displayCoins(coins) {
        coins = coins.filter(c => c.symbol.length <= 3);
        let html = "";
        for (let i = 0; i < coins.length; i++) {
            html += `
            <div class="card" style="width: 18rem; height: 20rem; overflow: auto;">
              <div class="card-body">
                <h5 class="card-title">${coins[i].symbol}</h5>
                <p class="card-text">${coins[i].name}</p>
        
                <button id="button_${coins[i].id}" class="btn btn-primary more-info" data-bs-toggle="collapse" data-bs-target="#collapse_${coins[i].id}">
                  More Info
                </button>
        
                <div class="form-check form-switch">
                  <input class="form-check-input coin-toggle" type="checkbox" id="toggle_${coins[i].id}">
                  <label class="form-check-label" for="toggle_${coins[i].id}">Select</label>
                </div>
        
                <div style="min-height: 120px;">
                  <div class="collapse collapse-horizontal" id="collapse_${coins[i].id}">
                    <div class="card card-body">
                      Testing
                    </div>
                  </div>
                </div>
        
              </div>
            </div>
          `;
        }
        $("#coinsContainer").html(html);
    }



    async function handleMoreInfo(coinId) {
        const coin = await getJson("https://api.coingecko.com/api/v3/coins/" + coinId);
        const imageSource = coin.image.thumb;
        const usd = coin.market_data.current_price.usd;
        const eur = coin.market_data.current_price.eur;
        const ils = coin.market_data.current_price.ils;
        const moreInfo = `
            <img src="${imageSource}"> <br>
            USD: $${usd} <br>
            EUR: Є${eur} <br>
            ILS: ₪${ils}
        `;
        $(`#collapse_${coinId}`).children().html(moreInfo);
        await chartRender(coinId, "usd");
    }

    function showSelectedCoins() {
        // Show the selected coins in the reports section
        const html = selectedCoins.map(coinId => `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${coinId}</h5>
                    <p class="card-text">Report for ${coinId}</p>
                </div>
            </div>
        `).join("");

        $("#reportsSection").html(`
            <h2>Reports</h2>
            ${html}
        `);
    }

    const chartRender = async (coinId, currency) => {
        const dataPointsArr = [];
        // לבדוק מה הבעיה ביורל
        const coinForChart = await getJson(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
        const prices = coinForChart.prices;
        const chartData = prices.map((price) => ({
            x: new Date(price[0]),
            y: price[1],
        }));
        for (let i = 0; i < chartData.length; i++) {
            dataPointsArr.push({ x: chartData[i].x, y: chartData[i].y });
        }
        console.log(coinForChart);


        const chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Dynamic Data",
            },
            axisY: {
                includeZero: false,
            },
            data: [
                {
                    type: "line",
                    dataPoints: dataPointsArr,
                },
            ],
        });
        chart.render();
    };



    async function getJson(url) {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

});
