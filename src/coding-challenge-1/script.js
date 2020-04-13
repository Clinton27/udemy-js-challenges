// 1. Store values in variables
var markWeight = 85;
var markHeight = 1.6;
var johnWeight = 77;
var johnHeight = 1.3;

// 2. Calculate their BMIs
var markBMI = markWeight / (markHeight * markHeight);
console.log('Mark BMI: ' + markBMI);
var johnBMI = johnWeight / (johnHeight * johnHeight);
console.log('John BMI: ' + johnBMI);

// 3. Determine who's BMI is higher
var isMarkBmiHigher = markBMI > johnBMI;
console.log("Is Mark's BMI higher than John's? " + isMarkBmiHigher);

