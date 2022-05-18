import { Tree } from './tree.js';

const TREE_INFO = [1000, 3000, 5000, 7000];

export class TreeGroup{
  constructor(){
    this.trees = [];
    this.treeCnt = 5;
  }

  create(stage, loader){
    for(let i = 0; i < TREE_INFO.length; i++){
      for(let j = 0; j < this.treeCnt; j++){
        const tree = new Tree(TREE_INFO[i] + 300 * j, 120, 3, i);
        tree.create(stage, loader);
        this.trees.push(tree);
      }
    }
  }
}