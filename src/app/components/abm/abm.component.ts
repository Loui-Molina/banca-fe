import {Component, ComponentFactoryResolver, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
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
  @Input() title: string;
  @Input() formTemplate: TemplateRef<any>;
  @Input() viewTemplate: TemplateRef<any>;
  @Input() columns: Column[] = [];
  @Input() form: FormGroup;
  @Input() customColumns: TemplateRef<any>;
  // tslint:disable-next-line:ban-types
  @Input() getValidators: Function;
  // tslint:disable-next-line:ban-types
  @Input() parseData: Function;
  // tslint:disable-next-line:ban-types
  @Input() setValueForm: Function;
  @Input() defaultForm: any;
  @Input() extraButtons: ExtraButton[];
  @Input() fetcher: Observable<any[]>;
  @Input() fetcherCreate: (item) => Observable<any>;
  @Input() fetcherUpdate: (item) => Observable<any>;
  @Input() fetcherDelete: (item) => Observable<Response>;
  filterValue = {};
  visibleFilter = {};
  visibleForm = false;
  visibleView = false;
  mode: 'C' | 'U';
  visibleObject;
  data: any[] = [];
  dataDisplayed: any[] = [];
  loadingSave = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private modal: NzModalService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private translateService: TranslateService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.loadFetcher();
  }

  getValueKey(item, key: string): any {
    const keyArray = key.split('.');
    let c = keyArray.length;
    let aux = item;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keyArray.length; i++) {
      // tslint:disable-next-line:no-shadowed-variable
      const key = keyArray[i];
      aux = aux[key];
      c -= 1;
      if (c <= 0) {
        return aux;
      }
    }
    return null;
  }

  loadFetcher(): void {
    if (this.fetcher) {
      this.loading = true;
      this.fetcher.subscribe(data => {
        this.loading = false;
        this.data = data;
        this.dataDisplayed = data;
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
    this.fetcherDelete(item).subscribe(response => {
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
          body = this.parseData(this.mode, this.form.value, this.visibleObject);
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
          body = this.parseData(this.mode, this.form.value, this.visibleObject);
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
    let obj = {};
    for (const key of Object.keys(this.defaultForm)) {
      obj[key] = (item[key] !== undefined) ? item[key] : this.defaultForm[key];
    }
    if (this.form) {
      if (this.setValueForm) {
        obj = this.setValueForm(mode, this.defaultForm, item);
      }
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

  reset = (key, searchType: string) => {
    this.filterValue[key] = null;
    this.search(key, searchType);
  }

  datesAreOnSameDay = (first: Date, second: Date): boolean => {
    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();
  }

  search = (key, searchType: string) => {
    this.visibleFilter[key] = false;
    this.dataDisplayed = this.data.filter(item => {
      const valueFilter = this.filterValue[key];
      if (valueFilter === null || valueFilter === undefined) {
        return true;
      }
      switch (searchType) {
        case 'select':
          return item[key] === this.filterValue[key];
        case 'date':
          return this.datesAreOnSameDay(new Date(item[key]), this.filterValue[key]);
        case 'string':
        default:
          if (typeof item[key] === 'string' && item[key].indexOf(valueFilter) === -1) {
            return false;
          } else if (typeof item[key] === 'number' && item[key] !== (parseInt(valueFilter, 0) || null)) {
            return false;
          }
      }
      return false;
    });
  }

  private ts(key: string, params?): string {
    return this.translateService.instant(key, params);
  }
}


export interface Column {
  key?: string;
  title?: string;
  showSearch?: boolean;
  component?: string;
  type?: 'numeric' | 'string';
  searchType?: 'date' | 'string' | 'select';
  searchOptions?: SearchOption[];
  // tslint:disable-next-line:ban-types
  valueFormatter?: Function;
}

export interface SearchOption {
  label: string;
  value: any;
}

export interface ExtraButton {
  icon: string;
  tooltip: string;
  // tslint:disable-next-line:ban-types
  onClick?: Function;
}
