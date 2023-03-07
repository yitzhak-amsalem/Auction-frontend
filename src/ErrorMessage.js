function ErrorMessage(props) {
    const errorCode = props.errorCode;
    let message = "";
    switch (errorCode) {
        case 1000:
            message = "Username is required!";
            break;
        case 1001:
            message = "Password is required!";
            break;
        case 1002:
            message = "Password is weak!";
            break;
        case 1003:
            message = "Username already taken";
            break;
        case 1004:
            message = "Wrong username or password";
            break;
        case 1005:
            message = "Passwords Don't match";
            break;
        case 1006:
            message = "No such product.";
            break;
        case 1007:
            message = "can't reach amount less than your last offer";
            break;
        case 1008:
            message = "You overdid it! You don't have enough credit.";
            break;
        case 1009:
            message = "Auction is closed.";
            break;
    }
    return (
        <span id={"error-message"}>
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