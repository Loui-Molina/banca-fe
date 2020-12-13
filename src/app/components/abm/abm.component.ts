import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-abm',
  templateUrl: './abm.component.html',
  styleUrls: ['./abm.component.scss']
})
export class AbmComponent implements OnInit {

  constructor(private modal: NzModalService) {
  }
  @Input('controller') controller: any[] = [];
  @Input('title') title: string;
  @Input('formTemplate') formTemplate: TemplateRef<any>;
  @Input('viewTemplate') viewTemplate: TemplateRef<any>;
  @Input('columns') columns: Column[] = [];
  // tslint:disable-next-line:ban-types
  @Input('onSubmit') onSubmit: Function;
  @Input('form') form: FormGroup;
  @Input('defaultForm') defaultForm: any;

  visibleForm = false;
  visibleView = false;
  mode: 'C' | 'U';
  viewItem;

  ngOnInit(): void {
  }


  onAdd = () => {
    this.openMode('C', this.defaultForm);
  }

  onEdit = (item: any) => {
    this.openMode('U', item);
  }

  onDelete = (item: any) => {
    this.modal.warning({
      nzTitle: 'Eliminar',
      nzContent: '¿Estas seguro que desea eliminarlo?',
      nzOnOk: () => this.onSubmitDelete(item),
      nzOkText: 'Eliminar',
      nzCancelText: 'Cancelar'
    });
  }

  onSubmitDelete = (item: any) => {

  }

  onSave = () => {
    if (this.onSubmit){
      this.onSubmit(this.mode, this.onSaveCB, this.onSaveCBError);
    }
  }

  onSaveCB = () => {
    this.onCancel();
  }

  onSaveCBError = () => {

  }

  onCancel = () => {
    this.clearForm();
    this.close();
  }

  onCancelView = () => {
    this.viewItem = null;
    this.closeView();
  }

  clearForm = () => {
    this.form.reset(this.defaultForm);
  }

  openMode(mode: 'C' | 'U', item): void {
    this.visibleForm = true;
    const obj = {};
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < Object.keys(this.defaultForm).length; i++) {
      const key = Object.keys(this.defaultForm)[i];
      obj[key] = item[key];
    }
    this.form.setValue(obj);
    this.mode = mode;
  }

  openView(item): void {
    this.visibleView = true;
    this.viewItem = item;
  }

  close(): void {
    this.visibleForm = false;
  }

  closeView(): void {
    this.visibleView = false;
  }
}


export interface Column {
  key?: string;
  title?: string;
  type?: 'numeric' | 'string';
  prefix?: string;
  suffix?: string;
  // tslint:disable-next-line:ban-types
  valueFormatter?: Function;
}
