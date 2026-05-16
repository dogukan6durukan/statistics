class Statistics {
  constructor(datas) {
    this.datas = datas;
    this.mean = 0;
    this.median = 0;
    this.mode = 0;
    this.std = 0;
  }

  init() {
    this.findMean();
    this.findMedian();
    this.findMode();
  }

  findMean() {
    let sum = this.datas.reduce((acc, el) => acc + el, 0);
    this.mean = sum / this.datas.length;
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
    return this.mode;
  }

  variance(type) {
    this.init();
    let sum = this.datas.reduce(
      (acc, cur) => acc + Math.pow(cur - this.mean, 2),
      0,
    );
    let divisor =
      type === "sample"
        ? this.datas.length - 1
        : type === "population"
          ? this.datas.length
          : console.error("Undefined type: ", '"' + type + '"');
    return sum / divisor;
  }

  stdDeviation(type) {
    let variance = this.variance(type);
    let std = Math.sqrt(variance);
    this.std = std;
    return this.std;
  }

  findRange() {
    const max = Math.max(...this.datas);
    const min = Math.min(...this.datas);
    return { max: max, min: min, range: max - min };
  }

  coeffOfVariation() {
    this.init();
    this.stdDeviation("sample");
    let coeff = (this.std / this.mean) * 100;
    return coeff;
  }

  shapeOfDistribution() {
    this.init();
    let result;
    if (this.mean === this.mode && this.median === this.mode) {
      console.log("Symmetric Distribution");
      result = "symmetric";
    } else if (this.median < this.mean) {
      console.log("Right Skewed Distribution");
      result = "right-skewed";
    } else {
      console.log("Left Skewed Distribution");
      result = "left-skewed";
    }
    return result;
  }

  z_score(val) {
    this.init();
    this.stdDeviation("sample");
    let z_formula = (val - this.mean) / this.std;
    return z_formula;
  }
}

export { Statistics };
