import { Router } from 'express';
import { getThoughts, getThought, createThought, updateThought, deleteThought, addReaction, removeReaction } from '../../controllers/thoughtController.js';

const router = Router();

router.route('/')
    .get(getThoughts)
    .post(createThought);

router.route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

router.route('/:thoughtId/reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

export default router;
