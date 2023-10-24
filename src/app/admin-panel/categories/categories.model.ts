export class Category {
  constructor(
    public id: string,
    public categoryName: string,
    public properties: { property: string; values: string[] }[],
    public parent?: Category
  ) {}
}
