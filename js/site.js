//when the user clicks the button
function buildPaymentSchedule() {
    //get some values
    let paymentArray = [];
    paymentArray = getPayments();
    displayData(paymentArray);

}



//build you array of payments
function getPayments() {

    var loanAmount = parseInt(document.getElementById("loanAmount").value);
    var paymentTerm = parseInt(document.getElementById("paymentTerm").value);
    var rate = document.getElementById("rate").value;

    var totalMonthlyPayments = (loanAmount) * (rate / 1200) / (1 - ((1 + rate / 1200) ** (0 - paymentTerm)));
    var remainingBalance = loanAmount;
    var totalInterest = 0;

    let paymentArray = [];



    //Build your amorization schedule
    for (let index = 0; index <= paymentTerm; index++) {

        let obj = {};

        let interestPayment = remainingBalance * rate / 1200;
        let principalPayment = totalMonthlyPayments - interestPayment;
        remainingBalance = remainingBalance - principalPayment;
        totalInterest += interestPayment

        obj["index"] = index;
        obj["totalMonthlyPayments"] = totalMonthlyPayments;
        obj["principalPayment"] = principalPayment;
        obj["interestPayment"] = interestPayment;
        obj["totalInterest"] = totalInterest;
        obj["balance"] = remainingBalance;

        paymentArray.push(obj);

    }
    localStorage.setItem("paymentArray", JSON.stringify(paymentArray));

    //Access the values from the form by ID and add an object to the array.
    return paymentArray;

}

function displayData(paymentArray) {

    const template = document.getElementById("resultsData-template");
    const resultsBody = document.getElementById("resultsBody");
    //clear table first
    resultsBody.innerHTML = "";
    for (let i = 0; i < paymentArray.length - 1; i++) {
        const dataRow = template.content.cloneNode(true);

        dataRow.getElementById("monthOut").textContent = paymentArray[i].index;
        dataRow.getElementById("paymentOut").textContent = paymentArray[i].totalMonthlyPayments;
        dataRow.getElementById("principalOut").textContent = paymentArray[i].principalPayment;
        dataRow.getElementById("interestOut").textContent = paymentArray[i].interestPayment;
        dataRow.getElementById("totalInterestOut").textContent = (paymentArray[i].totalInterest);
        dataRow.getElementById("balanceOut").textContent = (paymentArray[i].balance);

        resultsBody.appendChild(dataRow);
    }
}