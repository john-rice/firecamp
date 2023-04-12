import { ISocketIO } from '@firecamp/types';
import { TStoreSlice } from '../store.type';

export interface IUi {
  isFetchingRequest: boolean;
  connectionPanel?: {
    headers?: number;
    params?: number;
    auth?: number;
  };
}

export interface IUiSlice {
  ui: IUi;
  initializeUi: (ui: IUi) => void;
  setIsFetchingReqFlag: (flag: boolean) => void;
}

export const createUiSlice: TStoreSlice<IUiSlice> = (
  set,
  get,
  initialUi: IUi
) => ({
  ui: initialUi,
  initializeUi: (ui: IUi) => {
    set((s) => ({ ui: { ...s.ui, ...ui } }));
  },
  setIsFetchingReqFlag: (flag: boolean) => {
    if (flag === undefined) flag = !get().ui.isFetchingRequest;
    set((s) => ({ ui: { ...s.ui, isFetchingRequest: flag } }));
  }
});
