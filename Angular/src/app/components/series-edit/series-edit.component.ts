import {Component, inject, Input, OnInit} from '@angular/core';
import {SerieService} from "../../services/serie.service";
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormValidators} from "../../validators/FormValidators";
import {DatePipe,} from "@angular/common";
import {NgbToast, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Category} from "../../common/serie";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CategoryModalComponent} from "../category-modal/category-modal.component";

@Component({
  selector: 'app-series-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,DatePipe,NgbToast,MatIconModule, MatSelectModule, MatInputModule, MatButtonModule],
  templateUrl: './series-edit.component.html',
  styleUrl: './series-edit.component.css'
})
export class SeriesEditComponent implements OnInit {
  @Input('id') id!: string;
  categoriesList: Category[] = [];
  private readonly serieService: SerieService = inject(SerieService);
  private readonly router: Router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private modalService: NgbModal = inject(NgbModal);
  edit = false;
  toast = {color: 'bg-success', body: '', duration: 2000, position: 'top-right'};
  toastShow = false;
  ngOnInit(): void {
    this.loadData();
  }
  constructor() {
    this.loadCategories();
  }

  formSerie: FormGroup = this.formBuilder.group({
    _id: [0],
    title: ['',
      [Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
        FormValidators.notOnlyWhiteSpace,
        FormValidators.forbiddenName(/sexo|droga|puta|gilipollas|cabrón|sex|drug|bitch|asshole|bastard/i)
      ]],
    images: this.formBuilder.array([]),
    categories: this.formBuilder.array([]),
    numberOfEpisodes: [0,
      [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5),
        Validators.pattern('^[0-9]*$')
      ]],
    releaseDate: ['',
      [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)
      ]],
    synopsis: ['',
      [Validators.required,
        Validators.minLength(20),
        Validators.maxLength(1000)
      ]]
  });

  // GETTERS
  get title(): any {
    return this.formSerie.get('title');
  }
  get images(): FormArray {
    return this.formSerie.get('images') as FormArray;
  }
  get categories() {
    return this.formSerie.controls['categories'] as FormArray;
  }
  get numberOfEpisodes(): any {
    return this.formSerie.get('numberOfEpisodes');
  }
  get releaseDate(): any {
    return this.formSerie.get('releaseDate');
  }
  get synopsis(): any {
    return this.formSerie.get('synopsis');
  }

  private loadData() {
    if (this.id) {
      this.edit = true;
      this.serieService.getSerie(String(this.id)).subscribe({
        next: value => {
          const serie = value.data;

          //formateo fecha para que el FORM me la muestre precargada
          const formattedDate = new Date(serie.releaseDate).toISOString().split('T')[0];

          this.formSerie.patchValue({
            _id: serie._id,
            title: serie.title,
            numberOfEpisodes: serie.numberOfEpisodes,
            releaseDate: formattedDate,  //aca le doy formato al formulario con la constante previamente creada
            synopsis: serie.synopsis
          });

          // Limpio el formarray de imagnes y luego las agrego
          this.images.clear();
          (serie.images.length ? serie.images : ['']).forEach(img => {
            this.images.push(this.formBuilder.control(img, [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]));
          });

          //limpio el formArray antes de agregar las cats
          this.categories.clear();

          //agrego las categ al formArray
          serie.categories.forEach(category => {
            const categoryFormGroup = this.formBuilder.group({
              category: [category.category, Validators.required],
              image: [category.image, Validators.required],
              selectedCategory: [category._id, Validators.required],
              _id: [category._id]
            });
// Comprubo si la cat ya existe en el Formarray
            const existingCategory = this.categories.controls.find(
              (control: any) => control.value._id === category._id
            );
            if (!existingCategory) {
              this.categories.push(categoryFormGroup);
            }
          });
        },
        complete: () => {
          this.showToast('Serie loaded', 'bg-warning','top-right');
        },
        error: err => {
          this.showToast(err.message, 'bg-danger','top-right');
        }
      });
    }
  }

  //para poder ocupar las funciones de control en el html con formArray
  isControlTouchedOrDirty(control: any): boolean {
    return control.touched || control.dirty;
  }

  private loadCategories() {
    this.serieService.getCategories().subscribe({
      next: value => {
        this.categoriesList = value.data;
      },
      error: err => {
        this.showToast(err.message, 'bg-danger','top-right');
      },
      complete: () => {
        this.showToast('Categories loaded', 'bg-warning','top-right');
      }
    });
  }

  private showToast(message: string, color: string, position: string) {
    this.toast.body = message;
    this.toast.color = color;
    this.toast.position = position;
    this.toastShow = true;
    setTimeout(() => {
      this.toastShow = false;
    }, 2000);
  }

  onSubmit() {


    if (this.images.length < 3) {
      this.showToast('You must add at least three images', 'bg-danger', 'top-left');
      return;
    }


    if (this.categories.length === 0) {
      this.showToast('You must add at least one category', 'bg-danger','center-right');
      return;
    }


    if (this.formSerie.invalid) {
      this.formSerie.markAllAsTouched();
      return;
    }
    const serieData = this.formSerie.getRawValue();

    if (!this.edit) {
      delete serieData._id;
    }
    console.log('lo que estoy enviando', serieData);
    serieData.categories = serieData.categories.map((cat: any) => {
      if (cat._id && cat._id.startsWith('temp-')) {
        delete cat._id; // con esto elimino el id temporal, para que no me salga el puto error 500
      }
      return cat;
    });

    delete serieData.created_at;
    delete serieData.updated_at;
    console.log('envio *DEV*', serieData);

    if (this.edit) {
      this.serieService.updateSerie(serieData).subscribe({

          next: (response) => {
            this.showToast(response.message, 'bg-success','top-left');
            this.router.navigateByUrl('/series/list');
          },
          error: err => {
            this.showToast(err.message, 'bg-danger','top-right');
          }
        }
      )
    } else {
      this.serieService.addSerie(serieData).subscribe({
          next: (response) => {
            this.showToast(response.message, 'bg-success','top-left');
            this.router.navigateByUrl('/series/list');
          },
          error: err => {
            this.showToast(err.message, 'bg-danger','top-right');
          }
        }
      )
    }
  }
  addCategory() {
    const newCategoryForm: FormGroup = this.formBuilder.group({
      category: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)]],

      image: ['', [
        Validators.required]],

      selectedCategory: [null, [Validators.required]],
      _id: [null]

    });

    this.categories.push(newCategoryForm);
  }

  deleteCategory(categoryIndex: number) {
    this.categories.removeAt(categoryIndex);
  }

  onCategoryChange(index: number) {
    const selectedCategoryId =
      this.categories.controls[index].get('selectedCategory')?.value;
    if (selectedCategoryId) {
      const selectedCategory = this.categoriesList.find(
        cat => cat._id === selectedCategoryId);
      if (selectedCategory) {
        const alreadyExists = this.categories.controls.some(control =>
          control.get('selectedCategory')?.value === selectedCategoryId && this.categories.controls.indexOf(control) !== index
        );
        if (alreadyExists) {
          this.showToast('Category already added', 'bg-danger','top-right');
          this.categories.removeAt(index);
          return;
        }
        this.categories.controls[index].patchValue({
          category: selectedCategory.category,
          image: selectedCategory.image,
          _id: selectedCategory._id
        });
      }
    } else {
      this.categories.controls[index].patchValue({
        name: '',
        image: '',
        _id: ''
      });
    }
  }

  addImage() {
    this.images.push(this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(1000)
    ]));
  }

  removeImage(index: number): void {
    if (this.images.length > 1) {
      this.images.removeAt(index);
    } else {
      this.images.at(0).reset();
    }
  }

  openCategoryModal() {
    const modalRef = this.modalService.open(CategoryModalComponent);
    modalRef.componentInstance.categoryCreated.subscribe((newCategory: { category: string, image: string }) => {

      const existingCategory = this.categoriesList.find(
        cat => cat.category === newCategory.category && cat.image === newCategory.image
      );
      if (existingCategory) {
        this.showToast('The category already exists', 'bg-warning','top-right');
        return;
      }

      const tempId = `temp-${Date.now()}`;
      const newCategoryFormGroup = this.formBuilder.group({
        category: [newCategory.category, Validators.required],
        image: [newCategory.image, Validators.required],
        selectedCategory: [null],
        _id: [tempId]
      });
      this.categories.push(newCategoryFormGroup);
      this.categoriesList.push({
        _id: tempId,
        category: newCategory.category,
        image: newCategory.image
      });
      this.showToast('Category temporarily added', 'bg-success','top-left');
    });
  }
}
