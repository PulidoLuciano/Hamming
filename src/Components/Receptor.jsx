import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MarcarError from "./Receptor/MarcarError";
import Cuadro from "./Cuadro";

export default function Receptor(){
    
    const {binary} = useParams();

    const [p, setP] = useState(fijarP());
    const [errorsMarked, setErrorsMarked] = useState(false);
    const [receiveBinary, setReceiveBinary] = useState(binary);

    useEffect(() => {
        let expReg = new RegExp("[^01]");
        console.log(binary);
        if(expReg.test(binary)) throw new Error("No binary");
    }, [binary]);

    function fijarP(){
        let i = 0;
        let auxP = 0;
        while(binary.length > Math.pow(2, i)){
            auxP = i;
            i++
        }
        auxP++
        return auxP;
    }

    return(
        <section>
           <h1 className="cadena">Cadena original: {binary}</h1>
           { 
                (!errorsMarked) 
                ? <MarcarError binary={binary} finishMark={setErrorsMarked} setReceiveBinary={setReceiveBinary}></MarcarError>
                : <Cuadro binary={receiveBinary} p={p} type={"receptor"} original={binary}></Cuadro>
            } 
        </section>
        
    )
}