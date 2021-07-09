import React, { useEffect} from 'react';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableCell from "@material-ui/core/TableCell";
import {CardType, CreateCardParamsType, GetCardsParams, UpdateCardType} from "../../d1-main/dal/api-cards";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../d1-main/bll/store";
import Button from "@material-ui/core/Button";


type CardsPropsType = {
    cards: Array<CardType>
    getCards: (id: string) => void
    createCard: (createData: CreateCardParamsType, getParams: GetCardsParams) => void
    removeCard: (id: string, cardsPack_id: string) => void
    updateCard: (updateData: UpdateCardType, cardsPack_id: string) => void
    packId?: string
}

const Cards = (props: CardsPropsType) => {


    // useEffect( () => {
    //     props.getCards("5eb6a2f72f849402d46c6ac4");
    // }, [])

    const packId = useSelector<AppRootStateType, string>(state => state.tablesReducer.cardPacks[0]?._id)
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const addCardHandler = () => {
        props.createCard({card: {cardsPack_id: packId, question: "newQuestion", answer: 'NewAnswer'}}, {cardsPack_id: packId})
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
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>question</TableCell>
                            <TableCell align="center">answer</TableCell>
                            <TableCell align="center">Grade</TableCell>
                            <TableCell align="center">updated</TableCell>
                            <TableCell align="center"><Button onClick={addCardHandler} variant="contained" color="primary">Add card</Button></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.cards.map((row) => {
                            const removeHandler = () => {
                                props.removeCard(row._id, row.cardsPack_id)
                            }
                            const updateHandler = () => {
                                props.updateCard({card: {_id: row._id}}, row.cardsPack_id)
                            }
                            return (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">{row.question} </TableCell>
                                    <TableCell align="center">{row.answer}</TableCell>
                                    <TableCell align="center">{row.grade}</TableCell>
                                    <TableCell align="center">{row.updated}</TableCell>
                                    <TableCell align="center"><Button onClick={removeHandler} variant="contained" color="primary">remove</Button></TableCell>
                                    <TableCell align="center"><Button onClick={updateHandler} variant="contained" color="primary">update</Button></TableCell>
                                </TableRow>
                            )
                        }
                        )
                       }
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{ height: 400, width: '100%' }}>
            </div>


        </div>
    );
};

export default Cards;
