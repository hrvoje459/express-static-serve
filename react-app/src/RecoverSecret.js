import React, { useState } from 'react';
import "./myCss.css";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


let shamir = require('shamir-nemir-krumpir');

export default function RecoverSecret() {

	const [num_of_shares, setNum_of_shares] = useState(2);
	const [secretShards, setSecretShards] = useState(["", ""]);

	const [recoveredSecret, setRecoveredSecret] = useState("Ovdje će se pojaviti rekonstruirana tajna");



	const onSubmit = (event) => {
		event.preventDefault();
		console.log("refresh prevented");
		console.log(event.target)
		console.log(event.target[2])


		let submitted_shares_set = new Set(secretShards)
		submitted_shares_set.delete("")

		console.log("Submitani set")
		console.log(submitted_shares_set)
		let submitted_shares_array = Array.from(submitted_shares_set)


		console.log("Submitani array")
		console.log(submitted_shares_array)
		let tmp = ""
		try {
			tmp = shamir.recover(submitted_shares_array)

			console.log("TMP:", tmp)

			setRecoveredSecret(tmp)
		}
		catch (err) {
			setRecoveredSecret("Netko je sigurno prčkao po shareovima")
		}

		console.log("=", tmp, "=")
		if (tmp == "") {
			setRecoveredSecret("Došlo je do greške, premalo shardova?")
		}


	};


	const addShard = (event) => {
		event.preventDefault();
		setNum_of_shares(num_of_shares + 1)
		//setSecretShards([...secretShards, num_of_shares])
		setSecretShards([...secretShards, ""])
		console.log(secretShards)
	}
	const removeShard = (event) => {
		event.preventDefault();
		if (num_of_shares > 0) {
			setNum_of_shares(num_of_shares - 1)
			setSecretShards(secretShards.slice(0, -1))
			console.log(secretShards)
		} else {
			console.log("Broj shareova ne moze biti negativan")
		}

	}

	const handleShardChange = event => {
		//console.log(secretShards)
		//console.log("index_", event.target.name)
		let name = event.target.name
		let newValue = event.target.value
		//console.log("KONKAT:")
		//console.log(secretShards.slice(0, name))
		//console.log(newValue)
		//console.log(secretShards.slice(-name))
		//console.log(secretShards.slice(0, name - 1).concat(event.target.value).concat(secretShards.slice(name, secretShards.length)))
		if (name == 0) {
			//console.log("PROMJENA PRVOG new value je", newValue)
			//console.log(secretShards.slice(1))
			//console.log("štajeovo", [newValue].concat(secretShards.slice(1)))
			console.log("Uhvatios sam te mišu 1")
			setSecretShards([newValue].concat(secretShards.slice(1)))
			return;
		}
		console.log("SHARD LENGTH", secretShards.length)
		if (name == secretShards.length - 1) {
			//console.log("PROMJENA ZADNJEG new value je", newValue)
			//console.log("NOVI SECRET SHARDS:", secretShards.slice(0, -1).concat(newValue))
			console.log("Uhvatios sam te mišu 2")
			setSecretShards(secretShards.slice(0, -1).concat(newValue))
			return;
		}

		console.log("Uhvatios sam te mišu 3")
		console.log("Name je", name)
		console.log("Name je + 1 ", parseInt(name) + 1)
		console.log("========")

		console.log(secretShards)
		console.log(secretShards.slice(0, name))
		console.log(newValue)
		console.log(secretShards.slice(parseInt(name) + 1))
		console.log("========")
		setSecretShards(secretShards.slice(0, name).concat(newValue).concat(secretShards.slice(parseInt(name) + 1)));


	};
	/*
		const shardList = secretShards.map((number) =>
			<div>
				<input name={number.toString()} value={secretShards[number]}
					onChange={handleShardChange} type="text" />
				<br />
			</div>
	
	
		);*/


	return (
		<div className='recover_secret'>
			<form onSubmit={onSubmit}>

				<Button onClick={addShard} variant="light" className='moj_gumb'>Add share</Button>
				<Button onClick={removeShard} variant="light" className='moj_gumb'>Remove share</Button>


				<br />
				<h4>Shares: {num_of_shares}</h4>


				<div className='stack_vertically'>
					{secretShards.map((shard, index) =>
						<div className='input_holder'>
							<label for="share">Share {index + 1}:</label>
							<input name={index.toString()} defaultValue={"Insert"} value={shard}
								onChange={handleShardChange} type="text" />
							<br />
						</div>


					)}</div>


				<Button variant="light" type="submit" className='moj_gumb'>Submit</Button>

			</form>

			<Card>
				<Card.Body>{recoveredSecret}</Card.Body>
			</Card>


		</div>
	)
}
