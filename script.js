function setResult(text,isError) {
  resultDiv = document.getElementById("result");
  if (isError == true){
    resultDiv.innerHTML = "<b>Error:</b> " + text
  } else {
    resultDiv.innerHTML = "<b>Result:</b> " + text + " days";
  }
}

function getTimeToStake(confIntervalPercent,balance,difficulty) {
  
  if (confIntervalPercent >= 100){
    setResult("Invalid confidence interval. Must be lower than 100%",isError=true);
    return
  }
  if (confIntervalPercent <= 0){
    setResult("Invalid confidence interval. Must be greater than 0%",isError=true);
    return
  }

  confIntervalDec = confIntervalPercent/100

  estimatedTime = -1 * Math.log(1 - confIntervalDec) * (10000/balance) * difficulty;
  if (isNaN(estimatedTime) == true){
      setResult("Make sure to set all numbers to something valid",isError=true);
      return
  }
  estimatedTime = estimatedTime.toFixed(2); //round so we don't see full float
  setResult(estimatedTime,isError=false)
}

function runOnEnter(){
  if (event.keyCode === 13) {
    var balance      = document.getElementById('balance').value
    var confInterval = document.getElementById('conf-interval').value
    var difficulty   = document.getElementById('difficulty').value

    balance          = parseFloat(balance)
    confInterval     = parseFloat(confInterval)
    difficulty       = parseFloat(difficulty)

    getTimeToStake(confInterval,balance,difficulty)
  }
}