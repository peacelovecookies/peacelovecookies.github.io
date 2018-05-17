$(document).ready(() => {
  let mathEntry = '';
  let fullOperation = '';
  const entry = () => $("#entry").val();
  const reminder = () => $("#reminder").val();
  const operators = new Set([107, 109, 106, 111, 173, 42, 43, 45, 47, '+', '-', '*', '/']);
  
  const isEmpty = arg => arg.length === 0;
  
  const addToEntry = (arg) => {
    $("#entry").val(entry() + arg);
  }
  const addToReminder = arg => $("#reminder").val(reminder() + arg);
  const replaceEntry = arg => $("#entry").val(arg);
  const replaceReminder = arg => $("#reminder").val(arg);
  const entryIdentity = () => $("#entry").val($("#entry").val());
  
  
  // input numbers
  $(".number").click(function(e) {
    var number = $(this).text();
    addToEntry(number);
    mathEntry += number;
    
    // Prevent incorrect numbers input
    const decRegex = /^0\./;
    if (entry().length > 1 && !decRegex.test(entry())) {
      replaceEntry(entry().replace(/^[0]+|^\-[0]+/g, ''));
    }
  });

  // operators
  $(".operator").click(function() {
    const operator = $(this).text();
    if (isEmpty(entry())) {
      if (operator === '-') {
        addToEntry("-");
        mathEntry = '-';
      }
    } else {
      const newEntry = (operator) => {
        fullOperation += mathEntry + operator;
        mathEntry = '';
        replaceEntry('');
      };
      
      if (isEmpty(fullOperation)) {
        addToReminder(entry() + operator)
        newEntry(operator);
      } else {
        addToReminder(entry() + operator);
        newEntry(operator);
      }
    }
  });

  // input sqrt

  $(".sqrt").click(function() {
    if (entry() === '') {
      mathEntry = 'Math.sqrt(';
      addToEntry("√(");
    }
  });

  // input brackets
  $(".brackets").click(function() {
    var open = (fullOperation + entry()).match(/\(/g);
    var close = (fullOperation + entry()).match(/\)/g);
    const length = arr => arr === null ? 0 : arr.length;
    
    if (entry() !== '' && length(open) === length(close)) {
      entryIdentity();
    } else if (length(open) === length(close)) {
      mathEntry += "(";
      addToEntry(" (");
    } else {
      mathEntry += ")";
      addToEntry(") ");
    }
  });

  // equal button
  $(".equalButton").click(function() {
    const doubleMinus = str => str.replace(/\-\-/g, "+");
    fullOperation += mathEntry;
    
    replaceReminder(doubleMinus(reminder() + entry()));
    replaceEntry(eval(doubleMinus(fullOperation)));
    mathEntry = eval(doubleMinus(fullOperation));
    fullOperation = '';
  });

  // Bind Enter to "=" button
  $(document).on("keyup", (e) => {
    if (e.which == 13) {
      fullOperation += entry();
      replaceReminder(fullOperation);
      replaceEntry(eval(fullOperation));
      mathEntry = eval(fullOperation);
      fullOperation = '';
    }
  });

  // Prevent double decimal input
  $(".dec-point").click(function(e) {
    const pointExists = /\d+\.\d+|\.+$|\.\d+/;
    if (isEmpty(mathEntry)) {
      addToEntry('0.');
      mathEntry = '0.';
    } else if (pointExists.test(entry())) {
      entryIdentity();
    } else {
      addToEntry('.');
      mathEntry += '.';
    }
  });

  $("#entry").on("keyup", function(e) {
    const isPoint = e.which == 110;
    
    const pointFirst = /^\./;
    const pointLast = /\.$/;
    const pointAfterOperator = /[\+\-\*\/]\./;
    const pointExists = /\d+\.\d+\.|\.\.$|\.\d+\./;
    
    const replaceThis = (pattern, newVal) => {
      $(this).val($(this).val().replace(pattern, newVal));
    };
    
    if (isPoint && pointFirst.test(entry())) {
      replaceThis(pointFirst, '0.');
    } else if (isPoint && pointAfterOperator.test(entry())) {
      replaceThis(pointLast, '0.');
    } else if (isPoint && pointExists.test(entry())) {
      replaceThis(pointLast, '');
    }
  });

  // Prevent alphabetic characters input
  $("#entry").on("keypress keyup blur", function (e){
    $(this).val($(this).val().replace(/[^0-9\.\+\-\*\/\√\)\(]/g,''));
  });

  // AC
  const clear = () => {
    if (isEmpty(entry())) {
      replaceReminder('');
      fullOperation = '';
    } else {
      replaceEntry('');
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
