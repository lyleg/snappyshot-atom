'use babel';

import SnappyshotAtomView from './snappyshot-atom-view';
import { CompositeDisposable } from 'atom';

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
      'snappyshot-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.snappyshotAtomView.destroy();
  },

  serialize() {
    return {
      snappyshotAtomViewState: this.snappyshotAtomView.serialize()
    };
  },

  toggle() {
    console.log('SnappyshotAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
