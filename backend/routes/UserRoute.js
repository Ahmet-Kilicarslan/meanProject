import express from 'express';
import userDao from '../DAOs/UserDAO.js';
import { requireAuth,requireClient,requireAdmin}from '../middleware/authenticate.js';
import hash from "../Utilities/hash.js";
import User from "../models/User.js";

const router=express.Router();

//register endpoint
router.post("/register", async (req, res) => {
    try{
        const {username,password,role,email }=req.body;

        if(!username || !password){
            return res.status(400).send({error:"Username and password are required"});
        }

        if(password.length<6){
            return res.status(400).send({error:"Password must be at least 6 characters"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).send({error:"invalid email address"});
        }
        const hashedPassword= await hash.hashPassword(password);

        const user=new User(null,username,hashedPassword,'user',email);

        const newUser = await userDao.addUser(user);
        if (!newUser) {
            return res.status(409).json({
                error: 'User already exists',
                message: 'Username or email is already taken'
            });
        }
        console.log('✅ User registered successfully:', newUser.id);

        // Return safe user data (no password)
        res.status(201).json({
            message: 'User registered successfully',
            user: newUser.toSafeObject()
        });


    }catch(error){
        console.error('❌ Registration error:', error);
        res.status(500).json({
            error: 'Registration failed',
            message: error.message
        });
    }
});

//login endpoint ,we will create session here
router.post("/login", async (req, res) => {

try{
    const {username,password}=req.body;
    if(!username || !password){
        return res.status(400).send({error:"Username and password are required"});
    }
    const user=await userDao.getUserByUsernameOrEmail(username);
    if(!user){
        return res.status(404).send({error:"invalid username "});
    }

    const checkPassword=await hash.comparePassword(password, user.password);
    if(!checkPassword){
        return res.status(404).send({error:"invalid password"});
    }
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.email = user.email;
    req.session.role = user.role;

    console.log('✅ Session created:', {
        userId: req.session.userId,
        username: req.session.username,
        role: req.session.role
    });

    // Save session explicitly
    req.session.save((err) => {
        if (err) {
            console.error('❌ Session save error:', err);
            return res.status(500).json({ error: 'Session creation failed' });
        }

        console.log('✅ Login successful for:', username);

        res.json({
            message: 'Login successful',
            user: user.toSafeObject()
        });
    });

}catch(error){
    console.error('❌ Login error:', error);
    res.status(500).json({
        error: '  Login failed',
        message: error.message
    });
}




});
//logout endpoint
router.post("/logout", async (req, res) => {
    try{
        if(req.session){
            req.session.destroy((err) => {
                if (err) {
                    console.error('❌ Logout error:', err);
                    return res.status(500).json({
                        error: 'Could not log out, please try again'
                    });
                }else{
                    res.clearCookie('sessionId');
                    console.log('✅ Logout successful');
                    res.json({ message: 'Logout successful' });
                }
            });
        }else{
            res.json({ message: 'no active session' });
        }

}catch(error){
        console.error('❌ Logout error:', error);
        res.status(500).json({
            error: '  Logout failed',
            message: error.message
    });
}


});


// Check authentication status
router.get('/status', (req, res) => {
    try{
    console.log('🔍 Status check - Session data:', req.session);

    if (req.session && req.session.userId) {
        res.json({
            isAuthenticated: true,
            user: {
                id: req.session.userId,
                username: req.session.username,
                email: req.session.email,
                role: req.session.role
            }
        });
    } else {
        res.json({ isAuthenticated: false });
    }}catch(error){
        console.error('❌ Status check error:', error);
        res.status(500).json({
            error: 'Failed to get status',
            message: error.message
        });
    }
});

// Get profile (PROTECTED route - uses your middleware!)
router.get('/profile', requireAuth, async (req, res) => {
    try {
        console.log('👤 Profile request for user:', req.session.userId);

        // Use your DAO to get fresh user data
        const user = await userDao.getUserById(req.session.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            message: 'Profile retrieved successfully',
            user: user.toSafeObject()
        });
    } catch (error) {
        console.error('❌ Profile fetch error:', error);
        res.status(500).json({
            error: 'Failed to fetch profile',
            message: error.message
        });
    }
});


export default router;