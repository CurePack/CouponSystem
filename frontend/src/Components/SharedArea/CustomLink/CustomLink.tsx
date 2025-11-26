import { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { CouponModel } from "../../../Models/CouponModel";
import store from "../../../Redux/store";
import "./CustomLink.css";

interface CustomLinkProps{
    to:string;
    children:any;
}

function CustomLink(props: CustomLinkProps): JSX.Element {
    const resolved = useResolvedPath(props.to);
    const match = useMatch({path: resolved.pathname, end: true});

    return (
        <Link className={match ? "CustomLink active" : "CustomLink"} to={props.to}>
            {props.children}
        </Link>
    );
}

export default CustomLink;
