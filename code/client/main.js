import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Notes, Profile } from '../lib/collections.js'; 
import { Accounts } from 'meteor/accounts-base';

// Accounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';


Template.mainpage.helpers({
  user(){
    return JSON.parse(localStorage.getItem('user')) || {};
  },
  users(){
    return Profile.find({});  
  },
  
});

Template.mainpage.events({
  'click .unset-user':function(){
    localStorage.removeItem('user');
    BlazeLayout.reset();
    BlazeLayout.render('layout', {main:'chosepage'});
    return false;
  }
});

Template.chosepage.onRendered(function(){
  $('body').addClass('animated bounceInLeft');
});

Template.chosepage.helpers({
  users(){
    return Profile.find({});  
  },
});

Template.choseuser.events({
  'click .select-user':function(){
    let user = JSON.stringify(this);
    localStorage.setItem('user',user);
    BlazeLayout.reset(); // this will remove the current template.
    BlazeLayout.render('layout', {main:'mainpage'}) // rerender
    return false;
  }
});

// INIT
if(localStorage.getItem('user')){
  BlazeLayout.render('layout', {main:'mainpage'});
}else{
  BlazeLayout.render('layout', {main:'chosepage'});
  
}