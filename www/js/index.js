var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        app.member.onCreate();
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
  /*      var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
    }
};
app.member=(function () {
    var onCreate =function () {
        setContentView();
        $('#signin-btn').click(e=>{
            e.preventDefault();
            var id = $('#id').val();
            var password= $('#password').val();
            $.ajax({
                async : false,
                url:'json/member.json',
                type: 'post',
                data: {id:id,password:password},
                dataType:'json',
                success:d=>{
                    $.each(d,(i,o)=>{
                        if(o.id===id && o.password === password){
                            checkval = true;
                            return false;
                        }else{
                            checkval = false;
                        }
                    });
                    if(checkval==true){
                        app.main.onCreate();
                    }else{
                        alert('FAIL');
                        $('#id').val('');
                        $('#password').val('');
                    }
                },
                error:e=>{
                    alert('error');
                }
            });
        });
    };
    var setContentView =function () {
        $('body').html(app.compUI.div('wrapper'));
        app.template.body('member-container','member-content');
        $('#content').append(app.compUI.div('main-img'));
        $('#content').append(app.compUI.input('id','text'));
        $('#id').attr('placeholder','ID를 입력하세요').attr('data-role','none');
        $('#content').append(app.compUI.input('password','password'));
        $('#password').attr('placeholder','비밀번호를 입력하세요').attr('data-role','none');
        $('#content').append(app.compUI.btn('signin-btn'));
        $('#content').append(app.compUI.btn('signup-btn'));
        $('#signin-btn').text('로그인').addClass('btn btn-default');
        $('#signup-btn').text('회원가입').addClass('btn btn-default');
    };
    return{onCreate:onCreate};
})();
app.main = (function () {
    var onCreate = function () {
        setContentView();
        $('#rsrv-btn').click(e=>{
            e.preventDefault();
            app.reservation.onCreate();
        });
        $('#header-title').click(e=>{
            e.preventDefault();
            $('#movie-list').empty();
            $('#wrapper').addClass('layer-dark');
            $('#wrapper').append(app.compUI.div('movie-list'));
            $('#movie-list').append(app.compUI.ul());
            $.ajax({
                async : false,
                url:'json/movie.json',
                type: 'post',
                dataType:'json',
                success:d=>{
                    var movieListHTML='';
                    var arr=d;
                    $.each(arr,(i,o)=>{
                        movieListHTML+='<li id="movie0'+(i+1)+'">'+o.movie_title+'</li>';
                    });
                    $('#movie-list>ul').append(movieListHTML);
                    $('#movie-list').toggle();
                    $('#header-title>i').toggleClass('fa-angle-double-down fa-angle-double-up');
                    $('#movie01').click(e=>{
                        e.preventDefault();
                        onCreate();
                        var selectedMovie=$('#title').text();
                        app.session.init('movie',selectedMovie);
                    });
                    $('#movie02').click(e=>{
                        e.preventDefault();
                        onCreate();
                        var selectedMovie='';
                        var url = 'url('+arr[1].poster +')';
                        $('#img-box').removeAttr('background-image');
                        $('#img-box').css({'background-image':url});
                        $('#title').text(arr[1].movie_title);
                        $('#rate').text(arr[1].score);
                        $('#genre').text(arr[1].genre);
                        var selectedMovie=$('#title').text();
                        app.session.init('movie',selectedMovie);
                    });
                    $('#movie03').click(e=>{
                        e.preventDefault();
                        onCreate();
                        var selectedMovie='';
                        var url = 'url('+arr[2].poster +')';
                        $('#img-box').removeAttr('background-image');
                        $('#img-box').css({'background-image':url});
                        $('#title').text(arr[2].movie_title);
                        $('#rate').text(arr[2].score);
                        $('#genre').text(arr[2].genre);
                        var selectedMovie=$('#title').text();
                        app.session.init('movie',selectedMovie);
                    });
                },
                error:e=>{
                    alert('error');
                }
            });
        });
    };
    var setContentView = function () {
        $('body').html(app.compUI.div('wrapper'));
        app.template.header();
        app.template.body('main-container','main-content');
        $('#header-left').addClass('menu-btn');
        $('.menu-btn').append(app.compUI.i('fa fa-bars'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('#header-title').addClass('select-btn');
        $('.select-btn').text('영화선택 ').append(app.compUI.i('fa fa-angle-double-down'));
         $('#content').html(app.compUI.div('img-box'));
         $('#content').append(app.compUI.div('movie-info'));
         $('#movie-info').append(app.compUI.div('title'));
         $('#movie-info').append(app.compUI.div('border'));
         $('#movie-info').append(app.compUI.div('details'));
         $('#details').append(app.compUI.div('rate'));
         $('#details').append(app.compUI.div('genre'));
         $('#content').append(app.compUI.div('rsrv-btn'));
         $('#rate').text('9.7');
         $('#title').text('매트릭스');
         $('#genre').text('SF,액션');
         $('#rsrv-btn').text('예매하기');
        var selectedMovie=$('#title').text();
        app.session.init('movie',selectedMovie);
    };
    return {onCreate:onCreate};
})();
app.reservation =(function () {
    var onCreate =function () {
        setContentView();
        $('.option-title.theater').click(e=>{
            e.preventDefault();
            app.theater.onCreate();
        });
        $('#header-left').click(e=>{
           // alert('app.reservation>뒤로가기');
            app.main.onCreate();
        });
        $('.option-title.date').click(e=>{
            // alert('영화관을 먼저 선택해주세요.');
    });
    }
    var setContentView = function () {
        var selectedMovie= app.session.getSessionData('movie');
        app.template.reservFixed();
        $('#option-box>ul>li:first-child').css({'background-image':app.session.movie(selectedMovie)});
        $('#content').append(app.compUI.div('selected-option-box'));
    };
    return {onCreate:onCreate};
})();
app.theater=(function () {
    var onCreate=function () {
        setContentView();
        $('#header-left').click(e=>{
            //alert('app.theater>뒤로가기');
            app.reservation.onCreate();
        });
        $('#header-right').click(e=>{
            //alert('app.theater>영화관 선택완료!');
            app.date.onCreate();
        });
    };
    var setContentView =function () {
        app.template.theater();
        $.ajax({
            async : false,
            url:'json/office.json',
            type: 'post',
            dataType:'json',
            success:d=>{
                var townListHTML='';
                var arr=d;
                $.each(arr,(i,o)=>{
                    townListHTML+='<li id="town0'+(i+1)+'">'+o.officename+'</li>';
                });
                $('#region-town>ul').append(townListHTML);
                $('#region-town>ul>li').on('click',function (e) {
                    e.preventDefault();
                    var theater = $(this).attr('id');
                    var theaterName= $('#'+theater).text();
                    app.session.init('theater',theaterName);
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                    }
                    else{
                        $(this).addClass('active');
                    }
                    $('.finish-btn').css({'color':'#503396','border':'1px solid #503396'});
                    $('.finish-btn').click(e=>{
                        e.preventDefault();
                            app.date.onCreate();
                            var selectedTheater =app.session.getSessionData('theater');
                            $('.option-title.theater').text(selectedTheater);
                    });
                });
            },
            error:e=>{
                alert('error');
            }
        });
    }
    return{onCreate:onCreate};
})();
app.date=(function () {
    var onCreate = function () {
        setContentView();

    }
    var setContentView=function () {
        var selectedMovie= app.session.getSessionData('movie');
        app.template.reservFixed();
        $('.option-title.theater').text(app.session.getSessionData('theater'));
        $('#option-box>ul>li:first-child').css({'background-image':app.session.movie(selectedMovie)});
        $('#content').append(app.compUI.div('selected-option-box'));
        $('.option-title.date').click(e=> {
            e.preventDefault();
            var date = app.dateCalc.today();
            //date =[년/월/일/요일] 순으로 들어있음요
            var thisYear = app.session.init('thisYear',date[0]);
            var thisMonth = app.session.init('thisMonth',date[1]);
            var tmrw = app.dateCalc.tomorrow();
            //tmrw  =[일/요일] 순으로 들어있음요
            var theDayAfterTmrw = app.dateCalc.theDayAfterTomorrow();
            //theDayAfterTmrw=[일/요일] 순으로 들어있음요
            var selectedMovie= app.session.getSessionData('movie');
            app.template.reservFixed();
            $('#option-box>ul>li:first-child').css({'background-image':app.session.movie(selectedMovie)});
            $('.option-title.theater').text(app.session.getSessionData('theater'));
            $('#content').addClass('date-content').append(app.compUI.div('datepicker'));
            $('.date-content').append(app.compUI.divC('layer-darker'));
         /*   $('#container').addClass('layer-darker');
            $('#option-box>ul>li:last-child').css({'z-index':'500'});*/
            $('.option-title.date').addClass('lheight-none');
            $('.option-title.date.lheight-none').html(app.compUI.p('small-font'));
            $('.small-font').text('오늘');
            $('.option-title.date').append(app.compUI.p('big-font'));
            $('.big-font').text(date[1]+'월 '+date[2]+'일('+date[3]+')');
            $('.date-content').append(app.compUI.div('date-notice'));
            $('#date-notice').append(app.compUI.i('fa fa-hand-o-right'));
            $('#date-notice>i').attr('aria-hidden','true');
            $('#date-notice').append(app.compUI.p('notice-txt'));
            $('.notice-txt').text('예매가능한 날짜를 선택해주세요.');
            $('#datepicker').append(app.compUI.ul());
            $('#datepicker>ul').append(app.compUI.li());
            $('#datepicker>ul>li:first-child').append(app.compUI.p('year-txt'));
            $('#datepicker>ul>li:first-child').append(app.compUI.p('month-txt'));
            $('.year-txt').text(date[0]);
            $('.month-txt').text(date[1]);
            $('#datepicker>ul').append(app.compUI.li());
            $('#datepicker>ul>li:nth-child(2)').attr('id','date01').append(app.compUI.spanC('day-txt today'));
            $('#datepicker>ul>li:nth-child(2)').append(app.compUI.spanC('date-txt today'));
            $('.day-txt.today').text(date[3]);
            $('.date-txt.today').text(date[2]);
            $('#datepicker>ul').append(app.compUI.li());
            $('#datepicker>ul>li:nth-child(3)').attr('id','date02').append(app.compUI.spanC('day-txt tmrw'));
            $('#datepicker>ul>li:nth-child(3)').append(app.compUI.spanC('date-txt tmrw'));
            $('.day-txt.tmrw').text(tmrw[1]);
            $('.date-txt.tmrw').text(tmrw[0]);
            $('#datepicker>ul').append(app.compUI.li());
            $('#datepicker>ul>li:last-child').attr('id','date03').append(app.compUI.spanC('day-txt after-tmrw'));
            $('#datepicker>ul>li:last-child').append(app.compUI.spanC('date-txt after-tmrw'));
            $('.day-txt.after-tmrw').text(theDayAfterTmrw[1]);
            $('.date-txt.after-tmrw').text(theDayAfterTmrw[0]);
            $('.option-title.theater').click(e=>{
                e.preventDefault();
                app.theater.onCreate();
            });
            $('.back-btn').click(e=> {
                //alert('app.date>뒤로가기');
                e.preventDefault();
                app.date.onCreate();
            });
            /*        $('.back-btn').click(e=> {
             e.preventDefault();
             alert('app.date>뒤로가기');
             app.date.onCreate();
             });*/
            $('#option-box>ul>li:last-child,#datepicker>ul>li:first-child').click('false');
            $('#datepicker>ul>li').on('click',function (e) {
                e.preventDefault();
                var selectedId = $(this).attr('id');
                app.session.init('selectedDate',$('#'+selectedId+' .date-txt').text());
                app.session.init('selectedDay',$('#'+selectedId+' .day-txt').text());
                $('.layer-darker,#datepicker,#date-notice').remove();
                $('#option-box>ul>li:last-child').html(app.compUI.divC('tag date'));
                $('.tag.date').text('날짜');
                $('#option-box>ul>li:last-child').append(app.compUI.divC('option-title date'));
                $('.option-title.date').text(app.session.getSessionData('thisMonth')+'월 '+app.session.getSessionData('selectedDate')+'일 '+'('+app.session.getSessionData('selectedDay')+')');
                $('#content').append(app.compUI.div('selected-options'));
                $('#selected-options').append(app.compUI.div('selected-theater'));
                $('#selected-theater').text(app.session.getSessionData('theater'));
                $('#selected-options').append(app.compUI.div('timetable-box'));
                $('#timetable-box').append(app.compUI.divC('screen-box'));
                $('.screen-box').append(app.compUI.spanC('screen-num'));
                $('.screen-num').text('3관');
                $('.screen-box').append(app.compUI.spanC('total-seats'));
                $('.total-seats').text('총 224석');
                $('#timetable-box').append(app.compUI.divC('schedule-box'));
                $('.timetable-box').append(app.compUI.divC('schedule-box'));
                $('.schedule-box').append(app.compUI.ul());
                var i,j;
                for(i=0;i<1;i++){
                    $('.schedule-box>ul').append(app.compUI.liC('schedule0'+(i+1)));
                    for(j=0;j<1;j++){
                        $('.schedule0'+(i+1)).append(app.compUI.divC('bTime'));
                        $('.schedule0'+(i+1)).append(app.compUI.divC('eTime'));
                        $('.schedule0'+(i+1)).append(app.compUI.divC('aSeat'));
                    }
                }
                $('.schedule01 .bTime').text('16:20');
                $('.schedule01 .eTime').text('~18:31');
                $('.schedule01 .aSeat').text('47석');

                $('.schedule-box>ul>li').on('click',function () {
                    var selectedTime = $(this).attr('class');
                    app.session.init('beginTime',$('.'+selectedTime+' .bTime').text());
                    app.session.init('endTime',$('.'+selectedTime+' .eTime').text());
                    app.seat.onCreate();
                });
/*                var schedules = new Array();
                schedules[0] = new Object();
                schedules[1] = new Object();
                schedules[2] = new Object();

                schedules[0]['bTime']='18:10';
                schedules[0]['eTime']='~20:09';
                schedules[0]['aSeat']='217석';

                schedules[1]['bTime']='20:30';
                schedules[1]['eTime']='~22:29';
                schedules[1]['aSeat']='221석';

                schedules[2]['bTime']='22:50';
                schedules[2]['eTime']='~24:49';
                schedules[2]['aSeat']='200석';
                var scheduleBox = '';
                var scheduleListHTML = '';
                $.each(schedules,(i,o)=>{
                    scheduleBox+=
                   $.each(o,(k,v)=>{
                       scheduleListHTML += '<li id="time0"'+i+1 +'>'+o.bTime+'</li>'
                       scheduleListHTML += '<li id="time0"'+i+1 +'>'+o.eTime+'</li>'
                       scheduleListHTML += '<li id="time0"'+i+1 +'>'+o.aSeat+'</li>'
                   });
                });*/


            });
        });
    }
    return {onCreate:onCreate};
})();
app.seat=(function () {
    var onCreate = function () {
        setContentView();
        $('.back-btn').click(e=>{
            e.preventDefault();
            app.date.onCreate();
        });
        $('#seats>ul>li').on('click',function (e) {
            e.preventDefault();
            var selectedSeat = $(this).attr('class');
           app.session.init('seat',selectedSeat);
           $('.'+selectedSeat).toggleClass('active');
           //alert('선택한 자리이름:::'+ selectedSeat);
        });
        $('#confirm-btn').click(e=>{
            e.preventDefault();
            app.payment.onCreate();
        });
    }
    var setContentView=function () {
        $('body').html(app.compUI.div('wrapper'));
        app.template.header();
        $('#header-left').addClass('back-btn');
        $('.back-btn').append(app.compUI.i('fa fa-angle-left'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('#header-title').addClass('header-title-txt');
        $('.header-title-txt').text('좌석선택');
        app.template.body('seat-container','seat-content');
        $('#content').append(app.compUI.div('seat-box'));
        $('#seat-box').append(app.compUI.div('screen'));
        $('#screen').text('SCREEN');
        $('#seat-box').append(app.compUI.div('seats'));
        var arr = ['A','B','C','D','E','F','G','H','I','J'];
        var seatHTML ='';
        var j;
        $.each(arr,(i,v)=>{
            seatHTML += '<ul id="row'+(i+1)+'">'
            for(j=1;j<9;j++){
                seatHTML += '<li class="'+(v+j)+'">'+arr[i]+j+'</li>';
            }
            seatHTML += '</ul>';
        });
        $('#seats').append(seatHTML);
        $('#content').append(app.compUI.footer());
        $('footer').append(app.compUI.div('seat-desc'));
        $('#seat-desc').append(app.compUI.ul());
        $('#seat-desc>ul').append(app.compUI.liC('available-desc'));
        $('.available-desc').append(app.compUI.divC('seat-icon'));
        $('.available-desc').append(app.compUI.divC('seat-text'));
        $('#seat-desc>ul').append(app.compUI.liC('reserved-desc'));
        $('.reserved-desc').append(app.compUI.divC('seat-icon'));
        $('.reserved-desc').append(app.compUI.divC('seat-text'));
        $('#seat-desc>ul').append(app.compUI.liC('selected-desc'));
        $('.selected-desc').append(app.compUI.divC('seat-icon'));
        $('.selected-desc').append(app.compUI.divC('seat-text'));
        $('.available-desc .seat-text').text('예약가능');
        $('.reserved-desc .seat-text').text('예약완료');
        $('.selected-desc .seat-text').text('선택좌석');
        $('footer').append(app.compUI.div('footer-box'));
        $('#footer-box').append(app.compUI.div('price'));
        $('#price').append(app.compUI.spanC('price-text1'));
        $('#price').append(app.compUI.spanC('price-text2'));
        $('#price').append(app.compUI.spanC('price-text3'));
        $('.price-text1').text('결제금액');
        $('.price-text2').text('11,000');
        $('.price-text3').text('원');
        $('#footer-box').append(app.compUI.div('confirm-btn'));
        $('#confirm-btn').append(app.compUI.i('fa fa-check'));
        $('#confirm-btn>i').attr('aria-hidden','true');
        $('#confirm-btn').append(app.compUI.spanC('confirm-text'));
        $('.confirm-text').text('선택완료');
    }
    return{onCreate:onCreate}
})();
app.payment =(function (){
    var onCreate=function () {
        setContentView();
        $('.back-btn').click(e=>{
            e.preventDefault();
            app.seat.onCreate();
        });
        $('#payment-btn').click(e=>{
            e.preventDefault();
            if($('#pay-name').val()===''|| $('#pay-price').val()===''){
                alert('구매정보를 입력해주세요!');
            }
            else{
                if(app.valid.isName($('#pay-name').val())==="yes"){
                    if(app.valid.isNumber($('#pay-price').val()*1)){
                        app.complete.onCreate();
                    }
                    else{
                        alert('결제금액에는 숫자만 입력 가능합니다.')
                        $('#pay-price').val('');
                    }
                }
                else{
                    alert('구매자명을 확인해주세요.')
                    $('#pay-name').val('');
                    $('#pay-price').val('');
                }
            }
        });
    }
    var setContentView=function () {
        $('body').html(app.compUI.div('wrapper'));
        app.template.header();
        $('#header-left').addClass('back-btn');
        $('.back-btn').append(app.compUI.i('fa fa-angle-left'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('#header-title').addClass('header-title-txt');
        $('.header-title-txt').text('결제하기');
        app.template.body('payment-container','payment-content');
        $('#content').append(app.compUI.div('selected-box'));
        $('#selected-box').append(app.compUI.div('movie-title'));
        $('#movie-title').text(app.session.getSessionData('movie'));
        $('#selected-box').append(app.compUI.div('movie-details'));
        $('#movie-details').append(app.compUI.div('movie-poster'));
        var selectedMovie=app.session.getSessionData('movie');
        $('#movie-poster').css({'background-image':app.session.movie(selectedMovie)});
        $('#movie-details').append(app.compUI.div('detail-info'));
        $('#detail-info').append(app.compUI.ul());
        var timeInfo = app.session.getSessionData('thisYear')+'-'+app.session.getSessionData('thisMonth')+'-'+app.session.getSessionData('selectedDate')+'('+app.session.getSessionData('selectedDay')+') '+app.session.getSessionData('beginTime');
        var theaterInfo = app.session.getSessionData('theater');
        var seatInfo = app.session.getSessionData('seat');
        var row = seatInfo.substr(0,1);
        var seatNo= seatInfo.substr(1,1);
        var arr = [timeInfo,theaterInfo,'일반 1명',row+'열'+seatNo+'번'];
        var detailHTML='';
        $.each(arr,(i,v)=>{
            detailHTML += '<li>'+v+'</li>'
        });
        $('#detail-info>ul').append(detailHTML);
        $('#content').append(app.compUI.div('payment-form'));
        $('#payment-form').append(app.compUI.div('payment-title'));
        $('#payment-title').text('구매자명 + 금액');
        $('#payment-form').append(app.compUI.div('payment-content'));
        $('#payment-content').append(app.compUI.div('input-box'));
        $('#input-box').append(app.compUI.div('name-box'));
        $('#name-box').append(app.compUI.spanC('payment-txt'));
        $('#name-box>span').text('구매자명');
        $('#name-box').append(app.compUI.input('pay-name','text'));
        $('#pay-name').attr('placeholder','한글 또는 영문(대소문자 구분)').attr('data-role','none');
        $('#input-box').append(app.compUI.div('price-box'));
        $('#price-box').append(app.compUI.spanC('payment-txt'));
        $('#price-box>span').text('결제금액');
        $('#price-box').append(app.compUI.input('pay-price','text'));
        $('#pay-price').attr('placeholder','숫자만 입력').attr('data-role','none');
        $('#payment-content').append(app.compUI.div('payment-btn'));
        $('#payment-btn').text('확 인');
        $('#payment-form').append(app.compUI.div('payment-notice'));
        var noticeHTML = '';
        noticeHTML+='<p>유의 사항! </p>'
        noticeHTML += '<span>- 관람 등급을 반드시 확인해주시기 바랍니다.</span><br>';
        noticeHTML += '<span>- 만 4세(48개월) 이상부터는 영화티켓을 반드시 구매하셔야 입장 가능합니다.</span><br>';
        noticeHTML+= '<span>- 예매 변경은 불가능하며, 취소 후 재 예매를 하셔야만 합니다.</span><br>';
        noticeHTML+= '<span>- 상영시간 이후 관람하신 영화의 영수증 출력을 원하실 경우, 관람하신 영화관에서 출력 가능합니다.</span>';
        $('#payment-notice').html(noticeHTML);

    }
    return {onCreate:onCreate}
})();
app.complete =(()=>{
    var onCreate=()=>{
        setContentView();
        $('#go-main-btn').click(e=>{
            e.preventDefault();
            app.main.onCreate();
        });
    };
    var setContentView =()=>{
        $('body').html(app.compUI.div('wrapper'));
        app.template.body('complete-container','complete-content');
        $('#content').append(app.compUI.div('complete-msg'));
        $('#complete-msg').text('결제가 완료되었습니다.');
        $('#content').append(app.compUI.div('go-main-btn'));
        $('#go-main-btn').text('메인으로');

    }
    return {onCreate:onCreate}
})();

app.dateCalc={
    today:()=>{
       var week =new Array('일','월','화','수','목','금','토');
       var today=new Date();
       var year=today.getFullYear();
       var month=today.getMonth()+1;
       var day=today.getDate();
       var dayName = week[today.getDay()];
       var date=new Array(year,month,day,dayName);
       return date;
    },
    tomorrow:()=>{
        var week =new Array('일','월','화','수','목','금','토');
        var today=new Date();
        var day=today.getDate()+1;
        var dayName;
        if(today.getDay()==6){
            dayName = week[0];
        }
        else{
            dayName = week[today.getDay()+1];
        }
        var date=new Array(day,dayName);
        return date;
    },
    theDayAfterTomorrow:()=>{
        var week =new Array('일','월','화','수','목','금','토');
        var today=new Date();
        var day=today.getDate()+2;
        var dayName;
        if(today.getDay()==5){
            dayName = week[0];
        }
        else if(today.getDay()==6){
            dayName = week[1];
        }
        else{
            dayName = week[today.getDay()+2];
        }
        var date=new Array(day,dayName);
        return date;
    }
}
app.template={
    header :()=>{
        $('#wrapper').append(app.compUI.header());
        $('header').append(app.compUI.div('header-box'));
        $('#header-box').append(app.compUI.span('header-left'));
        $('#header-box').append(app.compUI.span('header-title'));
        $('#header-box').append(app.compUI.span('header-right'));
    },
    body :(x,y)=>{
        $('#wrapper').append(app.compUI.div('container'));
        $('#container').addClass(x);
        $('#container').append(app.compUI.div('content'));
        $('#content').addClass(y);
    },
    theater:()=>{
        $('body').html(app.compUI.div('wrapper'));
        app.template.header();
        $('#header-left').addClass('close-btn');
        $('.close-btn').append(app.compUI.i('fa fa-times'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('#header-title').addClass('header-title-txt');
        $('.header-title-txt').text('영화관 선택');
        $('#header-right').addClass('finish-btn');
        $('.finish-btn').text('선택완료');
        app.template.body('theater-container','theater-content');
        $('.theater-content').html(app.compUI.div('category-box'));
        $('#category-box').append(app.compUI.ul());
        $('#category-box>ul').append(app.compUI.li());
        $('#category-box>ul>li:first-child').text('지역별').addClass('active');
        $('#category-box>ul').append(app.compUI.li());
        $('#category-box>ul>li:last-child').text('특별관');
        $('.theater-content').append(app.compUI.div('region-box'));
        $('#region-box').append(app.compUI.div('region-city'));
        $('#region-city').append(app.compUI.ul());
        $('#region-city>ul').append(app.compUI.li());
        $('#region-city>ul>li').text('서울').addClass('active');
        $('#region-box').append(app.compUI.div('region-town'));
        $('#region-town').append(app.compUI.ul());
    },
    reservFixed :()=>{
        $('body').html(app.compUI.div('wrapper'));
        app.template.header();
        $('#header-left').addClass('back-btn');
        $('.back-btn').append(app.compUI.i('fa fa-angle-left'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('#header-title').addClass('header-title-txt');
        $('.header-title-txt').text('영화별 예매');
        app.template.body('rsrv-container','rsrv-content');
        $('#content').html(app.compUI.div('option-box'));
        $('#option-box').append(app.compUI.ul());
        $('#option-box>ul').append(app.compUI.li());
        $('#option-box>ul>li:first-child').append(app.compUI.divC('tag movie'));
        $('.tag.movie').text('영화');
        $('#option-box>ul>li:first-child').append(app.compUI.divC('option-title'));
        $('#option-box>ul').append(app.compUI.li());
        $('#option-box>ul>li:nth-child(2)').append(app.compUI.divC('tag theater'));
        $('.tag.theater').text('영화관');
        $('#option-box>ul>li:nth-child(2)').append(app.compUI.divC('option-title theater'));
        $('.option-title.theater').text('영화관 선택');
        $('#option-box>ul').append(app.compUI.li());
        $('#option-box>ul>li:last-child').append(app.compUI.divC('tag date'));
        $('.tag.date').text('날짜');
        $('#option-box>ul>li:last-child').append(app.compUI.divC('option-title date'));
        $('.option-title.date').text('날짜 선택');

    }
};
app.cookie={
    setCookie:(k,v)=>{
        document.cookie = k+"=" +v;
    },
    getCookie:k=>{
        var x = k+ "=";
        var i = 0;
        var arr= document.cookie.split(';');
        for(i=0;i<arr.length;i++){
            var j = arr[i];
            while(j.charAt(0)==''){
                j=j.substring(1,j.length)
            }
            if(j.indexOf(x)==0){
                return j.substring(x.length,j.length);
            }
            return null;
        }
    },
    removeCookie: k=>{

    }
};
app.compUI = {
    br    :()=>{return $('<br/>');},
    p     :x=>{return $('<p/>',{class:x});},
    div   : x=>{return $('<div/>',{id:x});},
    divC  : x=>{return $('<div>',{class:x});},
    header : ()=>{return $('<header/>');},
    footer : ()=>{return $('<footer/>')},
    h1    : x=>{return $('<h1/>',{id:x});},
    span  : x=>{return $('<span/>',{id:x});},
    spanC : x=>{return $('<span/>',{class:x});},
    iTxt  : x=>{return $('<input/>',{id:x,type:'text'});},
    aBtn  : x=>{return $('<a/>',{href:'#', role: 'button', id:x});},
    iBtn  : x=>{return $('<input/>',{id:x,type:'button'});},
    image : (x,y)=>{return $('<img/>',{id:x,src:y});},
    table : x=>{return $('<table/>',{id:x})},
    tr :()=>{return $('<tr/>')},
    td :()=>{return $('<td/>')},
    input : (x,y)=>{return $('<input/>',{id:x,type:y});},
    btn : x=>{return $('<button>',{id:x})},
    nav: x=>{return $('<nav/>',{id: x});},
    a : ()=>{return $('<a/>',{href:'#'})},
    i : x=>{return $('<i/>',{class:x})},
    ul:()=>{return $('<ul/>')},
    li:()=>{return $('<li/>')},
    liC:x=>{return $('<li/>', {class:x})}
};
app.session = {
    init :(k,v)=>{
        sessionStorage.setItem(k,v);
    },
    getSessionData : k=>{
      return sessionStorage.getItem(k);
    },
movie:x=>{
    var imgURL;
    $.ajax({
        async : false,
        url:'json/movie.json',
        type: 'post',
        dataType:'json',
        success:d=>{
                var arr=d;
                switch(x){
                    case "매트릭스":
                        imgURL= 'url('+d[0].poster+')';
                        break;
                    case "인셉션":
                        imgURL= 'url('+d[1].poster+')';
                        break;
                    case "소셜네트워크":
                        imgURL= 'url('+d[2].poster+')';
                        break;
                }
            },
            error:e=>{
                alert('error');
            }
        });
    return imgURL
    }
};
app.valid ={
    isName : x=>{
        var name_regex = /^[가-힣a-zA-Z]*$/;
        return name_regex.test(x)?"yes":"no";
    },
    isNumber : x=>{
        return typeof x === 'number' && isFinite(x);
    }
};
(function () {
   app.initialize();
});
app.initialize();