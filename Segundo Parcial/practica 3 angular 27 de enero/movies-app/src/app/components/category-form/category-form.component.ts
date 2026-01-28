// ============================================
// COMPONENTE CATEGORY FORM - Crear Categoría
// ============================================
// Formulario simple para crear nuevas categorías
// Se navega aquí desde el formulario de películas

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  submitting = false;
  returnUrl = '/movies/new'; // URL a donde regresar después de crear

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Formulario simple con solo el nombre
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    // Obtener la URL de retorno de los query params
    this.route.queryParams.subscribe(params => {
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const categoryData = this.categoryForm.value;

    this.categoryService.createCategory(categoryData).subscribe({
      next: (result) => {
        if (result) {
          console.log('Categoría creada:', result);
          // Regresar a la página anterior
          this.router.navigateByUrl(this.returnUrl);
        } else {
          alert('Error al crear la categoría');
          this.submitting = false;
        }
      },
      error: (error) => {
        console.error('Error al crear categoría:', error);
        alert('Error al crear la categoría');
        this.submitting = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigateByUrl(this.returnUrl);
  }

  // Método auxiliar para validaciones
  isFieldInvalid(fieldName: string): boolean {
    const field = this.categoryForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.categoryForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    
    return '';
  }
}