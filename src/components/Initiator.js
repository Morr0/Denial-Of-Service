const Initiator = ({attack, attacking, setAttacking, target, setTarget}) => {
    const submit = (e) => {
        e.preventDefault();

        if (!target.includes("http://") && !target.includes("https://")){
            alert("Please provide a valid endpoint");
            return;
        }

        attack();
    };

    return (
        <div>
            <h1>Attack panel</h1>
            <form onSubmit={submit}>
                {attacking
                ? <div>
                    <button type="button" onClick={() => setAttacking(false)}>Stop attack</button>
                </div>
                : <div>
                    <input type="text" placeholder="Domain name or IP address" onChange={(e) => setTarget(e.target.value)} required />
                    <button type="submit">Attack</button>
                </div>
                }
            </form>
        </div>
    );
};

export default Initiator;