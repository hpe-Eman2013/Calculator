var op = null;
var isEqual = false;
var num1 = null;
var num2 = null;
function addToTextBox(textBoxId, buttonId){
    
    var existingValue = document.getElementById(textBoxId).innerHTML;
    var buttonValue = document.getElementById(buttonId).innerHTML;
    
    existingValue = existingValue.concat(buttonValue);
    document.getElementById(textBoxId).innerHTML = existingValue;
}
function storeOperator(textBoxId, buttonId){
    if(document.getElementById(textBoxId).innerHTML !== "" ){
        op = document.getElementById(buttonId).id;
        addToTextBox(textBoxId, buttonId);
        setNumValue(textBoxId);
    }
}
function setNumValue(textBoxId){
    if(document.getElementById(textBoxId).innerHTML !== ""){
        var value = document.getElementById(textBoxId).innerHTML;
        if(opSet())
        {   
            if(num2===null){
                var temp = value.substr(num1.toString().length + 1);
                num2 = temp;
            }
            else if(num2.toString().length === 0){
                var temp = value.substr(num1.toString().length + 1);
                num2 = temp;
            }
        }
        else{
            if(num1!==null){
                if(num1.toString().length < value.length && op !== null)
                {
                    num2 = value.substr(num1.toString().length + 1);
                }
            }
            else{
                var reg = /[^0-9.]/g;
                var temp =  value.replace(reg, "");
                num1 = temp;
            }
        }
    }
}
function opSet(){
    var isSet = false;
    if(isEqual){
        isSet = true;
    }
    return isSet;
}
function plusMinus(textBoxId){
    if(num1===null || num1.toString.length === 0)
        setNumValue(textBoxId);
    var value = document.getElementById(textBoxId).innerHTML;
    if(num1.toString().length < value.length){
        num2 = value.substr(num1.toString().length + 1);  //num2
        num2 = modifySymbol(num2);
        value = value.substr(0, value.length - num2.toString().length);
        document.getElementById(textBoxId).innerHTML = value + "" + num2;
    }
    else{
        num1 = modifySymbol(value);
        document.getElementById(textBoxId).innerHTML = num1;
    }
}
function modifySymbol(value){
    if(value.indexOf("-") === 0)
        return Math.abs(value);
    else
        return "-" + value;
}
function calculatePower(textBoxId){
    setNumValue(textBoxId);
    if(num1!==null && op===null){
        num1 = Math.pow(num1, 2);
        document.getElementById(textBoxId).innerHTML = num1;
    }
    else{
    var text = document.getElementById(textBoxId).innerHTML;
    text = text.substr(0, text.length - num2.toString().length);
    num2 = Math.pow(num2, 2);
    document.getElementById(textBoxId).innerHTML = text + "" + num2;
    }
}
function convertOneOver(textBoxId){
    setNumValue(textBoxId);
    if(num1 > 0){
        var value = 1/num1;
        num1 = value.toFixed(5);
        document.getElementById(textBoxId).innerHTML = num1;
    }  
    if(num2 > 0){
        var value = 1/num2;
        num2 = value.toFixed(5);
        var text = document.getElementById(textBoxId).innerHTML;
        document.getElementById(textBoxId).innerHTML = text + Number(num1);
    }  
}
function squareRoot(textBoxId){
    
    if(num1===null && num2===null){
        if(document.getElementById(textBoxId).innerHTML === "")
            clearTextBox(textBoxId, true);
    }
    setNumValue(textBoxId);
    if(num1!==null && num2===null){
        num1 = (Math.sqrt(num1).toFixed(5));
        document.getElementById(textBoxId).innerHTML = num1;
    }
    else {
        setNumValue(textBoxId);
        num2 = (Math.sqrt(num2).toFixed(5));
        var value = document.getElementById(textBoxId).innerHTML.substr(0, num1.toString().length + 1);
        document.getElementById(textBoxId).innerHTML = value + "" + num2;
    }
}
function convertPercent(textBoxId){
    setNumValue(textBoxId);
        var value = document.getElementById(textBoxId).innerHTML;
        var text = value.substr(0, value.length - 1);
        switch(op){
            case "10": num2 = (num2 * .01 * num1).toFixed(5);
                document.getElementById(textBoxId).innerHTML = num2;
                break;
            case "11": num2 = (num2 * .01 * num1).toFixed(5);
                document.getElementById(textBoxId).innerHTML = num2;
                break;
            case "12": num2 = (num2 * .01 * num1).toFixed(5);
                document.getElementById(textBoxId).innerHTML = num2;
                break;
            case "13": num2 = (num2 * .01 * num1).toFixed(5);
                document.getElementById(textBoxId).innerHTML = num2;
                break;
            default: num2 = 0;
                document.getElementById(textBoxId).innerHTML = "0";
        }
    document.getElementById(textBoxId).innerHTML =  text + num2;
}
function clearTextBox(textBoxId, clearBox){
    if(clearBox===true){
        document.getElementById(textBoxId).innerHTML = "";
    }
    num1 = null;
    num2 = null;
    op = null;
    isEqual = false;
}
function backspace(textBoxId){
    var boxValue = document.getElementById(textBoxId).innerHTML;
    if(boxValue.length > 0)
    {
        var newValue = boxValue.substr(0, boxValue.length - 1);
        document.getElementById(textBoxId).innerHTML = newValue;
    }
}
function calculateValue(textBoxId){
    isEqual = true;
    setNumValue(textBoxId);
    switch(op){
        case "10":
            document.getElementById(textBoxId).innerHTML = Number(num1) + Number(num2);
            break;
        case "11":
            document.getElementById(textBoxId).innerHTML = Number(num1) - Number(num2);
            break;
        case "12":
            document.getElementById(textBoxId).innerHTML = Number(num1) * Number(num2);
            break;
        case "13":
            try
            {
                if (num2 === 0){
                    throw "zero divide &#8734;";
                }
                document.getElementById(textBoxId).innerHTML = (Number(num1) / Number(num2)).toFixed(5);
            }
            catch (ex)
            {
                document.getElementById(textBoxId).innerHTML = ex;
            }
            break;
        default:
            document.getElementById(textBoxId).innerHTML = "Invalid Value!";
    }
    clearTextBox(textBoxId, false);
}