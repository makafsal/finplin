import Dexie, { type EntityTable } from "dexie";
import { Budget, Category } from "../types";

const db = new Dexie("FinPlinDB") as Dexie & {
  categories: EntityTable<Category, "id">;
  budgets: EntityTable<Budget, "id">;
};

db.version(1).stores({
  categories: "++id, name",
  budgets: "++id, categoryId, amount, maxAmount, date"
});

export { db };
