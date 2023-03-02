import React from "react";
import "../css/LiveGamesStyle.css"

export default function LiveGameResults(props) {
    const leadColor = "green";
    const loseColor = "red";
    const equalColor = "#cbc200";
    let goalsGroupA = props.game.goalsGroupA;
    let goalsGroupB = props.game.goalsGroupB;
    return (
        <div id={"table-container"}>
            <table className={"live-games-table"}>
                <tbody id={"lives"}>
                <tr id={"live-games-tr"}>
                    <td id={"left-td"}
                        style={{color: goalsGroupA !== goalsGroupB ? (goalsGroupA > goalsGroupB ? leadColor : loseColor) : equalColor}}>{props.game.groupA.groupName}</td>
                    <td id={"right-td-g"} className={"goals"}>{goalsGroupA}</td>
                    <td id={"center-td"}>-</td>
                    <td id={"left-td-g"} className={"goals"}>{goalsGroupB}</td>
                    <td id={"right-td"}
                        style={{color: goalsGroupA !== goalsGroupB ? (goalsGroupB > goalsGroupA ? leadColor : loseColor) : equalColor}}>{props.game.groupB.groupName}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )

}