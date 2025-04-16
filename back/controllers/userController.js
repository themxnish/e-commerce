import supabase from '../config/supabaseClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import 'dotenv/config';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await supabase
            .from('users')
            .insert([{ name, email, password: hashedPassword }])
            .select();

        if (error || !data || data.length === 0) {
            return res.json({ success: false, message: error ? error.message : "User creation failed" });
        }

        const token = createToken(data[0].id);
        res.json({ success: true, message: 'User registered successfully', token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data: user, error: userError } = await supabase
            .from('users')
            .select('id, password')
            .eq('email', email)
            .single();

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user.id);
            return res.json({ success: true, message: 'Login successful', token });
        } else {
            return res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


const admin = (req, res) => {
    try {
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, message: 'Login successful', token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const { data: user, error } = await supabase.from('users').select('id, name, email, address, phone').eq('id', userId).single();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, message: 'User fetched successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const updateUser = async (req, res) => {
    try{
        const userId = req.user?.id;
        const { name, email, address, phone } = req.body;

        const { data, error } = await supabase.from('users').update({ name, email, address, phone }).eq('id', userId).select().single();
        if (error) throw error;

        res.json({ success: true, message: 'User updated successfully', user: data });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser, admin, getCurrentUser, updateUser };
