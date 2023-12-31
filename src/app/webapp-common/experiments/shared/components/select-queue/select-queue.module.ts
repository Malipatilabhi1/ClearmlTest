import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {SelectQueueComponent} from './select-queue.component';
import {SelectQueueEffects} from './select-queue.effects';
import {selectQueueReducer} from './select-queue.reducer';
import {SMSharedModule} from '@common/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedPipesModule} from '@common/shared/pipes/shared-pipes.module';
import {LabeledFormFieldDirective} from '@common/shared/directive/labeled-form-field.directive';

@NgModule({
  imports: [
    CommonModule,
    SMSharedModule,
    EffectsModule.forFeature([SelectQueueEffects]),
    StoreModule.forFeature('selectQueue', selectQueueReducer),
    FormsModule,
    ReactiveFormsModule,
    SharedPipesModule,
    LabeledFormFieldDirective,
  ],
  providers      : [],
  declarations   : [SelectQueueComponent],
  exports        : [SelectQueueComponent]
})
export class SelectQueueModule {
}
