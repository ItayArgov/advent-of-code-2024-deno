export class UnionFind {
  private parents: Map<string | undefined, string | undefined>;
  private size: Map<string | undefined, number>;

  constructor() {
    this.parents = new Map();
    this.size = new Map();
  }

  makeSet(x: string): void {
    this.parents.set(x, x);
    this.size.set(x, 1);
  }

  find(x: string | undefined): string | undefined {
    if (this.parents.get(x) === x) {
      return x;
    } else {
      const root = this.find(this.parents.get(x));
      this.parents.set(x, root);
      return root;
    }
  }

  union(x: string | undefined, y: string | undefined): void {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.size.get(rootX)! < this.size.get(rootY)!) {
        this.parents.set(rootX, rootY);
        this.size.set(rootY, this.size.get(rootY)! + this.size.get(rootX)!);
      } else {
        this.parents.set(rootY, rootX);
        this.size.set(rootX, this.size.get(rootX)! + this.size.get(rootY)!);
      }
    }
  }
}
