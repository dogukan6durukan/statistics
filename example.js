import { Statistics } from "./main.js";

let datas = [5, 10, 12, 25, 30];

const stat = new Statistics(datas);

let mean = stat.findMean(); // 16.4
console.log(mean);

let std = stat.stdDeviation("sample"); // 10.5971
console.log(std);

let coeff = stat.coeffOfVariation(); 
console.log(coeff); // 64.6168

stat.shapeOfDistribution(); // Right skewed

