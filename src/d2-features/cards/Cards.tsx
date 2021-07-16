import React, {ChangeEvent, useState} from 'react';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableCell from "@material-ui/core/TableCell";
import {CardType, CreateCardParamsType, GetCardsParams, UpdateCardType} from "../../d1-main/dal/api-cards";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../d1-main/bll/store";
import Button from "@material-ui/core/Button";
import {SearchForCards} from "../../d1-main/ui/components/c-5 Search/SearchForCards";
import {Preloader} from "../../d1-main/ui/components/c-1 Preloader/Preloader";
import {RequestStatusType} from "../../d1-main/bll/appReducer";
import {AddModal} from '../../d1-main/ui/components/c6-Modals/AddModal';
import {DeleteModal} from "../../d1-main/ui/components/c6-Modals/DeleteModal";
import {EditModal} from "../../d1-main/ui/components/c6-Modals/EditModal";


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
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const userId = useSelector<AppRootStateType, string>(state => state.auth.userData._id)
    const packUserId = useSelector<AppRootStateType, string>(state => state.cardReducer.packUserId)
    const packId = useSelector<AppRootStateType, string>(state => state.tablesReducer.cardPacks[0]?._id)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [id, setId] = useState('')
    const [cardsPackId, setCardsPackId] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [errorQuestion, setErrorQuestion] = useState('')
    const [errorAnswer, setErrorAnswer] = useState('')
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    const addCardHandler = () => {
        if (question.length === 0 || question.length > 50) {
            setErrorQuestion('Question myst be between 1 and 50 characters')
        } else if (answer.length === 0 || answer.length > 50) {
            setErrorAnswer('Answer myst be between 1 and 50 characters')
        } else {
            props.createCard({card: {cardsPack_id: packId, question: question, answer: answer}}, {cardsPack_id: packId})
            setShowAddModal(false)
            setQuestion('')
            setAnswer('')
            setErrorQuestion('')
            setErrorAnswer('')
        }
    }
    const close = () => {
        setShowAddModal(false)
        setQuestion('')
        setAnswer('')
        setErrorQuestion('')
        setErrorAnswer('')
    }
    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
        if (errorQuestion && question.length <= 50) setErrorQuestion('')
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
        if (errorAnswer && answer.length <= 50) setErrorAnswer('')
    }
    const removeHandler = () => {
        props.removeCard(id, cardsPackId)
        setShowDeleteModal(false)
        setQuestion('')
        setAnswer('')
    }
    const updateHandler = () => {
        props.updateCard({card: {_id: id}}, cardsPackId)
        setShowEditModal(false)
        setQuestion('')
        setAnswer('')
        setErrorQuestion('')
        setErrorAnswer('')
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
                title={"Add new card"}
                label={"Question"}
                labelTwo={"Answer"}
                open={showAddModal}
                close={close}
                error={errorQuestion}
                errorTwo={errorAnswer}
                value={question}
                onChange={onChangeQuestion}
                valueTwo={answer}
                onChangeTwo={onChangeAnswer}
                onClick={addCardHandler}
            />
            <DeleteModal onClick={removeHandler}
                         title={'Delete Card'}
                         value={`Do you really want to remove question - ${question}?`}
                         close={() => setShowDeleteModal(false)}
                         open={showDeleteModal}/>
            <EditModal
                title={'Card info'}
                label={"Question"}
                labelTwo={"Answer"}
                onClick={updateHandler}
                error={errorQuestion}
                errorTwo={errorAnswer}
                value={question}
                onChange={onChangeQuestion}
                valueTwo={answer}
                onChangeTwo={onChangeAnswer}
                close={() => setShowEditModal(false)}
                open={showEditModal}/>
            <SearchForCards searchCallback={props.getCards} disabled={false}/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>question</TableCell>
                            <TableCell align="center">answer</TableCell>
                            <TableCell align="center">Grade</TableCell>
                            <TableCell align="center">updated</TableCell>
                            <TableCell align="center">{userId === packUserId ?
                                <Button onClick={() => {
                                    setShowAddModal(true)
                                    setQuestion('')
                                    setAnswer('')
                                }} variant="contained" color="primary">Add
                                    card</Button> : null}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.cards.map((row) => {
                                return (
                                        <TableRow key={row._id}>
                                            <TableCell component="th" scope="row">{row.question} </TableCell>
                                            <TableCell align="center">{row.answer}</TableCell>
                                            <TableCell align="center">{row.grade}</TableCell>
                                            <TableCell align="center">{row.updated}</TableCell>
                                            <TableCell align="center">{userId === row.user_id ?
                                                <Button onClick={() => {
                                                    setShowDeleteModal(true)
                                                    setQuestion(row.question)
                                                    setId(row._id)
                                                    setCardsPackId(row.cardsPack_id)
                                                }} variant="contained"
                                                        color="primary">delete</Button> : null}
                                            </TableCell>
                                            <TableCell align="center">{userId === row.user_id ?
                                                <Button onClick={() => {
                                                    setShowEditModal(true)
                                                    setAnswer(row.answer)
                                                    setQuestion(row.question)
                                                    setId(row._id)
                                                    setCardsPackId(row.cardsPack_id)
                                                }} variant="contained"
                                                        color="primary">edit</Button> : null}
                                            </TableCell>
                                        </TableRow>
                                )
                            }
                        )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{height: 400, width: '100%'}}>
            </div>


        </div>
    );
};

export default Cards;
