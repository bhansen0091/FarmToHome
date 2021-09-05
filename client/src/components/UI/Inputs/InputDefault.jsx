import { Form, Col } from 'react-bootstrap';


/**
 * @author
 * @function InputDefault
 */

const InputDefault = (props) => {
    return (
        <>
            <Form.Label style={{marginLeft: '2px'}}>{props.label}</Form.Label>
            <Form.Control
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </>
    );
};

export default InputDefault;


//  controlId: formBasic{field-type-here} / formGridText{field-type-here}