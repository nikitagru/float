// TODO
// 1. прверка на особые случаи:
// 1.1 Infinity e  = 11111... M = 000000...
// 1.2 0 e = 0000.. M = 0000...
// 1.3 NaN e = 11111... M = (не нулевая)
// 1.4 Денормализованное число 0,10101110... e = 00000.. M = (не нулевая)
// двоичную запись в HEX

// преобразовывать числа в нормализованный вид 


let userValue = "420D0000";

let type = "floatToDec";

function finAnswer(convertType, value) {
    if (convertType === "decToFloat") {
        return decToFloat(value);
    } else if (convertType === "floatToDec") {
        return floatToDec(value);
    } else {
        return null;
    }
}

let answer = finAnswer(type, userValue);

answer = answer.toString();
console.log(answer);


function converter(whole, fract, exponent) {

    whole = whole.slice(1);

    let answer = "";

    if (whole[0] < 0) {
        answer += 1;
    } else {
        answer += 0;
    }

    let exp = exponent.toString(2);
        answer += exp;

    if (fract != undefined) {
        answer += whole;
        answer += fract;
    } else {
        answer += whole;
    }
    let hexAns = parseInt(answer, 2).toString(16);
    return hexAns;
}



function decToFloat(value) {
    let number = Number(value);

    if (number === Infinity) {
        if (number < 0) {
            return "11111111100000000000000000000000";
        } else {
            return "01111111100000000000000000000000";
        }
    } else if (isNaN(number)) {
        return "01111111100000000000000000000001";
    } else if (number === 0){
        if (number < 0) {
            return "00000000000000000000000000000000";
        } else {
            return "10000000000000000000000000000000";
        }
    } else {
        let expCount = 0;
        let binaryNum = number.toString(2);

        let wholePart = binaryNum.split(".")[0];

        if (wholePart.length != binaryNum.length) {
            let temp = binaryNum.indexOf(".") + 1;
            let fractPart = binaryNum.slice(temp);
            
            if (wholePart.length == 1) {
                if (wholePart === "0") {
                    var index = fractPart.indexOf("1");
                    expCount = index + 1;


                    
                    if (fractPart > 23) {
                        if (fractPart[23] === "1" ) {
                        
                            if (fractPart[22] === "0") {
                            fractPart = fractPart.replace(/^(.{22})(.)/,'$11');
                            } else {
                            let i = 22;
                            while (fractPart[i] != "0") {
                                fractPart = fractPart.replace(/^(.{i})(.)/,'$10');
                                i--;
                            }
                            fractPart = fractPart = fractPart.replace(/^(.{i})(.)/,'$11');
                            } 

                        }
                        fractPart = fractPart.slice(index);
                        fractPart = fractPart.slice(0, 23);
                        
                    } else if (fractPart < 23) {
                        for (let j = 0; j < 23 - fractPart.length; j++){
                            fractPart += "0";
                        }
                    }
                    return converter(wholePart, fractPart, expCount + 127);
                } else {
                    let point = binaryNum.indexOf(".");
                    expCount = point + 1;
                    
                    if (fractPart.length + wholePart.length > 23) {
                        if (fractPart[23] === "1" ) {
                        
                            if (fractPart[22] === "0") {
                            fractPart = fractPart.replace(/^(.{22})(.)/,'$11');
                            } else {
                            let i = 22;
                            while (fractPart[i] != "0") {
                                fractPart = fractPart.replace(/^(.{i})(.)/,'$10');
                                i--;
                            }
                            fractPart = fractPart = fractPart.replace(/^(.{i})(.)/,'$11');
                            } 

                        }
                        fractPart = fractPart.slice(index);
                        fractPart = fractPart.slice(0, 23);
                        return converter(wholePart, fractPart, expCount + 127);
                    } else if (fractPart.length + wholePart.length < 23) {
                        for (let j = 0; j < 23 - fractPart.length; j++){
                            fractPart += "0";
                        }
                        return converter(wholePart, fractPart, expCount + 127);
                    }

                    return;
                }
            } else {
                let point = binaryNum.indexOf(".");
                    expCount = point - 1;
                    
                    if (fractPart.length + wholePart.length > 23) {
                        if (fractPart[23] === "1" ) {
                        
                            if (fractPart[22] === "0") {
                            fractPart = fractPart.replace(/^(.{22})(.)/,'$11');
                            } else {
                            let i = 22;
                            while (fractPart[i] != "0") {
                                fractPart = fractPart.replace(/^(.{i})(.)/,'$10');
                                i--;
                            }
                            fractPart = fractPart = fractPart.replace(/^(.{i})(.)/,'$11');
                            } 

                        }
                        fractPart = fractPart.slice(index);
                        fractPart = fractPart.slice(0, 23);
                        return converter(wholePart, fractPart, expCount + 127);
                    } else if (fractPart.length + wholePart.length < 23) {
                        let counter =  fractPart.length;
                        for (let j = 0; j < 24 - counter - wholePart.length; j++){
                            fractPart += "0";
                        }
                        return converter(wholePart, fractPart, expCount + 127);
                    }

                    return;
            }
        }
    }
}


function convertToDec(binaryValue) {
    let plus = binaryValue[0];
    let exponent = binaryValue.slice(1, 9);
    let maintiss = binaryValue.slice(9);

    let decExp = parseInt(exponent, 2).toString(10);
    decExp = Number(decExp);
    decExp -= 127;

    let indexOfOne = [];
    for (let i = 0; i < maintiss.length; i++) {
        if(maintiss[i] === "1") {
            indexOfOne.push(i + 1);
        }
    }

    let decMantiss = 0;

    for (let i = 0; i < indexOfOne.length; i++) {
        decMantiss += Math.pow(2, indexOfOne[i]);
    }

    if (plus === "1") {
        let answer = -1 * (1 + (decMantiss / Math.pow(2, 23))) * Math.pow(2, decExp);
        return answer;
    } else {
        let answer = 1 * (1 + (decMantiss / Math.pow(2, 23))) * Math.pow(2, decExp);
        return answer;
    }
    
    
}

function floatToDec(value) {
    let binNum = parseInt(value, 16).toString(2);

    if (binNum.length < 32) {
        let newBin = "0" + binNum;
        return convertToDec(newBin);
    } else {
        return convertToDec(binNum);
    }

     
}

