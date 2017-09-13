const validation = {
    required: value => value ? undefined : 'Required',
    email: value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined,
    maxChars: (value) => !(value.length >= 20) ? undefined : 'Must be 20 characters or less',
    minChars: (value) => !(value.length <= 6) ? undefined : 'Password  must be at least 6 characters.',
  }
  
  export default validation