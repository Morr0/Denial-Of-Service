import { useCallback, useEffect, useState } from "react";

import Initiator from "./components/Initiator";
import Responses from "./components/Responses";

function App() {
	const [attacks, setAttacks] = useState(new Map());
	const [count, setCount] = useState(0);
	const [target, setTarget] = useState("");
	const [attacking, setAttacking] = useState(false);
	const [httpError, setHttpError] = useState(false);

	const addFunc = (statusCode) => {
		setAttacks((old) => {
			const newAttacks = new Map(old.entries());
			let value = old.get(statusCode) ?? 0;
			value++;
			newAttacks.set(statusCode, value);
			return newAttacks;
		});
		setCount((old) => old + 1);
	};
	const add = useCallback(addFunc, []);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!attacking){
				clearInterval(interval);
				return;
			}

			fetch(target).then((res) => add(res.status.toString()));
		}, 250);

		return () => clearInterval(interval);
	}, [attacking, target, add]);

	const attack = () => {
		console.log(target);

		if (!target){
			setAttacking(false);
			setTarget("");
			return;
		}

		console.log("Testing first hit")
		fetch(target)
		.then((res) => {
			setAttacking(true);
			setHttpError(false);

			add(res.status.toString());
			console.log("Successfully hit first time, starting bombardment");
		})
		.catch((e) => {
			if (e instanceof TypeError){
				setHttpError(true);
			}

			setAttacking(false);
			console.log("Unsuccessfully hit the first endpoint, abolishing procedure");
		});
	};

	return (
		<div className="App">
			<Initiator attack={attack} setTarget={setTarget} attacking={attacking} setAttacking={setAttacking} />
			<hr/>
			<Responses target={target} requests={count} responsePairs={Array.from(attacks)} httpError={httpError} />
		</div>
	);
}

export default App;