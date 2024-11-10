import { Schema, model, Document, Types } from 'mongoose';

interface IReaction {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    userId: Types.ObjectId;  // Adding userId to the IThought interface
    reactions: IReaction[];
    reactionCount?: number;
}

const reactionSchema = new Schema<IReaction>({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: (timestamp: Date) => timestamp },
}, {
    toJSON: { getters: true },
});

const thoughtSchema = new Schema<IThought>({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, get: (timestamp: Date) => timestamp },
    username: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure userId is in the Thought schema
    reactions: [reactionSchema],
}, {
    toJSON: { virtuals: true, getters: true },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

export default model<IThought>('Thought', thoughtSchema);
