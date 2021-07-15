import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    CardsPackType,
    CreateParamsType,
    ResponsePacksType,
    GetPackParams,
    UpdateCardsPackType
} from "../../d1-main/dal/api-tabels";
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableCell from "@material-ui/core/TableCell";
import {useHistory} from "react-router-dom";
import {Paginator} from "../../d1-main/ui/components/c-2 Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../d1-main/bll/store";
import {getPackTC, SetValuesType, updateValuesAC} from "../../d1-main/bll/tablesReducer";
import Button from "@material-ui/core/Button";
import {Search} from "../../d1-main/ui/components/c-5 Search/Search";
import {Preloader} from "../../d1-main/ui/components/c-1 Preloader/Preloader";
import {RequestStatusType} from "../../d1-main/bll/appReducer";
import MultiRangeSlider from "../../d1-main/ui/components/c-3 MultiRange/MultiRangeSlider";
import {AddPackModal} from "../../d1-main/ui/components/c6-Modals/AddPackModal";


type TablePropsType = {
    packs: Array<CardsPackType>
    getPack: (getPackParams: GetPackParams) => void
    getCards: (id: string) => void
    createPack: (newPackData: CreateParamsType, getPackParams: GetPackParams) => void
    removePack: (id: string, getPackParams: GetPackParams) => void
    updatePack: (updateData: UpdateCardsPackType, getPackParams: GetPackParams) => void
    userId?: string
}

const Tables = (props: TablePropsType) => {
    const history = useHistory();
    const dispatch = useDispatch()
    useEffect(() => {
        props.getPack({user_id: props.userId});
    }, [])
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const userId = useSelector<AppRootStateType, string>(state => state.auth.userData._id)
    const packsState = useSelector<AppRootStateType, ResponsePacksType>(state => state.tablesReducer)
    const setParams = (requestParams: SetValuesType) => {
        dispatch(updateValuesAC(requestParams))
        dispatch(getPackTC())
    }

    const pageNumberRequest = (page: number) => setParams({page})
    const [showModal, setShowModal] = useState(false)
    const [packName, setPackName] = useState('')
    const [error, setError] = useState('')

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const addPackHandler = () => {
        if(packName.length > 0 && packName.length <= 10) {
            props.createPack({cardsPack: {name: packName}}, {user_id: props.userId})
            setShowModal(false)
            setPackName('')
            setError('')
        } else {setError('Name pack myst be between 1 and 10 characters')}
    }
    const close = () => {
        setShowModal(false)
        setPackName('')
        setError('')
    }
    const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
        if (error && packName.length <= 10) setError('')
    }
    const classes = useStyles();
    return (
        <div
            style={{
                margin: '0 10px',
// minHeight: '80vh',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {status === 'loading' && <Preloader left={'40%'} top={'40%'} size={'200px'}/>}
            <AddPackModal
                open={showModal}
                close={close}
                error={error}
                value={packName}
                onChange={onChangePackName}
                onClick={addPackHandler}
            />
            <Search searchCallback={props.getPack} disabled={false}/>
            <MultiRangeSlider
                searchCallback={props.getPack}
                min={0}
                max={103}
                onChange={({min, max}: { min: number; max: number }) =>
                    (`min = ${min}, max = ${max}`)
                }
            />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Packs</TableCell>
                            <TableCell align="center">cardsCount</TableCell>
                            <TableCell align="center">updated</TableCell>
                            <TableCell align="center"><Button onClick={() => setShowModal(true)} variant="contained"
                                                              color="primary">Add pack</Button></TableCell>
                            <TableCell align="center"><span>{""}</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.packs.map((row) => {
                                const removeHandler = () => {
                                    props.removePack(row._id, {user_id: props.userId})
                                }
                                const updateHandler = () => {
                                    props.updatePack({_id: row._id}, {user_id: props.userId})
                                }

                                async function GetAsyncRedirect() {
                                    props.getCards(row._id)
                                }

                                const redirectHandler = () => {
                                    GetAsyncRedirect().then(() => {
                                        history.push('/cards/' + row._id)
                                    })
                                }
                                return (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">{row.name} </TableCell>
                                        <TableCell align="center">{row.cardsCount}</TableCell>
                                        <TableCell align="center">{row.updated}</TableCell>
                                        <TableCell align="center">{userId === row.user_id ? <Button onClick={removeHandler} variant="contained"
                                                                          color="primary">delete</Button> : null}</TableCell>
                                        <TableCell align="center">{userId === row.user_id ? <Button onClick={updateHandler} variant="contained"
                                                                          color="primary">edit</Button> : null}</TableCell>
                                        <TableCell align="center"><Button onClick={redirectHandler} variant="contained"
                                                                          color="primary">To cards</Button></TableCell>
                                    </TableRow>
                                )
                            }
                        )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Paginator totalItemsCount={packsState.cardPacksTotalCount}
                       pageSize={packsState.pageCount}
                       currentPage={packsState.page}
                // disabled={}
                       onPageNumberClick={pageNumberRequest}
            />
            <div style={{height: 400, width: '100%'}}>
            </div>
        </div>
    );
};

export default Tables;
