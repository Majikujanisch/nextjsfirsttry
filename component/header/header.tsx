import React from "react";
import { withRouter } from "react-router-dom";
import style from "../../styles/comps/header.module.css"

class HeaderComponent extends React.Component<any, any> {
    render() {
        return (
            <header className={style.header}>
                <p
                    onClick={() => { this.props.history.push("/identities") }}>
                    Kratos Admin-UI
                </p>
            </header>
        )
    }
}


export default withRouter(HeaderComponent);