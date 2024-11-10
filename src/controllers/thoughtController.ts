import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

// Get all thoughts
export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve thoughts.' });
    }
};

// Get a single thought by ID
export const getThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve thought.' });
    }
};

// Create a new thought and add it to the user's thoughts array
export const createThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const newThought = await Thought.create(req.body);
        await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        res.json(newThought);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create thought.' });
    }
};

// Update a thought by ID
export const updateThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
        updatedThought ? res.json(updatedThought) : res.status(404).json({ message: 'Thought not found.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update thought.' });
    }
};

// Delete a thought by ID
export const deleteThought = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought not found.' });
            return;
        }
        await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thought._id } });
        res.json({ message: 'Thought deleted.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete thought.' });
    }
};

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );
        thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add reaction.' });
    }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove reaction.' });
    }
};
