export interface IListItem {
  id?: string;
  fields: {
    Title: string;
    Description?: string;
    Status?: string;
    DueDate?: string;
    // Add other fields as needed
  };
}

export interface IListItemCreate {
  fields: {
    Title: string;
    Description?: string;
    Status?: string;
    DueDate?: string;
  };
}
