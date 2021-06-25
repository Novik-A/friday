import React from "react";
import s from "./Error404.module.css";

export const Error404 = () => {
    return (
        <div className={s.body}>
            <div className={s.c}>
                <div className={s._404}>404</div>
                <hr className={s.hr}/>
                <div className={s._1}>THE PAGE</div>
                <div className={s._2}>WAS NOT FOUND</div>
                <a className={s.btn} href='#'>BACK TO HOME</a>
            </div>
        </div>
    );
}
