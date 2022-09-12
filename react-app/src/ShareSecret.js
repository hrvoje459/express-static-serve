import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

let shamir = require('shamir-nemir-krumpir');


/*function mySubmit() {
	setSecretShards(shamir.share("#moja tajna", 3, 5))
}
*/
export default function ShareSecret() {
	const [secret, setSecret] = useState("");
	const [threshold, setThreshold] = useState(3);
	const [num_of_shares, setNum_of_shares] = useState(5);
	const [secretShards, setSecretShards] = useState([]);

	const onSubmit = (e) => {
		e.preventDefault();
		//console.log("refresh prevented");
		//console.log(secret)
		//console.log(threshold)
		//console.log(num_of_shares)
		//console.log(shamir.share(secret, threshold, num_of_shares))
		setSecretShards(shamir.share(secret, threshold, num_of_shares))
	};

	const handleSecretChange = event => {
		event.preventDefault();
		setSecret(event.target.value);
	};
	const handleThresholdChange = event => {
		event.preventDefault();
		console.log(event.target.value)
		setThreshold(parseInt(event.target.value));
	};
	const handleNumOfSharesChange = event => {
		event.preventDefault();
		console.log(event.target.value)
		setNum_of_shares(parseInt(event.target.value));
	};

	const secretShardsUl = secretShards.map((shard) =>
		<li>{shard}</li>
	);

	return (
		<div className=''>
			<form onSubmit={onSubmit}>

				<label for="Secret">Secret:</label><br />
				<input
					className='secret_input'
					type="text"
					id="secret"
					name="secret"
					onChange={handleSecretChange}
					value={secret}
				/>
				<br />

				<label for="threshold">Threshold:</label><br />

				<input
					type="text"
					id="threshold"
					name="threshold"
					onChange={handleThresholdChange}
					value={threshold}
				/>
				<br />


				<label for="num_of_shares">Total number of shares:</label><br />

				<input
					type="text"
					id="num_of_shares"
					name="num_of_shares"
					onChange={handleNumOfSharesChange}
					value={num_of_shares}
				/>
				<br />


				<Button variant="light" type="submit" className='moj_gumb'>Submit</Button>
			</form>
			<br />

			<Card className='overflow'>
				<Card.Body >
					{secretShards != "" ? secretShardsUl : "Submit secret for sharing"}</Card.Body>
			</Card>

		</div>
	)
}
