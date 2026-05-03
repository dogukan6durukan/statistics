class Statistics {
  constructor(datas) {
    this.datas = datas;
    this.mean = 0;
    this.median = 0;
    this.mode = 0;
    this.std = 0;
  }

  findMean() {
    let sum = this.datas.reduce((acc, el) => acc + el, 0);
    this.mean = sum / this.datas.length;
    console.log("Mean:", this.mean);
    return this.mean;
  }

  findMedian() {
    let arr = this.datas.sort((a, b) => a - b);
    let half = Math.floor(arr.length / 2);

    if (arr.length % 2 === 0) {
      this.median = (arr[half - 1] + arr[half]) / 2;
    } else {
      this.median = arr[half];
    }
    console.log("median", this.median);
    return this.median;
  }

  findMode() {
    let occurence = this.datas.reduce((acc, el) => {
      if (acc.hasOwnProperty(el)) acc[el]++;
      else acc[el] = 1;
      return acc;
    }, {});

    let maxCount = Math.max(...Object.values(occurence));

    if (maxCount === 1) {
      this.mode = this.datas.join(", ");
    } else {
      this.mode = Number(
        Object.keys(occurence).find((key) => occurence[key] === maxCount),
      );
    }
    console.log("mode", this.mode);
    return this.mode;
  }

  variance(type) {
    let sum = this.datas.reduce(
      (acc, cur) => acc + Math.pow(cur - this.mean, 2),
      0,
    );
    let divisor = type === "sample" ? this.datas.length - 1 : this.datas.length;
    return sum / divisor;
  }

  stdDeviation(type) {
    let variance = this.variance(type);
    let std = Math.sqrt(variance);
    this.std = std;
    console.log("std deviation", std);
    return this.std;
  }

  findRange() {
    const max = Math.max(...this.datas);
    const min = Math.min(...this.datas);
    return { max : max, min : min, range : max - min };
  }

  coeffOfVariation() {
    let coeff = (this.std / this.mean) * 100;
    console.log("Coefficent of variation is: ", coeff);
    return coeff;
  }

  shapeOfDistribution() {
    if (this.mean === this.mode && this.median === this.mode) {
      console.log("Symmetric Distribution");
    } else if (this.median < this.mean) {
      console.log("Right Skewed Distribution");
    } else {
      console.log("Left Skewed Distribution");
    }
  }
}

let datas = [5, 10, 25, 30, 12];
const stat = new Statistics(datas);

stat.findMean();
stat.findMedian();
stat.findMode();
stat.stdDeviation("sample");
stat.coeffOfVariation();
stat.shapeOfDistribution();
