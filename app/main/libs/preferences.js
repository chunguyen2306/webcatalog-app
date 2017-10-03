const settings = require('electron-settings');

const sendMessageToWindow = require('./send-message-to-window');

// have version to easily reset preferences in the future
const v = '1.0.0';

const defaultPreferences = {
  darkTheme: false,
  injectCSS: '',
  injectJS: '',
  navigationBarPosition: 'left',
  showNavigationBar: true,
  showTitleBar: false,
  useSpellChecker: true,
  swipeToNavigate: true,
  useHardwareAcceleration: true,
  userAgent: null,
};

const getPreferences = () => Object.assign({}, defaultPreferences, settings.get(`preferences.${v}`, defaultPreferences));

const getPreference = name => settings.get(`preferences.${v}.${name}`, defaultPreferences[name]);

const setPreference = (name, value) => {
  settings.set(`preferences.${v}.${name}`, value);
  sendMessageToWindow('set-preference', name, value);
};

const resetPreferences = () => {
  settings.deleteAll();

  const preferences = getPreference();
  Object.keys(preferences).forEach((name) => {
    sendMessageToWindow('set-preference', name, preferences[name]);
  });
};

module.exports = {
  getPreference,
  getPreferences,
  resetPreferences,
  setPreference,
};
