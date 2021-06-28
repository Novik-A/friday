import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {IForgotActions} from "./b-2-redux/forgotActions";
import {ForgotAPI} from "../f-3-dal/ForgotAPI";
import {AppRootStateType} from "../../../../d1-main/bll/store";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => AppRootStateType;

export const forgot = (email: string): ThunkAction<Return, AppRootStateType, ExtraArgument, IForgotActions> =>
    async (dispatch: ThunkDispatch<AppRootStateType, ExtraArgument, IForgotActions>, getStore: IGetStore) => {


    };
