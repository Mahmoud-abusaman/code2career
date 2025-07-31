import { IRepository } from "./repositories.interface";

export abstract class BaseRepository<T extends { id: number }> implements IRepository<T> {
  protected items: T[] = [];

  constructor(initialData: T[]) {
    this.items = initialData;
  }

  async getAll(): Promise<T[]> {
    return this.items;
  }

  async getById(id: number): Promise<T | undefined> {
    return this.items.find(item => item.id === id);
  }

  async create(item: T): Promise<T> {
    this.items.push(item);
    return item;
  }

  async update(item: T): Promise<T> {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index === -1) throw new Error("Item not found");
    this.items[index] = item;
    return item;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  async find(filter: Partial<T>): Promise<T[]> {
    return this.items.filter(item =>
      Object.entries(filter).every(([key, value]) => (item as any)[key] === value)
    );
  }
}
