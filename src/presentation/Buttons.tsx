import Button from 'react-bootstrap/Button';


export interface IButtons {
    isGenerated?: boolean
    isReadOnly?: boolean
    generateUser: () => void
    changeEditor?: () => void
    createUser?: () => void
    cancelEidtingHandler?: () => void
}


const Buttons = (props:IButtons) => {
    const {isGenerated, isReadOnly, generateUser, changeEditor, createUser, cancelEidtingHandler} = props
    return (
        !isGenerated ?
            <Button className="btn btn-primary" type="submit" onClick={generateUser}>Generate User</Button>
            :
            isReadOnly ?
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Button className="btn btn-primary" onClick={changeEditor}>Edit</Button>
                    </div>
                    <div className="form-group col-md-6">
                        <Button className="btn btn-primary" type="submit" onClick={createUser}>Create User</Button>
                    </div>
                </div>
                :
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <Button className="btn btn-primary" onClick={cancelEidtingHandler}>Cancel</Button>
                    </div>
                    <div className="form-group col-md-6">
                        <Button type="submit">Save</Button>
                    </div>
                </div>
    )
}

export default Buttons