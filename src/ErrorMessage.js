function ErrorMessage(props) {
    const errorCode = props.errorCode;
    let message = "";
    switch (errorCode) {
        case 1006:
            message = "No such product.";
            break;
        case 1007:
            message = "can't reach amount less than your last offer";
            break;
        case 1008:
            message = "You overdid it! You don't have enough credit.";
            break;
    }
    return (
        <span style={{color: "red"}}>
            {
                props.lineBreak ?
                    <div>
                        {message}
                    </div>
                    :
                    <span>
                        {message}
                    </span>
            }
        </span>
    )
}

export default ErrorMessage;