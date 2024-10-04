import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importe o MatSnackBar
import { AuthService } from '../../services/auth.service'; // Importe o serviço de autenticação
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Injete o MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<{ token: string }>('https://localhost:7084/api/Auth/login', this.loginForm.value).subscribe(response => {
        this.authService.setToken(response.token);
        this.router.navigate(['products']); // Redireciona após o login bem-sucedido
      }, error => {
        console.error('Erro no login', error);
        this.snackBar.open('Usuário ou senha inválidos. Tente novamente!', 'X', {
          duration: 3000,
          panelClass: ['custom-snackbar']
        });
      });
    }
  }
}
