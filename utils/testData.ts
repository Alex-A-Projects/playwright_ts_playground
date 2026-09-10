/**
 * Constants and reusable test data for the UITestingPlayground suite.
 */
export const BASE_URL = 'http://uitestingplayground.com';

export const ROUTES = {
  home: '/',
  dynamicId: '/dynamicid',
  classAttribute: '/classattr',
  hiddenLayers: '/hiddenlayers',
  loadDelay: '/loaddelay',
  ajaxData: '/ajax',
  clientSideDelay: '/clientdelay',
  click: '/click',
  textInput: '/textinput',
  scrollbars: '/scrollbars',
  dynamicTable: '/dynamictable',
  verifyText: '/verifytext',
  progressBar: '/progressbar',
  visibility: '/visibility',
  sampleApp: '/sampleapp',
  mouseOver: '/mouseover',
  nonBreakingSpace: '/nbsp',
  overlappedElement: '/overlapped',
  shadowDom: '/shadowdom',
  alerts: '/alerts',
  fileUpload: '/upload',
  animatedButton: '/animation',
  disabledInput: '/disabledinput',
  autoWait: '/autowait',
  frames: '/frames',
  geoLocation: '/geolocation',
  clearInput: '/clearinput',
  scrollToClick: '/scrolltoclick',
  cssSelectors: '/cssselectors',
  select: '/select',
} as const;

export const SAMPLE_APP = {
  validUser: 'admin',
  validPassword: 'pwd',
  invalidUser: 'wrong-user',
  invalidPassword: 'wrong-password',
} as const;

export const PROGRESS_BAR = {
  targetPercent: 75,
  timeoutMs: 15_000,
} as const;

export const ANIMATED_BUTTON = {
  triggerDelayMs: 2_000,
} as const;

export const GEOLOCATION = {
  // San Francisco coordinates
  latitude: 37.7749,
  longitude: -122.4194,
} as const;

export const FILE_UPLOAD = {
  fileName: 'sample-upload.txt',
  mimeType: 'text/plain',
  fileContent: 'This is a sample file uploaded via Playwright automation.',
} as const;