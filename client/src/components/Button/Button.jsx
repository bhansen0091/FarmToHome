

import './Button.css';

const STYLES = [
    'btn--primary',
    'btn--outline',
    'btn--orange',
    'btn-disabled'
]

const SIZES = [
    'btn--med',
    'btn--sm',
    'btn--large'
]

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonSize : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return(
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick = {onClick} type={type}>
            {children}
        </button>
    )
}