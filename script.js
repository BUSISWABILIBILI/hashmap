class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }
}

const test = new HashMap();

console.log(test);
