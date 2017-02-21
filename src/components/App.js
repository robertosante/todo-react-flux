import AltContainer from 'alt-container';
import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
import uuid from 'node-uuid';
import Note from './Note';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends Component {
  render() {
    return (
      <div>
        <button onClick={this.addNote} className="add-note">+</button>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }}
        >
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  };
  
  addNote = () => {
    NoteActions.create({task: 'New Task'});
  };

  editNote = (id, task) => {
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  };

  deleteNote = (id, e) => {
    e.stopPropagation();

    NoteActions.delete(id);
  };

}
