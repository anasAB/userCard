import Button from 'react-bootstrap/Button';


export interface IButtons {
    isGenerated: boolean
    isReadOnly: boolean
    formValidation: boolean
    generateUser: () => void
    createUser: () => void
    cancelEidtingHandler: () => void
    setIsReadOnly: (status:boolean) => void
}


const Buttons = (props: IButtons) => {
    const { isGenerated, isReadOnly, formValidation, generateUser, createUser, cancelEidtingHandler, setIsReadOnly } = props
    
    const changeEditorStatusTHandler = () =>{ setIsReadOnly(false) }

    return (
        !isGenerated ?
            <Button className="btn btn-primary" onClick={generateUser}>Generate User</Button>
            :
            isReadOnly ?
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Button className="btn btn-primary" onClick={changeEditorStatusTHandler}>Edit</Button>
                    </div>
                    <div className="form-group col-md-6">
                        <Button className="btn btn-primary" onClick={createUser}>Create User</Button>
                    </div>
                </div>
                :
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Button className="btn btn-primary" onClick={cancelEidtingHandler}>Cancel</Button>
                    </div>
                    <div className="form-group col-md-6">
                        <Button type="submit" disabled={!formValidation}>Save</Button>
                    </div>
                </div>
    )
}

export default Buttons