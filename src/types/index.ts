export interface Category {
  id: number;
  name?: string;
}

export interface Budget {
  id?: number;
  categoryId?: number;
  amount?: number;
  maxAmount?: number;
  date?: Date;
}

export interface CategoryModalProps {
  open?: boolean;
  onCancel?: () => void;
  onAdd?: (item: string) => void;
  onUpdate?: (item: Category) => void;
  category?: Category;
}

export interface ExpenseModalProps {
  open?: boolean;
  onCancel?: () => void;
  onSave?: (item?: any) => void;
  budgets?: Budget[];
}

export interface DropdownItem {
  text: string;
  value: number;
}

export type Status = "active" | "finished" | "error";

export interface LogItem {
  id?: number;
  time: Date;
  message: string;
}
