import { Template } from 'meteor/templating';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Notes, Profile, Bg } from '../lib/collections.js'; 
import { Accounts } from 'meteor/accounts-base';

Meteor.sleep = function(ms) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms);
    });
};

// Accounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

import './main.html';

Template.registerHelper('user',()=>{
  return JSON.parse(localStorage.getItem('user')) || {};
});

Template.mainpage.helpers({
  // user(){
  //   return JSON.parse(localStorage.getItem('user')) || {};
  // },
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
  },
  'click .aopt-bg':function(){
    Meteor.sleep(100).then(()=>{
      BlazeLayout.reset();
      BlazeLayout.render('layout', {main:'mainpage', options:'bgopt'});
    });
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

Template.bgopt.helpers({
  bg(){
    return Bg.find({});
  }
});

Template.bgopt.events({
  'click .opt-bg':function(){
    let $figure = ( $(event.target).hasClass("opt-bg") ) ? $(event.target) : $(event.target).parent();
    $('.checked').remove();
    $figure.append(`<a class="btn-floating checked green white-text animated zoomIn">
                              <i class="material-icons">check</i>
                            </a>`);
    let file = $figure.find("img").prop("src");
    $(".bg-app img").prop("src",file);
    return false;
  },
  'click .bgopt-cancel':function(){
    $('.opt').addClass('animated slideOutRight');
    Meteor.sleep(500).then(()=>{
      BlazeLayout.reset(); // this will remove the current template.
      BlazeLayout.render('layout', {main:'mainpage'}) // rerender
    });
    return false;
  }
});

Template.choseuser.events({
  'click .select-user':function(){
    let user = JSON.stringify(this);
    localStorage.setItem('user',user);
    BlazeLayout.reset(); // this will remove the current template.
    BlazeLayout.render('layout', {main:'mainpage'}); // rerender
    return false;
  }
});

// INIT
if(localStorage.getItem('user')){
  BlazeLayout.render('layout', {main:'mainpage'});
}else{
  BlazeLayout.render('layout', {main:'chosepage'});
  
}