import React, { useEffect} from 'react';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableCell from "@material-ui/core/TableCell";
import {CardType, CreateCardParamsType, UpdateCardType} from "../../d1-main/dal/api-cards";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../d1-main/bll/store";


type CardsPropsType = {
    cards: Array<CardType>
    getCards: (id: string) => void
    createCard: (createData: CreateCardParamsType) => void
    removeCard: (id: string, cardsPack_id: string) => void
    updateCard: (updateData: UpdateCardType, cardsPack_id: string) => void
}

const Cards = (props: CardsPropsType) => {


    // useEffect( () => {
    //     props.getCards("5eb6a2f72f849402d46c6ac4");
    // }, [])

    const packId = useSelector<AppRootStateType, string>(state => state.cardReducer.cards[0]?.cardsPack_id)

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const addCardHandler = () => {
        props.createCard({card: {cardsPack_id: packId}})
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
                            <TableCell align="right">answer</TableCell>
                            <TableCell align="right">Grade</TableCell>
                            <TableCell align="right">updated</TableCell>
                            <TableCell align="right">url</TableCell>
                            <TableCell align="right"><button onClick={addCardHandler}>Add Card</button> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.cards.map((row) => {
                            const removeHandler = () => {
                                props.removeCard(row._id, row.cardsPack_id)
                            }
                            const updateHandler = () => {
                                props.updateCard({_id: row._id}, row.cardsPack_id)
                            }
                            return (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">{row.question} </TableCell>
                                    <TableCell align="right">{row.answer}</TableCell>
                                    <TableCell align="right">{row.grade}</TableCell>
                                    <TableCell align="right">{row.updated}</TableCell>
                                    <TableCell align="right"><button onClick={removeHandler}>remove</button></TableCell>
                                    <TableCell align="right"><button onClick={updateHandler}>update</button></TableCell>
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
