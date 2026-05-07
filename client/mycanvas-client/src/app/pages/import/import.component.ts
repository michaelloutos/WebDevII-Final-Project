import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImportService } from '../../services/import.service';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {

  token = '';

  successMessage = '';

  constructor(private importService: ImportService) {}

  importAssignments() {

    const fakeImport = {
      tokenUsed: this.token,
      importedCount: 5
    };

    this.importService.createImport(fakeImport)
      .subscribe({
        next: () => {

          this.successMessage =
            'Assignments imported successfully!';

          this.token = '';
        },

        error: (err) => {
          console.log(err);
        }
      });
  }
}