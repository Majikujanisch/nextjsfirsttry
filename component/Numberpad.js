import styles from '../styles/Numberpad.module.css'
import { useCallback, useState } from "react";

function numberpad() {
    const [outputstring, setOutputstring] = useState("");
    function handleclicks(inputvalue){
        if (inputvalue == 10){
            setOutputstring(outputstring.slice(0,-1))
        }
        else{
            setOutputstring(outputstring + inputvalue)
        }
    }
    //const handleclicks = useCallback(() => setOutputstring(outputstring + inputvalue), []);
    //const [inputvalue, setInputValue] = useState(0)
    return (<div>
        <div className="outputfield">{outputstring}</div>
        <div className={styles.inputfield}>
            <button className={styles.normbut} onClick={()=>handleclicks(7)}>7</button>
            <button className={styles.normbut} onClick={()=>handleclicks(8)}>8</button>
            <button className={styles.normbut} onClick={()=>handleclicks(9)}>9</button> <br></br>
            <button className={styles.normbut} onClick={()=>handleclicks(4)}>4</button>
            <button className={styles.normbut} onClick={()=>handleclicks(5)}>5</button>
            <button className={styles.normbut} onClick={()=>handleclicks(6)}>6</button><br></br>
            <button className={styles.normbut} onClick={()=>handleclicks(1)}>1</button>
            <button className={styles.normbut} onClick={()=>handleclicks(2)}>2</button>
            <button className={styles.normbut} onClick={()=>handleclicks(3)}>3</button>

        </div>
        <div className={styles.inputfield}>
            <button className={styles.normbut} onClick={()=>handleclicks(0)}>0</button>
            <button className={styles.delbut} onClick={()=>handleclicks(10)}>Del</button>
        
        </div>
    </div>)
    
};
export default numberpad;