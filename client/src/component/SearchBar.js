import React, {useEffect, useState} from 'react'
import TextField from "@material-ui/core/TextField";
import {makeStyles} from '@material-ui/core/styles';


const WebFont = require('webfontloader');


WebFont.load({
    google: {
        families: ['Do Hyeon', 'Sansita Swashed']
    }
});


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: "0px auto",
            width: '25ch',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'block',
            FontFamily: 'Do Hyeon'
        },

    }
}))

function SearchBar() {
    const classes = useStyles();


    return (
        <>

            <form className={classes.root} action="#">

                <TextField required id="standard-required" label="검색"
                           placeholder="타이틀 검색"
                           type='search'/>

            </form>

        </>

    )


}


export default SearchBar