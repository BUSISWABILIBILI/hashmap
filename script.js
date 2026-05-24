class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    const currentLoad = this.length() / this.capacity;

    if (currentLoad >= this.loadFactor) {
      this.resize();
    }

    const newIndex = this.hash(key);
    this.buckets[newIndex].push([key, value]);
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    for (const entry of bucket) {
      if (entry[0] === key) {
        return entry[1];
      }
    }

    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  length() {
    let count = 0;

    for (const bucket of this.buckets) {
      count += bucket.length;
    }

    return count;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  keys() {
    const keysArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keysArray.push(entry[0]);
      }
    }

    return keysArray;
  }

  values() {
    const valuesArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        valuesArray.push(entry[1]);
      }
    }

    return valuesArray;
  }

  entries() {
    const entriesArray = [];

    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entriesArray.push(entry);
      }
    }

    return entriesArray;
  }

  resize() {
    const oldEntries = this.entries();

    this.capacity *= 2;

    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    for (const [key, value] of oldEntries) {
      this.set(key, value);
    }
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Before resize:", test.capacity);

test.set("moon", "silver");

console.log("After resize:", test.capacity);

console.log("Get apple:", test.get("apple"));
console.log("Has moon:", test.has("moon"));
console.log("Remove dog:", test.remove("dog"));
console.log("Length:", test.length());
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());
