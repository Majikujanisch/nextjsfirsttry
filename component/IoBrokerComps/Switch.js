

export default function Switch({ room, text }) {
    let status = false
    const switching = () => {
        try {
            status = getstatus(room)
            console.log(getstatus(room) + "              GETSTATUS")
            console.log(status + "         STATUS")
            //setstatus(status)
        }
        catch (err) {
        }
    };
    const getstatus = async (room) => {
        try {
            const res = await fetch(
                `http://127.0.0.1:8087/getPlainValue/0_userdata.0.Raum_` + room + `_Lampe`
            );
            const data = await res.json();
            console.log(data + "          DATA")
            setstatus(data);
        } catch (err) {
            console.log(err);
        }
    };
    const setstatus = async (status) => {
        try {
            try {
                const res = await fetch(
                    `http://127.0.0.1:8087/set/0_userdata.0.Raum_2_Lampe?value=` + !status + `&prettyPrint`
                );
                const data = await res.json();
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        }
        catch (err) {
        }
    };
    return (
        <div>
            <button
                onClick={switching}>{text}
            </button>
        </div>
    )
}
