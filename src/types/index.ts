export interface Category {
  id: number;
  name?: string;
}

export interface Budget {
  id: number;
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
