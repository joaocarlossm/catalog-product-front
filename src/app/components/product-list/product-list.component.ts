import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';  // Importando MatTableModule
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule   // Certifique-se de importar MatTableModule
  ]
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'preco', 'descricao', 'acoes'];
  dataSource = new MatTableDataSource<any>([]); // Usar MatTableDataSource para permitir paginação

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild para acessar o paginator

  constructor(private productService: ProductService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator; // Associa o paginator aos dados da tabela
    });
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '500px',
      data: { id: null, nome: '', preco: 0, descricao: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(result).subscribe(() => {
          this.productService.getProducts().subscribe((data) => {
            this.dataSource.data = data;
            this.snackBar.open('Produto adicionado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          });
        });
      }
    });
  }

  editProduct(product: any): void {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      panelClass: 'custom-dialog-container',
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(result).subscribe(() => {
          this.productService.getProducts().subscribe((data) => {
            this.dataSource.data = data;
            this.snackBar.open('Produto atualizado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          });
        });
      }
    });
  }

  deleteProduct(product: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { nome: product.nome }
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          return this.productService.deleteProduct(product.id).pipe(
            switchMap(() => this.productService.getProducts()),
            catchError(error => {
              console.error('Erro ao deletar produto:', error);
              return EMPTY;
            })
          );
        } else {
          return EMPTY;
        }
      })
    ).subscribe(products => {
      this.dataSource.data = products;
      this.snackBar.open('Produto excluído com sucesso!', 'Fechar', {
        duration: 3000,
      });
    });
  }
}