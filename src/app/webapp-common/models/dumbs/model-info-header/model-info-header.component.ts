import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TagsMenuComponent} from '@common/shared/ui-components/tags/tags-menu/tags-menu.component';
import {Store} from '@ngrx/store';
import {selectCompanyTags, selectProjectTags, selectTagsFilterByProject} from '@common/core/reducers/projects.reducer';
import {Observable} from 'rxjs';
import {addTag, removeTag} from '../../actions/models-menu.actions';
import {SelectedModel, TableModel} from '../../shared/models.model';
import {MenuComponent} from '@common/shared/ui-components/panel/menu/menu.component';
import {getSysTags} from '../../model.utils';
import {activateModelEdit, cancelModelEdit} from '../../actions/models-info.actions';
import {
  CountAvailableAndIsDisableSelectedFiltered,
  MenuItems,
  selectionDisabledArchive,
  selectionDisabledDelete,
  selectionDisabledMoveTo,
  selectionDisabledPublishModels
} from '@common/shared/entity-page/items.utils';
import {addMessage} from '@common/core/actions/layout.actions';

@Component({
  selector   : 'sm-model-info-header',
  templateUrl: './model-info-header.component.html',
  styleUrls  : ['./model-info-header.component.scss']
})
export class ModelInfoHeaderComponent {

  public viewId: boolean;
  public tagsFilterByProject$: Observable<boolean>;
  public projectTags$: Observable<string[]>;
  public companyTags$: Observable<string[]>;
  public sysTags: string[];
  selectedDisableAvailable: Record<string, CountAvailableAndIsDisableSelectedFiltered>;

  @Input() editable: boolean;
  @Input() backdropActive: boolean;
  @Output() modelNameChanged = new EventEmitter();
  @Output() closeInfoClicked = new EventEmitter();
  @ViewChild('tagMenu') tagMenu: MenuComponent;
  @ViewChild('tagsMenuContent') tagMenuContent: TagsMenuComponent;

  constructor(private store: Store<any>) {
    this.tagsFilterByProject$ = this.store.select(selectTagsFilterByProject);
    this.projectTags$ = this.store.select(selectProjectTags);
    this.companyTags$ = this.store.select(selectCompanyTags);

  }

  private _model: TableModel | SelectedModel;

  get model() {
    return this._model;
  }

  @Input() set model(model: TableModel | SelectedModel) {
    if (this._model?.id != model?.id) {
      this.viewId = false;
    }
    this._model = model;
    this.sysTags = getSysTags(model as TableModel);
    this.selectedDisableAvailable = {
      [MenuItems.publish]: selectionDisabledPublishModels([model]),
      [MenuItems.moveTo]: selectionDisabledMoveTo([model]),
      [MenuItems.delete]: selectionDisabledDelete([model]),
      [MenuItems.archive]: selectionDisabledArchive([model])
    };
  }

  public onNameChanged(name) {
    this.modelNameChanged.emit(name);
  }

  openTagMenu(event: MouseEvent) {
    if (!this.tagMenu) {
      return;
    }
    window.setTimeout(() => this.store.dispatch(activateModelEdit('tags')), 200);
    this.tagMenu.position = {x: event.clientX, y: event.clientY};
    window.setTimeout(() => {
      this.tagMenu.openMenu();
      this.tagMenuContent.focus();
    });
  }

  addTag(tag: string) {
    this.store.dispatch(addTag({tag, models: [this.model as SelectedModel]}));
  }

  removeTag(tag: string) {
    this.store.dispatch(removeTag({tag, models: [this.model as SelectedModel]}));
  }

  tagsMenuClosed() {
    this.store.dispatch(cancelModelEdit());
    this.tagMenuContent.clear();
  }

  editExperimentName(edit: boolean) {
    if (edit) {
      this.store.dispatch(activateModelEdit('ModelName'));
    } else {
      this.store.dispatch(cancelModelEdit());
    }
  }

  copyToClipboard() {
    this.store.dispatch(addMessage('success', 'Copied to clipboard'));
  }
}
