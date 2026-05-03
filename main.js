class Statistics {
  constructor(datas) {
    this.datas = datas;
    this.mean = 0;
    this.median = 0;
    this.mode = 0;
  }

  findMean() {
    let sum = 0;
    for (let el of datas) {
      sum += el;
    }

    this.mean = sum / this.datas.length;
    console.log("mean", this.mean);
    return this.mean;
  }

  findMedian() {
    // (n + 1) / 2
    this.median = (this.datas.length + 1) / 2;
    console.log("median", this.median);
    return this.median;
  }

  findMode() {
    let maxVal;

    let occurence = this.datas.reduce((acc, el) => {
      if (acc.hasOwnProperty(el)) acc[el]++;
      else acc[el] = 1;
      return acc;
    }, {});

    let maxCount = Object.values(occurence).reduce((prev, cur) =>
      Math.max(prev, cur),
    );

    if (maxCount === 1) {
      maxVal = this.datas.join(", ");
    } else {
      maxVal = Number(
        Object.keys(occurence).find((key) => occurence[key] === maxCount),
      );
    }
    return maxVal;
  }
  /* Type is either sample or population */
  stdOrVarianceFilter(type, typeOfOperation) {
    let std;
    let variance;
    let sum = 0;

    for (let el of this.datas) {
      sum += Math.pow(el - this.mean, 2);
    }

    if (type === "sample") {
      std = Math.sqrt(sum / (this.datas.length - 1));
    } else if (type === "population") {
      std = Math.sqrt(sum / this.datas.length);
    } else {
      console.error(
        "Undefined type ",
        type,
        " type must be either sample or population",
      );
    }
    if (typeOfOperation === "variance") {
      variance = Math.pow(std, 2);
      console.log("var", variance);
      return variance;
    } else {
      console.log("std", std);
      return std;
    }
  }

  variance(type) {
    this.stdOrVarianceFilter(type, "variance");
  }

  stdDeviation(type) {
    this.stdOrVarianceFilter(type, "standard deviation");
  }

  shapeOfDistribution() {
    if ((this.mean === this.median) === this.mode) {
      console.log("Symmetric Distribution");
    } else if (this.median < this.mean) {
      console.log("Right Skewed Distribution");
    } else {
      console.log("Left Skewed Distribution");
    }
  }
}

let datas = [2, 3, 3, 4];
const stat = new Statistics(datas);

stat.findMean();
stat.findMedian();
stat.findMode();
stat.variance("population");
stat.shapeOfDistribution();
