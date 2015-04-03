// Generated by CoffeeScript 1.9.1
(function() {
  var $, $$, addClickHandlerToAllButtons, callback, displayResultOnBubble, enableButtons, flag, makeRequest, reset, result, robot, robotIsWorking;

  $ = function(id) {
    return document.getElementById(id);
  };

  $$ = function(tag) {
    return document.getElementsByTagName(tag);
  };

  window.onload = function() {
    $('info-bar').className = 'bubbleDisable';
    $('info-bar').onclick = function() {
      if (flag === 'DONE' && result) {
        this.innerHTML = result;
      }
      return this.className = 'bubbleDisable';
    };
    $('button').onmouseout = function() {
      var e, reltg;
      e = window.event;
      reltg = (e.relatedTarget ? e.relatedTarget : e.toElement);
      while (reltg && reltg !== this) {
        reltg = reltg.parentNode;
      }
      if (reltg !== this) {
        return reset();
      }
    };
    document.getElementsByClassName('icon')[0].onclick = function() {
      reset();
      return robot();
    };
    return addClickHandlerToAllButtons();
  };

  result = 0;

  flag = 'LOADING';

  robotIsWorking = false;

  enableButtons = function() {
    var i, item, len, ref, results;
    ref = $$('button');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.disabled = '';
      results.push(item.className = 'active');
    }
    return results;
  };

  reset = function() {
    var button, i, len, ref, results;
    result = 0;
    flag = 'LOADING';
    robotIsWorking = false;
    $('info-bar').innerHTML = '';
    $('info-bar').className = 'bubbleDisable';
    ref = $$('button');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      button = ref[i];
      button.className = 'active';
      button.disabled = '';
      if (button.getElementsByTagName('span')[0] != null) {
        results.push(button.removeChild(button.getElementsByTagName('span')[0]));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  addClickHandlerToAllButtons = function() {
    var i, item, len, ref, results;
    ref = $$('button');
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      results.push(item.onclick = function() {
        var j, len1, otherItem, ref1;
        this.innerHTML = this.innerHTML + "<span class='unread'>...</span>";
        this.disabled = 'disabled';
        ref1 = $$('button');
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          otherItem = ref1[j];
          if (otherItem !== this) {
            if (!otherItem.getElementsByTagName('span')[0]) {
              otherItem.className = 'disable';
              otherItem.disabled = 'disabled';
            }
          }
        }
        return makeRequest(this.id);
      });
    }
    return results;
  };

  makeRequest = function(id) {
    var xmlHttp;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        return callback(xmlHttp.responseText, id);
      }
    };
    xmlHttp.open('GET', '/', true);
    return xmlHttp.send(null);
  };

  callback = function(number, id) {
    var i, len, otherItem, ref, thisButton;
    thisButton = $(id);
    if (thisButton.getElementsByTagName('span')[0]) {
      thisButton.innerHTML = thisButton.innerHTML.replace('...', number);
      thisButton.className = 'disable';
      thisButton.disabled = 'disabled';
      flag = 'DONE';
      ref = $$('button');
      for (i = 0, len = ref.length; i < len; i++) {
        otherItem = ref[i];
        if (otherItem !== thisButton && !otherItem.getElementsByTagName('span')[0] || otherItem.getElementsByTagName('span')[0].innerHTML === '...') {
          otherItem.className = 'active';
          otherItem.disabled = '';
          flag = 'LOADING';
        }
      }
      result += parseInt(number);
      if (flag === 'DONE') {
        displayResultOnBubble();
      }
      if (robotIsWorking && flag === 'DONE') {
        return robot();
      }
    }
  };

  displayResultOnBubble = function() {
    return $('info-bar').className = 'bubbleActive';
  };

  robot = function() {
    var i, item, len, ref;
    robotIsWorking = true;
    if (flag === 'LOADING') {
      ref = $$('button');
      for (i = 0, len = ref.length; i < len; i++) {
        item = ref[i];
        item.click();
        enableButtons();
      }
    }
    if (flag === 'DONE') {
      return $('info-bar').click();
    }
  };

}).call(this);