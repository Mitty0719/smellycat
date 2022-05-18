import { Tree } from './tree.js';

const TREE_INFO = [1000, 2000, 3000, 4000];

export class TreeGroup{
  constructor(){
    this.trees = [];
    this.treeCnt = 10;
  }

  create(stage, loader){
    for(let i = 0; i < TREE_INFO.length; i++){
      for(let j = 0; j < this.treeCnt; j++){
        const tree = new Tree(TREE_INFO[i] + 100 * j, 200, 2, i);
        tree.create(stage, loader);
        this.trees.push(tree);
      }
    }
  }
}