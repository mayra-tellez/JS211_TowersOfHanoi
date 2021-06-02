'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
// -- move from one key to another - startStack to endStack
// -- pop from the startStack, push to the endStack
const movePiece = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    stacks[endStack].push(stacks[startStack].pop())
  }
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
// -- the startStack has to be less than the endStack for the move to be legal (can't put a bigger block on top of smaller black)
const isLegal = (startStack, endStack) => {
  // take in parameters - check
  // if endStack length is 0
    // return true
  // if endStack length is not 0
    // get last element of endStack (pop? [arr.length - 1]?)
    // if last item of endStack is less than startStack item to be moved
      // return false
    // else
      // return true 
  let moveItem = stacks[startStack].slice(-1)[0];
  let lastItem = stacks[endStack].slice(-1)[0];

  if (stacks[endStack].length === 0) {
    return true;
  } else if ((stacks[endStack].length > 0) && (moveItem < lastItem)) {
    return true;
  } else {
    return false;
  }
};

// What is a win in Towers of Hanoi? When should this function run?
// -- if stack b or c is 4 numbers long, it's a win
// maybe loop? let win = [4,3,2,1]?
const checkForWin = () => {
  if ((stacks.b.length === 4) || (stacks.c.length === 4)) {
    return true;
  } else {
    return false;
  }
};

// When is this function called? What should it do with its argument?
// movePiece(startStack, endStack);
const towersOfHanoi = (startStack, endStack) => {
  movePiece(startStack, endStack);
  if (checkForWin()) {
    console.log('Yay! You won the game!!!');
  }
};

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
