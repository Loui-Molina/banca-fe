import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrls: ['./abm.component.scss']
})
export class AbmComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private modal: NzModalService, private translateService: TranslateService, private messageService: NzMessageService) {
  }

  @Input() title: string;
  @Input() formTemplate: TemplateRef<any>;
  @Input() viewTemplate: TemplateRef<any>;
  @Input() columns: Column[] = [];
  @Input() form: FormGroup;
  // tslint:disable-next-line:ban-types
  @Input() getValidators: Function;
  // tslint:disable-next-line:ban-types
  @Input() parseData: Function;
  @Input() defaultForm: any;
  @Input() fetcher: Observable<any[]>;
  @Input() fetcherCreate: (item) => Observable<any>;
  @Input() fetcherUpdate: (item) => Observable<any>;
  @Input() fetcherDelete: (item) => Observable<Response>;

  visibleForm = false;
  visibleView = false;
  mode: 'C' | 'U';
  visibleObject;
  data: any[] = [];
  loadingSave = false;
  loading = false;

  ngOnInit(): void {
    this.loadFetcher();
  }

  getValueKey(item, key: string): any {
    const keyArray = key.split('.');
    let c = keyArray.length;
    let aux = item;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keyArray.length; i++){
      // tslint:disable-next-line:no-shadowed-variable
      const key = keyArray[i];
      aux = aux[key];
      c -= 1;
      if (c <= 0){
        return aux;
      }
    }
    return null;
  }

  getValue(item, key: string): any {
    return item[key];
  }

  loadFetcher(): void {
    if (this.fetcher) {
      this.loading = true;
      this.fetcher.subscribe(data => {
        this.loading = false;
        this.data = data;
      }, error => {
        this.loading = false;
        throw new HttpErrorResponse(error);
      });
    }
  }

  refresh(): void {
    this.loadFetcher();
  }


  onAdd = () => {
    const mode = 'C';
    this.openMode(mode, this.defaultForm);
  };

  onEdit = (item: any) => {
    const mode = 'U';
    this.openMode(mode, item);
  };

  onDelete = (item: any) => {
    this.modal.warning({
      nzTitle: this.ts('UTILS.DELETE'),
      nzContent: this.ts('UTILS.ARE_YOU_SURE'),
      nzOnOk: () => this.onSubmitDelete(item),
      nzOkText: this.ts('UTILS.CONFIRM'),
      nzCancelText: this.ts('UTILS.CANCEL')
    });
  };

  onSubmitDelete = (item: any) => {
    this.loading = true;
    this.fetcherDelete(item._id).subscribe(response => {
      this.messageService.create('success', this.ts('UTILS.DELETED'));
      this.refresh();
    }, error => {
      this.loading = false;
      throw new HttpErrorResponse(error);
    });
  };

  onSave = () => {
    if (this.form.valid) {
      this.loadingSave = true;
      if (this.mode === 'C') {
        let body = this.form.value;
        if (this.parseData) {
          body = this.parseData(this.mode, this.form.value);
        }
        this.fetcherCreate(body).subscribe(data => {
          this.messageService.create('success', this.ts('UTILS.SAVED'));
          this.loadingSave = false;
          this.onCancel();
          this.refresh();
        }, error => {
          this.loadingSave = false;
          throw new HttpErrorResponse(error);
        });
      } else {
        let body = this.form.value;
        if (this.parseData) {
          body = this.parseData(this.mode, this.form.value);
        }
        this.fetcherUpdate({_id: this.visibleObject._id, ...body}).subscribe(data => {
          this.messageService.create('success', this.ts('UTILS.SAVED'));
          this.loadingSave = false;
          this.onCancel();
          this.refresh();
        }, error => {
          this.loadingSave = false;
          throw new HttpErrorResponse(error);
        });
      }
    }
  };

  onCancel = () => {
    this.visibleObject = null;
    this.clearForm();
    this.close();
  };

  onCancelView = () => {
    this.visibleObject = null;
    this.closeView();
  };

  clearForm = () => {
    if (this.form) {
      this.form.reset(this.defaultForm);
    }
  };

  openMode(mode: 'C' | 'U', item): void {
    this.visibleForm = true;
    const obj = {};
    for (const key of Object.keys(this.defaultForm)) {
      obj[key] = (item[key] !== null || item[key] !== undefined) ? item[key] : this.defaultForm[key];
    }
    if (this.form) {
      this.form.setValue(obj);
      if (this.getValidators) {
        this.setValidators(this.getValidators(mode));
      }
    }
    this.mode = mode;
    this.visibleObject = item;
  }

  setValidators(validators): void {
    for (const control in this.form.controls) {
      if (validators[control]) {
        this.form.controls[control].clearValidators();
        this.form.controls[control].setValidators(validators[control]);
        this.form.controls[control].updateValueAndValidity();
      }
    }
  }

  openView(item): void {
    this.visibleView = true;
    this.visibleObject = item;
  }

  close(): void {
    this.visibleForm = false;
  }

  closeView(): void {
    this.visibleView = false;
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}


export interface Column {
  key?: string;
  title?: string;
  type?: 'numeric' | 'string';
  // tslint:disable-next-line:ban-types
  valueFormatter?: Function;
}
