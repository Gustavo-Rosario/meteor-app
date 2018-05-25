import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js'; 
import { Accounts } from 'meteor/accounts-base';

// Accounts condig
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({
  
  notes(){
    return Notes.find({});
  },
  
});

Template.add.events({
  'submit .add-form':function(event){
    event.preventDefault();
    
    // GET input value
    const target = event.target;
    const text = target.text.value;
    
    // Insert note into collection
    Meteor.call('notes.insert', text,(err, result)=>{
      console.log(err);
      console.log(result);
    }); 
    
    // Clear the form
    target.text.value = '';
    
    // Close the modal
    $('#addModal').modal('close');
    
    return false;
  },
  
});

Template.note.events({
  'click .delete-note':function(){
    Meteor.call('notes.remove',this);
    return false;
  }
});