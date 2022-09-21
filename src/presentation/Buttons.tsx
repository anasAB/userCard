import Button from 'react-bootstrap/Button';


export interface IButtons {
    isGenerated: boolean
    isReadOnly: boolean
    formValidation: boolean
    generateUser: () => void
    createUser: () => void
    cancelEidtingHandler: () => void
    setIsReadOnly: (status: boolean) => void
}


const Buttons = (props: IButtons) => {
    const { isGenerated, formValidation, isReadOnly, generateUser, createUser, cancelEidtingHandler, setIsReadOnly } = props

    const changeEditorStatusTHandler = () => { setIsReadOnly(false) }

    return (
        !isGenerated ?
            <div className="row">
                <Button onClick={generateUser}>User generieren</Button>
            </div>
            :
            isReadOnly ?
                <div className='row'>
                        <Button className='active grid-6-12'  onClick={changeEditorStatusTHandler}>Bearbeiten</Button>
                        <Button className='active grid-6-12' onClick={createUser}>User anlegen</Button>
                </div>
                :
                <div className='row' >
                        <Button className="active outline grid-6-12" onClick={cancelEidtingHandler}>Abbrechen</Button>
                        <Button className={`${formValidation ? 'active' : 'inactive'} outline grid-6-12`} type="submit" disabled={!formValidation} >Speichen</Button>
                </div>
    )
}

export default Buttons