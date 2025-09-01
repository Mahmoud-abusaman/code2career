export interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string ): Promise<T | undefined>;
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  find(filter: Partial<T>): Promise<T[]>;
}
