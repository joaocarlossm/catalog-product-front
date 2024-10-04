import { Component, Inject, ViewEncapsulation, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class ProductEditComponent implements AfterViewInit {
  editForm: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private elementRef: ElementRef
  ) {
    this.editForm = this.fb.group({
      id: [data.id],
      nome: [data.nome, Validators.required],
      preco: [data.preco, [Validators.required, Validators.min(0)]],
      descricao: [data.descricao, Validators.required]
    });

    this.title = data.id ? 'Editar Produto' : 'Inserir Produto';

  }

  ngAfterViewInit() {
    const dialogContainer = this.elementRef.nativeElement.closest('.mat-mdc-dialog-surface');
    if (dialogContainer) {
      dialogContainer.style.overflow = 'hidden';
      dialogContainer.style.padding = '20px';
      dialogContainer.style.borderRadius = '15px';
      dialogContainer.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
      dialogContainer.style.backgroundColor = 'var(--ion-color-light)';
      dialogContainer.style.width = '700px';
      dialogContainer.style.maxWidth = '90vw';
      dialogContainer.style.maxHeight = '90vh';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      if (formValue.id === null) {
        delete formValue.id;
      }
      this.dialogRef.close(formValue);
    }
  }
}
