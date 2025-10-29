export interface IFilter {
  filter: string;
  setFilter: (filter: "all" | "active" | "completed") => void;
}
