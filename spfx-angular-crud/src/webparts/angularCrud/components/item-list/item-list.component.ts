import { Component, OnInit } from '@angular/core';
import { SharePointService } from '../../services/sharepoint.service';
import { IListItem, IListItemCreate } from '../../models/list-item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  public items: IListItem[] = [];
  public loading: boolean = false;
  public error: string = '';
  public showForm: boolean = false;
  public editingItem: IListItem | null = null;

  // Form fields
  public formTitle: string = '';
  public formDescription: string = '';
  public formStatus: string = 'Not Started';
  public formDueDate: string = '';

  constructor(private spService: SharePointService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  /**
   * Load all items from SharePoint list
   */
  public loadItems(): void {
    this.loading = true;
    this.error = '';

    this.spService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load items: ' + err.message;
        this.loading = false;
      },
    });
  }

  /**
   * Show create form
   */
  public showCreateForm(): void {
    this.resetForm();
    this.editingItem = null;
    this.showForm = true;
  }

  /**
   * Show edit form
   */
  public editItem(item: IListItem): void {
    this.editingItem = item;
    this.formTitle = item.fields.Title;
    this.formDescription = item.fields.Description || '';
    this.formStatus = item.fields.Status || 'Not Started';
    this.formDueDate = item.fields.DueDate || '';
    this.showForm = true;
  }

  /**
   * Save item (create or update)
   */
  public saveItem(): void {
    if (!this.formTitle.trim()) {
      this.error = 'Title is required';
      return;
    }

    this.loading = true;
    this.error = '';

    const itemData: IListItemCreate = {
      fields: {
        Title: this.formTitle,
        Description: this.formDescription,
        Status: this.formStatus,
        DueDate: this.formDueDate,
      },
    };

    if (this.editingItem) {
      // Update existing item
      this.spService.updateItem(this.editingItem.id!, itemData).subscribe({
        next: () => {
          this.showForm = false;
          this.loadItems();
        },
        error: (err) => {
          this.error = 'Failed to update item: ' + err.message;
          this.loading = false;
        },
      });
    } else {
      // Create new item
      this.spService.createItem(itemData).subscribe({
        next: () => {
          this.showForm = false;
          this.loadItems();
        },
        error: (err) => {
          this.error = 'Failed to create item: ' + err.message;
          this.loading = false;
        },
      });
    }
  }

  /**
   * Delete item
   */
  public deleteItem(item: IListItem): void {
    if (!confirm(`Are you sure you want to delete "${item.fields.Title}"?`)) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.spService.deleteItem(item.id!).subscribe({
      next: () => {
        this.loadItems();
      },
      error: (err) => {
        this.error = 'Failed to delete item: ' + err.message;
        this.loading = false;
      },
    });
  }

  /**
   * Cancel form
   */
  public cancelForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  /**
   * Reset form fields
   */
  private resetForm(): void {
    this.formTitle = '';
    this.formDescription = '';
    this.formStatus = 'Not Started';
    this.formDueDate = '';
    this.editingItem = null;
  }
}
