import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";

type Return = void;
type ExtraArgument = {};
type IForgotActions = { type: string };
type IGetStore = () => AppRootStateType;

export const forgot = (email: string): ThunkAction<Return, AppRootStateType, ExtraArgument, IForgotActions> =>
    async (dispatch: ThunkDispatch<AppRootStateType, ExtraArgument, IForgotActions>, getStore: IGetStore) => {


    };
