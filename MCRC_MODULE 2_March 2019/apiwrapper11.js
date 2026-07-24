/*******************************************************************************
** apiwrapper11.js — Standalone Web/HTML stub (no LMS required)
**
** Original ADL SCORM 1.2 API wrapper replaced with an in-memory stub so the
** course runs as a plain web package without an LMS.
**
** All LMS functions return success values; data is stored in a plain JS object.
*******************************************************************************/

var _Debug = false;
var _NoError = 0;
var _GeneralError = 101;
var _NotInitialized = 301;

// ── In-memory CMI data store ──────────────────────────────────────────────────
var _lmsData = {
  "cmi.core.student_id":       "web_user",
  "cmi.core.student_name":     "Web Learner",
  "cmi.core.lesson_status":    "not attempted",
  "cmi.core.lesson_mode":      "normal",
  "cmi.core.entry":            "ab-initio",
  "cmi.core.score.raw":        "",
  "cmi.core.score.min":        "",
  "cmi.core.score.max":        "",
  "cmi.core.total_time":       "00:00:00.0",
  "cmi.core.session_time":     "00:00:00.0",
  "cmi.core.exit":             "",
  "cmi.suspend_data":          "",
  "cmi.launch_data":           "",
  "cmi.comments":              "",
  "cmi.comments_from_lms":     ""
};

var _initialized = false;
var lmsInitCalled   = false;
var lmsFinishCalled = false;
var apiHandle       = {};   // non-null so any legacy checks pass
var findAPITries    = 0;

// ── Stub API object ───────────────────────────────────────────────────────────
var API = {
  LMSInitialize:     function()        { _initialized = true;  return "true"; },
  LMSFinish:         function()        { _initialized = false; return "true"; },
  LMSGetValue:       function(name)    { return (_lmsData[name] !== undefined) ? String(_lmsData[name]) : ""; },
  LMSSetValue:       function(n, v)    { _lmsData[n] = v; return "true"; },
  LMSCommit:         function()        { return "true"; },
  LMSGetLastError:   function()        { return "0"; },
  LMSGetErrorString: function()        { return ""; },
  LMSGetDiagnostic:  function()        { return ""; }
};

// Expose on window so findAPI() traversals in any frame can locate it
window.API = API;

// ── Public wrapper functions (same signatures as original) ────────────────────

function LMSInitialize() {
  if (!lmsInitCalled) {
    API.LMSInitialize("");
    lmsInitCalled   = true;
    lmsFinishCalled = false;
    if (window.myTop && window.myTop.apiHandle) {
      window.myTop.lmsInitCalled   = lmsInitCalled;
      window.myTop.lmsFinishCalled = lmsFinishCalled;
    }
  }
  return "true";
}

function LMSFinish() {
  if (!lmsFinishCalled) {
    lmsFinishCalled = true;
    lmsInitCalled   = false;
    if (window.myTop && window.myTop.apiHandle) {
      window.myTop.lmsInitCalled   = lmsInitCalled;
      window.myTop.lmsFinishCalled = lmsFinishCalled;
    }
    API.LMSFinish("");
  }
  return "true";
}

function LMSGetValue(name) {
  if (lmsFinishCalled) return "";
  var val = API.LMSGetValue(name);
  if (typeof trivLogMsg === "function") trivLogMsg('LMSGetValue for ' + name + ' = [' + val + ']', 16);
  return val;
}

function LMSSetValue(name, value) {
  if (lmsFinishCalled) return;
  API.LMSSetValue(name, value);
  if (typeof trivLogMsg === "function") trivLogMsg('LMSSetValue for ' + name + ' to [' + value + ']', 16);
}

function LMSCommit() {
  if (lmsFinishCalled) return "false";
  return API.LMSCommit("");
}

function LMSGetLastError()         { return "0"; }
function LMSGetErrorString()       { return ""; }
function LMSGetDiagnostic()        { return ""; }

function LMSIsInitialized() {
  return _initialized && !lmsFinishCalled;
}

function ErrorHandler(str)         { return _NoError; }

function getAPIHandle()            { return API; }
function getAPI()                  { return API; }
function findAPI(win)              { return API; }
