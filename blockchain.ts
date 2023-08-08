// Try to find all the libraries necessary to build a blockchain in typescript
// we will need equivalent for hashlib, datetime, time and json (json I think is natively implemented)

import { createHash } from "crypto";

let initialbits: number = 0x1e777777;
let Max32Bit: number = 0xffffffff;

class Block {
  index: number;
  prevHash: string;
  data: number;
  timestamp: number;
  bits: number;
  nonce: number;
  elapsedTime: string;
  blockHash: string;

  constructor(index, prevHash, data, timestamp, bits) {
    this.index = index;
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = timestamp;
    this.bits = bits;
    this.nonce = 0;
    this.elapsedTime = "";
    this.blockHash = "";
  }

  setItem(key, value) {
    this[key] = value;
  }

  toJson() {
    const date = new Date(this.timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDay()).padStart(2, "0");
    const Hours = String(date.getHours()).padStart(2, "0");
    const Minutes = String(date.getMinutes()).padStart(2, "0");
    const Seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}/${month}/${day} ${Hours}:${Minutes}:${Seconds}`;

    return {
      index: this.index,
      prevHash: this.prevHash,
      storedData: this.data,
      date: formattedDate,
      bits: this.bits.toString(16).padStart(8, "0"),
      nonce: this.nonce.toString(16).padStart(8, "0"),
      elapsedTime: this.elapsedTime,
      blockHash: this.blockHash,
    };
  }

  calcBlockHash() {
    const blockHeader =
      String(this.index) +
      String(this.prevHash) +
      String(this.data) +
      String(this.timestamp) +
      this.bits.toString(16) +
      this.nonce;

    const hash = createHash(blockHeader).toString();
    this.blockHash = hash;

    return hash;
  }

  calcTarget() {
    const exponentBytes = (this.bits >> 24) - 3;
    const exponentBits = exponentBytes * 8;
    const coefficient = this.bits & 0xffffff;
    return coefficient << exponentBits;
  }

  checkValidHash() {
    return parseInt(this.calcBlockHash()) <= self.calcTarget();
  }
}

class Blockchain {
  chain: any[];
  block: any;
  initialBits: string;

  constructor(initialBits) {
    this.chain = [];
    this.initialBits = initialBits;
  }

  addBlock(block) {
    this.chain.push(block);
  }

  getBlockInfo(index = -1) {
    return;
    //json stuff
  }
}

let myBlock = new Block(1, "prevHash1", "data1", Date.now(), "bits1");
console.log(myBlock.index); // This should print '1'
