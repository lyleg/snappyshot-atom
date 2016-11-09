'use babel';

import SnappyshotAtomView from './snappyshot-atom-view'
import { CompositeDisposable } from 'atom'
import {generateSnapshot} from 'snappyshot'

export default {

  snappyshotAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.snappyshotAtomView = new SnappyshotAtomView(state.snappyshotAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.snappyshotAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'snappyshot:generateSnapshot': () => this.generateSnapshot()
    }));
  },

  deactivate() {
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.snappyshotAtomView.destroy()
  },

  serialize() {
    return {
      snappyshotAtomViewState: this.snappyshotAtomView.serialize()
    };
  },

  generateSnapshot(foo:string) {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let snapshot = generateSnapshot(selection);
      console.log(snapshot)
      editor.insertText(snapshot)
    }
  }

};
