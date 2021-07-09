import React, { useEffect} from 'react';
import {CardsPackType, CreateParamsType, ResponsePacksType, UpdateCardsPackType} from "../../d1-main/dal/api-tabels";
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableCell from "@material-ui/core/TableCell";
import { useHistory } from "react-router-dom";
import {Paginator} from "../../d1-main/ui/components/c-2 Paginator/Paginator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../d1-main/bll/store";
import {getPackTC, SetValuesType, updateValuesAC} from "../../d1-main/bll/tablesReducer";


type TablePropsType = {
    packs: Array<CardsPackType>
    getPack: () => void
    getCards: (id: string) => void
    createPack: (newPackData: CreateParamsType) => void
    removePack: (id: string) => void
    updatePack: (updateData: UpdateCardsPackType) => void
}

const Tables = (props: TablePropsType) => {
    const history = useHistory();
    const dispatch = useDispatch()
    useEffect( () => {
        props.getPack();
    }, [])
    const packsState = useSelector<AppRootStateType, ResponsePacksType>(state => state.tablesReducer)
    const setParams = (requestParams: SetValuesType) => {
        dispatch(updateValuesAC(requestParams))
        dispatch(getPackTC())
    }

    const pageNumberRequest = (page: number) => setParams({page})

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

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
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Packs</TableCell>
                            <TableCell align="right">cardsCount</TableCell>
                            <TableCell align="right">updated</TableCell>
                            <TableCell align="right">url</TableCell>
                            <TableCell align="right"><button onClick={(e) => {props.createPack({})}}>AddPack</button></TableCell>
                            <TableCell align="right"><span>{""}</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.packs.map((row) => {
                            const removeHandler = () => {
                                props.removePack(row._id)
                            }
                            const updateHandler = () => {
                                props.updatePack({_id: row._id})
                            }
                            async function GetAsyncRedirect() {
                                props.getCards(row._id)
                            }
                            const redirectHandler = () => {
                                console.log()
                                GetAsyncRedirect().then(() => {
                                    history.push('/cards')
                                })
                            }
                            return (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">{row.name} </TableCell>
                                    <TableCell align="right">{row.cardsCount}</TableCell>
                                    <TableCell align="right">{row.updated}</TableCell>
                                    <TableCell align="right">{row.path}</TableCell>
                                    <TableCell align="right"><button onClick={removeHandler}>remove</button></TableCell>
                                    <TableCell align="right"><button onClick={updateHandler}>update</button></TableCell>
                                    <TableCell align="right"><button onClick={redirectHandler}>To cards</button></TableCell>
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
            <div style={{ height: 400, width: '100%' }}>
            </div>
        </div>
    );
};

export default Tables;
