$(document).ready(() => {
  var mathEntry = '';
  var fullOperation = '';
  const operators = new Set([107, 109, 106, 111, 173, 42, 43, 45, 47, '+', '-', '*', '/']);
  const isEmpty = arg => arg.length === 0;
  const entryIdentity = () => $("#entry").val($("#entry").val());
  // input numbers
  $(".number").click(function() {
    // Prevent incorrect numbers input
    const decRegex = /^0\./;
    if (decRegex.test($("#entry").val())) {
      entryIdentity();
    } else if ($("#entry").val().length > 1) {
      $("#entry").val($("#entry").val().replace(/^[0]+|^\-[0]+/g, ''));
    }
    var number = $(this).text();
    $("#entry").val($("#entry").val() + number);
    mathEntry += number;
  });

  // operators
  $(".operator").click(function() {
    const operator = $(this).text();
    if (isEmpty($("#entry").val())) {
      if (operator === '-') {
        $("#entry").val("-");
        mathEntry = '-';
      }
    } else {
      const addEntry = (operator) => {
        fullOperation += mathEntry + operator;
        mathEntry = '';
        $("#entry").val('');
      };
      
      if (isEmpty(fullOperation)) {
        $("#reminder").val($("#entry").val() + operator);
        addEntry(operator);
      } else {
        $("#reminder").val($("#reminder").val() + $("#entry").val() + operator);
        addEntry(operator);
      }
    }
  });

  // input sqrt

  $(".sqrt").click(function() {
    if (mathEntry === '') {
      mathEntry = 'Math.sqrt(';
      $("#entry").val("√(");
    }
  });

  // input brackets
  $(".brackets").click(function() {
    var open = (fullOperation + $("#entry").val()).match(/\(/g);
    var close = (fullOperation + $("#entry").val()).match(/\)/g);
    const length = arr => arr === null ? 0 : arr.length;
    if (mathEntry != '' && length(open) === length(close)) {
      $("#entry").val();
    } else if (length(open) === length(close)) {
      mathEntry += "(";
      $("#entry").val($("#entry").val() + "(");
    } else {
      mathEntry += ")";
      $("#entry").val($("#entry").val() + ")");
    }
  });

  // equal button
  $(".equalButton").click(function() {
    const doubleMin = str => str.replace(/\-\-/g, "+");
    fullOperation += mathEntry;
    $("#reminder").val(doubleMin($("#reminder").val() + $("#entry").val()));
    $("#entry").val(eval(doubleMin(fullOperation)));
    mathEntry = eval(doubleMin(fullOperation));
    fullOperation = '';
  });

  // Bind Enter to "=" button
  $(document).on("keyup", (e) => {
    if (e.which == 13) {
      fullOperation += $("#entry").val();
      $("#reminder").val(fullOperation);
      $("#entry").val(eval(fullOperation));
      mathEntry = eval(fullOperation);
      fullOperation = '';
    }
  });

  // Prevent double decimal input
  $(".dec-point").click(function(e) {
    if (isEmpty(mathEntry)) {
      $("#entry").val('0.');
      mathEntry = '0.';
    } else if (/\d+\.\d+|\.+$|\.\d+/.test($("#entry").val())) {
      e.preventDefault();
    } else {
      $("#entry").val($("#entry").val() + '.');
      mathEntry += '.';
    }
  });

  $("#entry").on("keyup", function(e) {
    if (e.which == 110 && /^\./.test($("#entry").val())) {
      $(this).val($(this).val().replace(/^\./, '0.'));
    } else if (e.which == 110 && /[\+\-\*\/]\./.test($("#entry").val())) {
      $(this).val($(this).val().replace(/\.$/, '0.'));
    } else if (e.which == 110 && /\d+\.\d+\.|\.\.$|\.\d+\./.test($("#entry").val())) {
      $(this).val($(this).val().replace(/\.$/, ''));
    }
  });

  // Prevent alphabetic characters input
  $("#entry").on("keypress keyup blur", function (event){
    $(this).val($(this).val().replace(/[^0-9\.\+\-\*\/\√\)\(]/g,''));
  });

  // AC
  const clear = () => {
    if (isEmpty($("#entry").val())) {
      $("#reminder").val('');
      fullOperation = '';
    } else {
      $("#entry").val('');
      mathEntry = '';
    }
  };

  $(".all-clear").click(function() {
    clear();
  });

  // Bind Delete to "AC" button
  $(document).on("keyup", (e) => {
    if (e.which == 46) {
      clear();
    }
  });

});
