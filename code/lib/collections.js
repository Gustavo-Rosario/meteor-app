import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


export const Notes = new Mongo.Collection('notes');
export const Profile = new Mongo.Collection('profile');
export const Bg = new Mongo.Collection('bg');

Meteor.methods({
    // NOTES
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
    },

    // PROFILE
    'profile.insert'(username,img_profile,bg,prefs){
        check(username, String);
        check(img_profile, String);
        check(bg, {
            file: String,
            type: Match.OneOf('image','video')
        }),
        check(prefs,{
            mainColor: String,
            altColor: String
        })
        
        Profile.insert({
            username,
            img_profile,
            bg,
            prefs,
            createdAt: new Date()
        });
        return true;
    },
    'profile.update'(id, user ){
        const _id = new Meteor.Collection.ObjectID(id._str);
        Profile.update({
            _id: _id
        }, {
            $set: user
        });
        return true;
    }
})