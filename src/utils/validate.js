export function validateLogin(login) {
	const error = {
		value: false
	}
	const cyrillicPattern = /^[\u0400-\u04FF]+$/
	
	if(login.length < 3) {
		error.value = true
		error.text = 'Login must be at least 3 characters'
	}

	if(cyrillicPattern.test(login)) {
		error.value = true
		error.text = 'Login must not contain non-Latin characters'
	}

	return error
}

export function validatePassword(password) {
	const error = {
		value: false
	}

	if(password.length < 8) {
		error.value = true
		error.text = 'Password must be at least 8 characters'
	}

	return error
}

export function validatePasswords(password1, password2) {
	const error = {
		value: false
	}

	if(password1 !== password2) {
		error.value = true
		error.text = 'Passwords mismatch'
	}

	return error
}

export function validateAnswers(answer) {
	const error = {
		value: false
	}

	if(answer.length < 2) {
		error.value = true
		error.text = 'Answer must be at least 2 characters'
	}

	return error
}