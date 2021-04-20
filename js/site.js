//when the user clicks the button
function buildPaymentSchedule() {
    //get some values

    let payments = getPayments();
    displayData(payments);

}



//build you array of payments
function getPayments() {
    let paymentArray = [];

    var loanAmount = parseInt(document.getElementById("loanAmount").value);
    var paymentTerm = parseInt(document.getElementById("paymentTerm").value);
    var rate = document.getElementById("rate").value;

    var totalMonthlyPayments = (loanAmount) * (rate / 1200) / (1 - ((1 + rate / 1200) ** (0 - paymentTerm)));
    var remainingBalance = loanAmount;
    var totalInterest = 0;




    //Build your amorization schedule
    for (let index = 0; index <= paymentTerm; index++) {

        let obj = {};

        let interestPayment = remainingBalance * rate / 1200;
        let principalPayment = totalMonthlyPayments - interestPayment;
        remainingBalance = remainingBalance - principalPayment;
        totalInterest += interestPayment
        var month = index + 1;


        obj["month"] = month;
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

        dataRow.getElementById("monthOut").textContent = paymentArray[i].month;
        dataRow.getElementById("paymentOut").textContent = paymentArray[i].totalMonthlyPayments.toFixed(2);
        dataRow.getElementById("principalOut").textContent = paymentArray[i].principalPayment.toFixed(2);
        dataRow.getElementById("interestOut").textContent = paymentArray[i].interestPayment.toFixed(2);
        dataRow.getElementById("totalInterestOut").textContent = (paymentArray[i].totalInterest).toFixed(2);
        dataRow.getElementById("balanceOut").textContent = Math.abs((paymentArray[i].balance).toFixed(2));

        resultsBody.appendChild(dataRow);
    }

    document.getElementById("monthlyPayments").innerText = paymentArray[0].totalMonthlyPayments.toFixed(2);
    let principal = document.getElementById("loanAmount").value;
    document.getElementById("totalPrincipal").innerText = principal
    let ttlInterest = paymentArray[paymentArray.length - 1].totalInterest;
    document.getElementById("totalInterest").innerText = ttlInterest.toFixed(2);
    document.getElementById("totalCost").innerText = (parseFloat(ttlInterest) + parseInt(principal)).toFixed(2);


}

$(document).ready(function () {
    $('#myTable').DataTable();
});