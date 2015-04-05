// Generated by CoffeeScript 1.9.1
(function() {
  var $, $$, calculateSum, connectServer, disableOtherButtons, enableOtherButtons, everyButtonClick, getRandomNunber, ifActivateBigButton, resetCalculator, simulateRobert;

  $ = function(id) {
    return document.getElementById(id);
  };

  $$ = function(className) {
    return document.getElementsByClassName(className);
  };

  window.onload = function() {
    var at_plus, bigButton, btn, buttons, hoverArea;
    bigButton = $('big-bar');
    btn = $('button');
    hoverArea = $('at-plus-container');
    buttons = $$('button');
    at_plus = $('clickBar');
    bigButton.disabled = 1;
    resetCalculator();
    bigButton.onclick = function() {
      return calculateSum();
    };
    btn.onmouseout = function() {
      var e, reltg;
      e = window.event;
      reltg = (e.relatedTarget ? e.relatedTarget : e.toElement);
      while (reltg && reltg !== this) {
        reltg = reltg.parentNode;
      }
      if (reltg !== this) {
        return resetCalculator();
      }
    };
    at_plus.onclick = function() {
      return simulateRobert();
    };
    return everyButtonClick(buttons, bigButton);
  };

  simulateRobert = function() {
    var buttons, i, item, len, orderIndex, orderText;
    resetCalculator();
    buttons = $$('button');
    $('clickBar').disabled = 1;
    orderText = $('order');
    orderIndex = [0, 1, 2, 3, 4];
    orderIndex.sort(function() {
      return Math.random() - 0.5;
    });
    for (i = 0, len = orderIndex.length; i < len; i++) {
      item = orderIndex[i];
      orderText.innerHTML += String.fromCharCode(item + 65);
    }
    return getRandomNunber(buttons, buttons[orderIndex[0]], function() {
      return getRandomNunber(buttons, buttons[orderIndex[1]], function() {
        return getRandomNunber(buttons, buttons[orderIndex[2]], function() {
          return getRandomNunber(buttons, buttons[orderIndex[3]], function() {
            return getRandomNunber(buttons, buttons[orderIndex[4]], function() {
              return calculateSum();
            });
          });
        });
      });
    });
  };

  connectServer = function(button, callback) {
    var url, xmlHttp;
    url = "../server" + "?" + Math.random();
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url, true);
    xmlHttp.send(null);
    return xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        return callback(button, xmlHttp.responseText);
      }
    };
  };

  getRandomNunber = function(buttons, button, callback) {
    button.childNodes[1].classList.add('waiting');
    button.childNodes[1].innerHTML = "...";
    disableOtherButtons(buttons, button);
    return connectServer(button, function(button, number) {
      var thisButton;
      thisButton = button;
      thisButton.childNodes[1].innerHTML = number;
      thisButton.classList.add('inactive');
      thisButton.disabled = 1;
      enableOtherButtons(thisButton);
      ifActivateBigButton();
      return callback();
    });
  };

  everyButtonClick = function(buttons, bigButton) {
    var i, item, len, results;
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      item = buttons[i];
      results.push(item.onclick = function() {
        return getRandomNunber(buttons, this);
      });
    }
    return results;
  };

  disableOtherButtons = function(buttons, button) {
    var i, item, len, results;
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      item = buttons[i];
      if (item !== button) {
        item.classList.add('inactive');
        results.push(item.disabled = 1);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  enableOtherButtons = function(button) {
    var buttons, i, item, len, results;
    buttons = $$('button');
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      item = buttons[i];
      if (item !== button && !item.childNodes[1].classList.contains('waiting')) {
        item.classList.remove('inactive');
        results.push(item.disabled = 0);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  ifActivateBigButton = function() {
    var bigButton, buttons, i, item, len;
    buttons = $$('button');
    bigButton = $('big-bar');
    for (i = 0, len = buttons.length; i < len; i++) {
      item = buttons[i];
      if (!item.childNodes[1].classList.contains('waiting')) {
        return;
      }
    }
    bigButton.disabled = 0;
    bigButton.classList.remove('inactive');
    return calculateSum();
  };

  calculateSum = function() {
    var bigButton, buttons, i, item, len, sum;
    buttons = $$('button');
    bigButton = $('big-bar');
    sum = 0;
    for (i = 0, len = buttons.length; i < len; i++) {
      item = buttons[i];
      sum += parseInt(item.childNodes[1].innerHTML);
    }
    bigButton.innerHTML = sum;
    bigButton.disabled = 1;
    return bigButton.classList.add('inactive');
  };

  resetCalculator = function() {
    var at_plus, bigButton, buttons, i, item, len, orderText, results;
    buttons = $$('button');
    bigButton = $('big-bar');
    at_plus = $('clickBar');
    orderText = $('order');
    orderText.innerHTML = "";
    bigButton.disabled = 1;
    at_plus.disabled = 0;
    bigButton.innerHTML = '';
    bigButton.classList.toggle('inactive', true);
    results = [];
    for (i = 0, len = buttons.length; i < len; i++) {
      item = buttons[i];
      item.disabled = 0;
      item.classList.toggle('inactive', false);
      results.push(item.childNodes[1].classList.toggle('waiting', false));
    }
    return results;
  };

}).call(this);
