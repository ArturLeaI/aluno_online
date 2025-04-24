export interface SearchHeaderProps {
    termoBusca: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    showAddButton?: boolean;
    addButtonPath?: string;
    addButtonText?: string;
  }
  