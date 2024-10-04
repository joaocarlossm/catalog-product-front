import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  ngAfterViewInit() {
    const dialogContainer = this.elementRef.nativeElement.closest('.mat-mdc-dialog-surface');
    if (dialogContainer) {
      dialogContainer.style.overflow = 'hidden';
      dialogContainer.style.padding = '20px';
      dialogContainer.style.borderRadius = '15px';
      dialogContainer.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
      dialogContainer.style.backgroundColor = 'var(--ion-color-light)';
      dialogContainer.style.width = '400px';
      dialogContainer.style.height = '250px';
      dialogContainer.style.maxWidth = '90vw';
      dialogContainer.style.maxHeight = '300px';
      dialogContainer.style.margin = 'auto';
      dialogContainer.style.position = 'fixed';
      dialogContainer.style.top = '0';
      dialogContainer.style.left = '0';
      dialogContainer.style.right = '0';
      dialogContainer.style.bottom = '0';
    }
  }
  
}