export const findAllUsers = async signal => {
	let users;
	try {
		const res = await fetch('http://localhost:4000/users', {
			signal
		});

		if (res.ok) users = await res.json();

		return {
			users,
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = (err.message = 'AbortError');
		return {
			users: undefined,
			error: !isAborted,
			aborted: isAborted
		};
	}
};

export const createUser = async user => {
	try {
		const res = await fetch('http://localhost:4000/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		return res.ok;
	} catch {
		return false;
	}
};

export const findUserByUsername = async (username, signal) => {
	let users;
	try {
		const res = await fetch(
			`http://localhost:4000/users?username=${username}`,
			{
				signal
			}
		);

		if (res.ok) users = await res.json();

		return {
			user: users[0],
			error: !res.ok,
			aborted: false
		};
	} catch (err) {
		const isAborted = (err.message = 'AbortError');
		return {
			user: undefined,
			error: !isAborted,
			aborted: isAborted
		};
	}
};
