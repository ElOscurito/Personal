import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PlatformsService } from '../../services/platforms.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-platform-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './platform-form.html',
  styleUrl: './platform-form.css',
})
export class PlatformForm implements OnInit {
  platformForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private platformService: PlatformsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.platformForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.platformForm.invalid) {
      return;
    }

    this.submitting = true;
    const platformData = this.platformForm.value;

    this.platformService.createPlatform(platformData).subscribe({
      next: (result) => {
        if (result) {
          alert('Plataforma creada exitosamente');
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/platforms';
          this.router.navigate([returnUrl]);
        }
        this.submitting = false;
      },
      error: () => {
        alert('Error al crear la plataforma');
        this.submitting = false;
      }
    });
  }

  onCancel(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/platforms';
    this.router.navigate([returnUrl]);
  }
}
