export type TodosFilterType = "all" | "active" | "completed";

export interface ITodosList {
  id: number;
  text: string;
  completed: boolean;
}
