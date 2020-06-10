import React, {Fragment} from "react";
import "../../styles/ui-button.css";

export const UiButton = (props) => {
    const {
        type,
        text,
        disabled,
        className,
        buttonTextClassName,
        onClick,
        leftIcon,
        rightIcon,
        primary,
        withIcon,
        rounded,
        children,
        style = {},
    } = props;


    const classNames = ['ui-button', className];
    const buttonTextClassNames = ['ui-button__text', buttonTextClassName];
    if (primary) classNames.push('ui-button--primary');
    if (rounded) classNames.push('ui-button--rounded');

    return (
        <button
            type={type || 'button'}
            className={classNames.join(' ')}
            style={style}
            disabled={disabled}
            onClick={onClick}>
            {children ? children : (
                <Fragment>
                    {leftIcon && leftIcon}
                    {text && (<span className={buttonTextClassNames.join(' ')}>{text}</span>)}
                    {rightIcon && rightIcon}
                    {withIcon && withIcon}
                </Fragment>
            )}
        </button>
    );
};

export default UiButton;