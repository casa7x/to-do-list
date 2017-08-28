var array_of_tasks = [],
    json;

jQuery(document).ready(function($) {
    $(".add").on("click", function() {
        showModal();
    });

    $(".fa-window-close-o").on("click", function(){
        closeModal();
        closeModal2();
    });
    $(".addTask").on("click", function() {
        var priority_value = $("select.priority").val().toLowerCase();

        closeModal();

        var li = document.createElement("li");
        var inputText = document.getElementById("inputText").value;
        var t = document.createTextNode(inputText);
        var p = document.createElement("p");
        p.classList.add("taskName");
        p.appendChild(t);
        var inputTime = document.getElementById("inputTime").value;
        var iT = document.createTextNode(inputTime);
        var pT = document.createElement("p");
        pT.classList.add("time");
        pT.appendChild(iT);
        var more = document.createElement("span");
        var priority = document.createElement("i");
        var descrip = document.createElement("div");
        var inputDesc = document.createElement("div");
        var added = document.createElement("div");
        var buttondescr = document.createElement("button");
        var textarea = document.createElement("textarea");
        var buttonAdd = document.createElement("button");
        var pAd = document.createElement("p");
        var buttonEd = document.createElement("button");
        priority.classList.add("fa");
        priority.classList.add("fa-circle");
        var closer = document.createElement("i");
        closer.classList.add("fa");
        closer.classList.add("fa-times-circle-o");
        var clock = document.createElement("i");
        clock.classList.add("fa");
        clock.classList.add("fa-clock-o");
        var edit = document.createElement("i");
        edit.classList.add("fa");
        edit.classList.add("fa-pencil");
        var arrDown = document.createElement("i");
        arrDown.classList.add("fa");
        arrDown.classList.add("fa-angle-double-down");
        if (priority_value == "high") { // если выбрано high
            priority.classList.add("high");
        } else if (priority_value == "normal") {
            priority.classList.add("normal");
        } else {
            priority.classList.add("low");
        }
        li.classList.add("drag");

        more.classList.add("fa");
        more.classList.add("fa-ellipsis-h");
        descrip.classList.add("more");
        inputDesc.classList.add("inputDesc");
        added.classList.add("added");
        textarea.classList.add("textDesc");
        buttonAdd.classList.add("btn");
        buttonAdd.classList.add("description");
        buttonAdd.classList.add("add2");
        pAd.classList.add("addedText");
        buttonEd.classList.add("btn");
        buttonEd.classList.add("description");
        buttonEd.classList.add("editDesc");
        buttonAdd.innerHTML = "Add";
        buttonEd.innerHTML = "Edit";
        buttondescr.classList.add("btn");
        buttondescr.classList.add("description");
        buttondescr.innerHTML = "Add description";
        added.appendChild(pAd);
        added.appendChild(buttonEd);
        descrip.appendChild(buttondescr);
        inputDesc.appendChild(textarea);
        inputDesc.appendChild(buttonAdd);
        li.appendChild(priority);
        li.appendChild(p);
        li.appendChild(pT);
        li.appendChild(clock);
        li.appendChild(edit);
        li.appendChild(more);
        li.appendChild(arrDown);
        li.appendChild(closer);


        if (inputText == "") {
            alert("Вы должны что-то указать");
        } else {
            document.getElementById("tasks").appendChild(li);
            document.getElementById("tasks").appendChild(descrip);
            document.getElementById("tasks").appendChild(inputDesc);
            document.getElementById("tasks").appendChild(added);
        }

        // showDesc();
        // closers();
        // editing();
        // editTime();
        // addDescr();
        // addDescr2();
        // showDesc2();
        // editDesc();
    });


    function showModal() {
        console.log("work");
        $(".overlay").fadeIn(400, function() {
            $(".modal").css("display", "block").animate({
                opacity: 1
            }, 800);
        });
    }

    function closeModal() {
        $(".modal").animate({
            opacity: 0
        }, 500, function() {
            $(this).css("display", "none");
            $(".overlay").fadeOut(400);
        });
    }
    // showDesc();

    $(document).on("click", '.fa-ellipsis-h', function() {
        var li = $(this).parent();
        if (li.next().is(":visible")) {
            li.next().slideUp(500);
        } else {
            $(".fa-ellipsis-h").parent().next().slideUp(500);
            li.next().slideDown(500);
        }
    });

    $(document).on("click", ".description", function() {
        $(this).parent().slideUp(500);
        $(this).parent().next().slideDown(500);
    });

    $(document).on("click", ".add2", function() {
        var input = $(this).prev().val();
        // $(this).parent().next().find("p").val("");
        $(this).parent().next().find("p").append(input);
        $(this).parent().next().slideDown(500);
        $(this).parent().slideUp(500);
        if ($(this).parent().next().is(":visible")) {
            $(this).parent().prev().prev().find(".fa-ellipsis-h").slideUp(500);
            $(this).parent().prev().prev().find(".fa-angle-double-down").slideDown(500);
        }
    });

    $(document).on("click", ".fa-angle-double-down", function() {
        $(this).parent().next().next().next().slideToggle(500);
    });

    $(document).on("click", ".editDesc", function() {
        $(this).parent().slideUp(300);
        $(this).parent().prev().slideDown(300);
        var input = $(this).prev().text();
        console.log(input);
        $(this).parent().prev().find("textDesc").val(input);
        $(this).prev().text(" ");

    });

    $(document).on("click", ".fa-times-circle-o", function() {
        console.log("delete");
        $(this).parent().next().next().next().detach();
        $(this).parent().next().next().detach();
        $(this).parent().next().detach();
        $(this).parent().detach();
    });

    // $(".checked").fadeOut(500);
    // sortable();
    // function sortable(){
    // 	$(".tasks").sortable();
    // 	console.log("WorkWork");
    // }
    // msieV();
    // function msieV(){
    // if (jQuery.browser.msie)
    //        {
    //            alert(jQuery.browser.version);
    //        }
    //        else
    //        {
    //            alert('Это не интернет экслорер');
    //        }
    //    }
    $(document).on("click", ".fa-pencil", function() {
        var text = $(this).prev().prev().prev();
        var time = $(this).prev();
        var newTask = swal({
                title: "An input!",
                text: "Write New Task:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            },
            function(inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                } else {
                    text.text(inputValue);

                }
                swal("Nice!", "You wrote: " + inputValue, "success");
            });

    });

    $(document).on("click", ".fa-clock-o", function() {
        var time = $(this).prev();
        var newTime = swal({
                title: "An input!",
                text: "Write New Time:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            },
            function(inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                } else {
                    time.text(inputValue);

                }
                swal("Nice!", "You wrote: " + inputValue, "success");
            });
    });
    $(document).on("click", ".taskName", function(){
        console.log("drag");
        var li = $(this).parent();
        $(this).parent().addClass("checked");
        $(this).parent().next().next().next().detach();
        $(this).parent().next().next().detach();
        $(this).parent().next().detach();
        $(this).parent().parent().append(li);
        
    })
    $(".showClosed").on("click", function(){
        if( $("li").hasClass("checked")){
      showModal2();
      $(".done").empty();
      var checked = $(".checked").find(".fa-circle, .taskName, .time").clone();
      // var li = document.createElement("li");
      // li.append(checked);
      $(".done").append(checked);
      }
      else{
        alert("Нету выполненных");
      }
    })

    function showModal2(){
        $(".overlay2").fadeIn(400, function() {
            $(".modal2").css("display", "block").animate({
                opacity: 1
            }, 800);
        });
    }
    function closeModal2() {
        $(".modal2").animate({
            opacity: 0
        }, 500, function() {
            $(this).css("display", "none");
            $(".overlay2").fadeOut(400);
        });
    }

    function Task(title,time) {
        this.title = title;
        this.time = time;
    }

    $(".showJSON").on("click",function(){
        var names = document.querySelectorAll('.taskName');
        var time = document.querySelectorAll('.time');

        for (var i = 0; i < names.length; i++) {
            var task = new Task(names[i].innerHTML,time[i].innerHTML);
            array_of_tasks.push(task);
        }

        json = JSON.stringify(array_of_tasks);
        console.log( "json is ready: ", json );
        alert("Экспорт выполнен");
    });

    $(".impJSON").on("click", function(){
        var new_objs = JSON.parse(json);
        console.log(new_objs);
        for (i=0; i<new_objs.length; i++) {
            console.log('add to list: ', new_objs[i]);
            createHTML(new_objs[i]);
            // добавлять именно тут новые объекты в списки
        }
        // data = new_obj.data;
        // for(i = 0; i < new_obj.length; i++){
        // obj.push(new_obj[i]);
        // createHTML(new_obj[i]);
    });
    function createHTML(new_objs){
        var li = document.createElement("li");
        li.classList.add("drag");
        var priority = document.createElement("i");
        priority.classList.add("fa");
        priority.classList.add("fa-circle");
        var p = document.createElement("p");
        p.classList.add("taskName");
        p.innerHTML = new_objs.title;
        var pT = document.createElement("p");
        pT.classList.add("time");
        pT.innerHTML = new_objs.time;
        var clock = document.createElement("i");
        clock.classList.add("fa");
        clock.classList.add("fa-clock-o");
        var edit = document.createElement("i");
        edit.classList.add("fa");
        edit.classList.add("fa-pencil");
        var more = document.createElement("span");
        more.classList.add("fa");
        more.classList.add("fa-ellipsis-h");
        var arrDown = document.createElement("i");
        arrDown.classList.add("fa");
        arrDown.classList.add("fa-angle-double-down");
        var closer = document.createElement("i");
        closer.classList.add("fa");
        closer.classList.add("fa-times-circle-o");
        var descrip = document.createElement("div");
        var inputDesc = document.createElement("div");
        var added = document.createElement("div");
        var buttondescr = document.createElement("button");
        var textarea = document.createElement("textarea");
        var buttonAdd = document.createElement("button");
        var pAd = document.createElement("p");
        var buttonEd = document.createElement("button");
        descrip.classList.add("more");
        inputDesc.classList.add("inputDesc");
        added.classList.add("added");
        textarea.classList.add("textDesc");
        buttonAdd.classList.add("btn");
        buttonAdd.classList.add("description");
        buttonAdd.classList.add("add2");
        pAd.classList.add("addedText");
        buttonEd.classList.add("btn");
        buttonEd.classList.add("description");
        buttonEd.classList.add("editDesc");
        buttonAdd.innerHTML = "Add";
        buttonEd.innerHTML = "Edit";
        buttondescr.classList.add("btn");
        buttondescr.classList.add("description");
        buttondescr.innerHTML = "Add description";
        added.appendChild(pAd);
        added.appendChild(buttonEd);
        descrip.appendChild(buttondescr);
        inputDesc.appendChild(textarea);
        inputDesc.appendChild(buttonAdd);
        li.appendChild(priority);
        li.appendChild(p);
        li.appendChild(pT);
        li.appendChild(clock);
        li.appendChild(edit);
        li.appendChild(more);
        li.appendChild(arrDown);
        li.appendChild(closer);
        document.getElementById("tasks").appendChild(li);
        document.getElementById("tasks").appendChild(descrip);
        document.getElementById("tasks").appendChild(inputDesc);
        document.getElementById("tasks").appendChild(added);


    }
        

});
    



// jQuery.browser = {};
// (function () {
//     jQuery.browser.msie = false;
//     jQuery.browser.version = 0;
//     if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
//         jQuery.browser.msie = true;
//         jQuery.browser.version = RegExp.$1;
//     }
// })();