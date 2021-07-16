import React, {ChangeEvent, useEffect, useState} from 'react';
import {
    CardsPackType,
    CreateParamsType,
    GetPackParams,
    ResponsePacksType,
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
import {AddModal} from "../../d1-main/ui/components/c6-Modals/AddModal";
import {DeleteModal} from "../../d1-main/ui/components/c6-Modals/DeleteModal";
import {EditModal} from "../../d1-main/ui/components/c6-Modals/EditModal";


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
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [packName, setPackName] = useState('')
    const [error, setError] = useState('')
    const [id, setId] = useState('')

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const addPackHandler = () => {
        if(packName.length > 0 && packName.length <= 10) {
            props.createPack({cardsPack: {name: packName}}, {user_id: props.userId})
            setShowAddModal(false)
            setPackName('')
            setError('')
        } else {setError('Name pack myst be between 1 and 10 characters')}
    }
    const close = () => {
        setShowAddModal(false)
        setPackName('')
        setError('')
    }
    const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
        if (error && packName.length <= 10) setError('')
    }
    const removeHandler = () => {
        props.removePack(id, {user_id: props.userId})
        setShowDeleteModal(false)
        setPackName('')
    }
    const updateHandler = () => {
        props.updatePack({_id: id}, {user_id: props.userId})
        setShowEditModal(false)
        setPackName('')
        setError('')
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
            <AddModal
                title={"Add new pack"}
                label={"Name pack"}
                open={showAddModal}
                close={close}
                error={error}
                value={packName}
                onChange={onChangePackName}
                onClick={addPackHandler}
            />
            <DeleteModal onClick={removeHandler}
                         title={'Delete Pack'}
                         value={`Do you really want to remove Pack Name - ${packName}?
                                                               All cards will be excluded from this course.`}
                         close={() => setShowDeleteModal(false)}
                         open={showDeleteModal}/>
            <EditModal
                title={'Name pack'}
                label={"Name pack"}
                onClick={updateHandler}
                error={error}
                value={packName}
                onChange={onChangePackName}
                close={() => setShowEditModal(false)}
                open={showEditModal}/>
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
                            <TableCell align="center"><Button onClick={() => {setShowAddModal(true)
                            setPackName('')}} variant="contained"
                                                              color="primary">Add pack</Button></TableCell>
                            <TableCell align="center"><span>{""}</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.packs.map((row) => {
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
                                        <TableCell align="center">{userId === row.user_id ? <Button onClick={() => {setShowDeleteModal(true)
                                        setPackName(row.name)
                                        setId(row._id)}} variant="contained"
                                                                          color="primary">delete</Button> : null}</TableCell>
                                        <TableCell align="center">{userId === row.user_id ? <Button onClick={() => {setShowEditModal(true)
                                            setPackName(row.name)
                                        setId(row._id)}} variant="contained"
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
                       onPageNumberClick={pageNumberRequest}
            />
            <div style={{height: 400, width: '100%'}}>
            </div>
        </div>
    );
};

export default Tables;
