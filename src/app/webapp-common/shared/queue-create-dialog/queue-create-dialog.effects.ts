import * as createNewQueueActions from './queue-create-dialog.actions';
import {CREATE_QUEUE_ACTIONS} from './queue-create-dialog.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {CREATION_STATUS} from './queue-create-dialog.reducer';
import {catchError, mergeMap, map, switchMap} from 'rxjs/operators';
import {activeLoader, addMessage, deactivateLoader} from '../../core/actions/layout.actions';
import {requestFailed} from '../../core/actions/http.actions';
import {ApiQueuesService} from '~/business-logic/api-services/queues.service';
import {MESSAGES_SEVERITY} from '@common/constants';

@Injectable()
export class QueueCreateDialogEffects {
  constructor(private actions: Actions, private queuesApiService: ApiQueuesService) {
  }

  activeLoader = createEffect(() => this.actions.pipe(
    ofType(CREATE_QUEUE_ACTIONS.CREATE_NEW_QUEUE),
    map(action => activeLoader(action.type))
  ));

  createQueue = createEffect(() => this.actions.pipe(
    ofType<createNewQueueActions.CreateNewQueue>(CREATE_QUEUE_ACTIONS.CREATE_NEW_QUEUE),
    mergeMap((action) => this.queuesApiService.queuesCreate(action.payload)
      .pipe(
        mergeMap(() => [
          deactivateLoader(action.type),
          new createNewQueueActions.SetNewQueueCreationStatus(CREATION_STATUS.SUCCESS),
          addMessage(MESSAGES_SEVERITY.SUCCESS, 'Queue Created Successfully'),
        ]),
        catchError(error => [deactivateLoader(action.type), requestFailed(error), addMessage(MESSAGES_SEVERITY.ERROR, 'Queue Created Failed'), new createNewQueueActions.SetNewQueueCreationStatus(CREATION_STATUS.FAILED)])
      )
    )
  ));

  updateQueue = createEffect(() => this.actions.pipe(
    ofType<createNewQueueActions.UpdateQueue>(CREATE_QUEUE_ACTIONS.UPDATE_QUEUE),
    mergeMap((action) => this.queuesApiService.queuesUpdate(action.payload)
      .pipe(
        mergeMap(() => [
          deactivateLoader(action.type),
          new createNewQueueActions.SetNewQueueCreationStatus(CREATION_STATUS.SUCCESS),
          addMessage(MESSAGES_SEVERITY.SUCCESS, 'Queue Updated Successfully'),
        ]),
        catchError(error => [deactivateLoader(action.type), requestFailed(error), addMessage(MESSAGES_SEVERITY.ERROR, 'Queue Created Failed'), new createNewQueueActions.SetNewQueueCreationStatus(CREATION_STATUS.FAILED)])
      )
    )
  ));

  getAllQueues = createEffect(() => this.actions.pipe(
    ofType<createNewQueueActions.GetQueues>(CREATE_QUEUE_ACTIONS.GET_QUEUES),
    switchMap(() => this.queuesApiService.queuesGetAllEx({})
      .pipe(
        mergeMap(res => [new createNewQueueActions.SetQueues(res.queues)]),
        catchError(error => [requestFailed(error)])
      )
    )
  ));
}
