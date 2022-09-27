import APIHandler from "../pages/api/handler"

import layout from "../styles/APIButton.module.css"
function APILoginButton(){
    return (
        <div className={layout.container}>
			<main className={layout.main}>
				<button onClick={callAPILoginPin} className={layout.button}>Make API help Call</button>
			</main>
		</div>
    )
}
const callAPILoginPin = async () => {
    try{
        const res = await fetch('');
        const data = await res.json();
        console.log(data);
        console.log("APILOGIN")
    } catch (err){
        console.log(err);
        console.log("APILOGIN")
    }

};
export default APILoginButton