import { useRouteError } from "react-router-dom";
const Error=()=>{
    const err=useRouteError();
    console.log(err);
    return(
        <div>
            <h1>OOPS!!!</h1>
            <h2>You got some error</h2>
            <h3>{err.status+": "+err.statusText}</h3>
            <h4>{err.error.message}</h4>
        </div>
    )
}
export default Error;