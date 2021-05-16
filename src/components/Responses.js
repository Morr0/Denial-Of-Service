const Responses = ({target, requests, responsePairs, httpError}) => {
    if (httpError) return <h2>The endpoint above was either blocked by CORS or non-existent</h2>;

    if (responsePairs.length === 0) return null;

    return (
        <div>
            <h1>Responses of {requests} requests at: {target}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Response</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                {
                    responsePairs.map((responsePair) => {
                        const key = responsePair[0];
                        const value = responsePair[1];

                        return (
                            <tr key={key}>
                                <th>{key}</th>
                                <th>{value}</th>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default Responses;