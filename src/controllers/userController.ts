import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

// Get all users
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users.' });
    }
};

// Get a single user by ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
        user ? res.json(user) : res.status(404).json({ message: 'User not found.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user.' });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user.' });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        updatedUser ? res.json(updatedUser) : res.status(404).json({ message: 'User not found.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user.' });
    }
};

// Delete a user and their associated thoughts
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and associated thoughts deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user.' });
    }
};

// Add a friend to user's friend list
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        user ? res.json(user) : res.status(404).json({ message: 'User not found.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add friend.' });
    }
};

// Remove a friend from user's friend list
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        user ? res.json(user) : res.status(404).json({ message: 'User not found.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove friend.' });
    }
};
