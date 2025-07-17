import * as z from 'zod';

const validateUser = z.object({
    firstName: z.string().max(25, "first name can have only 25 characters"),
    lastName: z.string().max(25, 'last name can have only 25 characters'),
    email: z.email('invalid email'),
    password: z.string().min(8, 'password must contain atleast 8 characters').max(25, 'password must contain at most 25 characters'),
})

export { validateUser };