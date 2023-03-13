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
        case 1010:
            message = "Your without admin access";
            break;
        case 1011:
            message = "Passwords Don't match for admin";
            break;
        case 1012:
            message = "Amount lower than minimum price.";
            break;
        case 1013:
            message = "Your not owner of this auction";
            break;
        case 1014:
            message = "Auction already closed";
            break;
        case 1015:
            message = "Can't close this auction, Less than 3 offers";
            break;
        case 1016:
            message = "Can't resolve negative price";
            break;
        default:
            message = "null error"
            break;
    }
    return (
        <span className={"error-message"}>
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