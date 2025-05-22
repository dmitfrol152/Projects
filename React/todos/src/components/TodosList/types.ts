export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export type TodosType = {
  todos: ITodo[];
  onToggle: (id: number) => void;
};
