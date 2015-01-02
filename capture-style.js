sahagin.CaptureStyle = {
  NONE: "none",

  THIS_LINE: "thisLine",

  STEP_IN: "stepIn",

  STEP_IN_ONLY: "stepInOnly"
};

/**
 * @returns {string}
 */
sahagin.CaptureStyle.getDefault = function() {
  return sahagin.CaptureStyle.THIS_LINE;
};