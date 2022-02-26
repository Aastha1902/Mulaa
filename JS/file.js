const droplist = document.querySelectorAll(".list select")
fromcurrency = document.querySelector(".from select")
tocurrency = document.querySelector(".to select")
getButton = document.querySelector("form button")

for (let i = 0; i < droplist.length; i++) {
    for (currency_code in country_code) {
        let selected;
        if (i == 0) {
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if (i == 1) {
            selected = currency_code == "INR" ? "selected" : "";
        }

        let optionTag = `<option value= "${currency_code}" ${selected} > ${currency_code} </option>`;
        droplist[i].insertAdjacentHTML("beforeend", optionTag);
    }
    droplist[i].addEventListener("change", e=>{
        loadFlag(e.target);
    })
}
function loadFlag(element){
    for(code in country_code){
        if(code== element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src =`https://flagcdn.com/16x12/${country_code[code].toLowerCase()}.png`
        }
    }
}

window.addEventListener("load",()=>{
    getExchangeRate();
})

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".list .icon");
exchangeIcon.addEventListener("click", ()=> {
    let tempCode = fromcurrency.value;
    fromcurrency.value = tocurrency.value;
    tocurrency.value = tempCode;
    loadFlag(fromcurrency);
    loadFlag(tocurrency);
    getExchangeRate();
})

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Your exchange rate will appeare here...";
    let url = ` https://v6.exchangerate-api.com/v6/420114b7d4aff4c8714a0bae/latest/${fromcurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangerate = result.conversion_rates[tocurrency.value];
        let totalexchangevalue = (amountVal * exchangerate).toFixed(3);
        const exchangeRateTxt = document.querySelector(".exchange-rate");
        exchangeRateTxt.innerText = `${amountVal} ${fromcurrency.value} = ${totalexchangevalue} ${tocurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText ="Sorry!!! There must be an error :("
    });
}

