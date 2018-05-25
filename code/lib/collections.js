import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


export const Notes = new Mongo.Collection('notes');

Meteor.methods({
    'notes.insert'(text){
        check(text, String);
        
        // CHeck if user is logged in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }
        
        
        Notes.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
        return true;
    },
    'notes.remove'(note){
        check(note._id, String);
        
        // Check if is owner
        if(note.owner !== Meteor.userId()){
            throw new Meteor.Error('not_authorized');
        }
        
        Notes.remove(note._id);
        return true;
    }
})