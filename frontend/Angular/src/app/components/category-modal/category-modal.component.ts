import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Category} from "../../common/serie";

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css'
})
export class CategoryModalComponent {
  private readonly formBuilder = inject(FormBuilder);
  private modalService: NgbModal = inject(NgbModal);

  newCategoryForm = this.formBuilder.group({
    category: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    image: ['', [Validators.required]]
  });

  @Output() categoryCreated = new EventEmitter<{ category: string, image: string }>();

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder
  ) {
    this.newCategoryForm = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.required]]
    });
  }

  createCategory() {
    if (this.newCategoryForm.invalid) return;

    const newCategory = {
      category: this.newCategoryForm.value.category!,
      image: this.newCategoryForm.value.image!,
      _id: Date.now().toString()
    };
    this.categoryCreated.emit(newCategory);

    this.activeModal.close();
  }

  dismissModal() {
    this.activeModal.dismiss();
  }

}
