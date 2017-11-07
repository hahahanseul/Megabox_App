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
app.member=(()=>{
    var onCreate =function () {
        setContentView();
        $('#signup-btn').click(e=>{
            e.preventDefault();
            alert('구현되지 않은 기능입니다.');
        });
        $('#signin-btn').click(e=>{
            e.preventDefault();
            var id = $('#id').val();
            var password= $('#password').val();
            if(id===undefined || id ===""){
                alert('아이디를 입력하세요!');
                $('#id').focus();
                return;
            }
            else if (password === undefined || password ===""){
                alert('비밀번호를 입력하세요');
                $('#password').focus();
            }
            $.ajax({
                async : false,
                url:'json/member.json', // ctx + '/member/signin'
                type: 'post',
                data: {
                    id:id,
                    password:password
                },
                dataType:'json',
                success:d=>{
                    $.each(d,(i,o)=>{
                        if(o.id===id && o.password === password){
                            checkval = true;
                           // alert(id+"님 환영합니다!");
                            return false;
                        }else{
                            checkval = false;
                        }
                    });
                    if(checkval==true){
                        app.main.onCreate();
                        app.session.init('id',id);
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
        $('#wrapper').append(app.compUI.divC('member-container'));
        $('.member-container').append(app.compUI.divC('member-content'));
        $('.member-content').append(app.compUI.div('main-img'));
        $('.member-content').append(app.compUI.input('id','text'));
        $('#id').attr('placeholder','ID를 입력하세요').attr('data-role','none').val('master');
        $('.member-content').append(app.compUI.input('password','password'));
        $('#password').attr('placeholder','비밀번호를 입력하세요').attr('data-role','none').val('1');
        $('.member-content').append(app.compUI.btn('signin-btn'));
        $('.member-content').append(app.compUI.btn('signup-btn'));
        $('#signin-btn').text('로그인').addClass('btn btn-default');
        $('#signup-btn').text('회원가입').addClass('btn btn-default');
    };
    return{onCreate:onCreate};
})();
app.main = (()=>{
    var onCreate = function () {
        setContentView();
        $('.menu-btn').click(e=>{
            e.preventDefault();
            alert('구현되지 않은 기능입니다.');
        });
        $('#rsrv-btn').click(e=>{
            e.preventDefault();
            if($('#title').text()==='토르:라그나로크'){
                app.session.init('movie', '토르:라그나로크');
                app.ajaxList.main('토르:라그나로크');
            }
            app.reservation.onCreate();
        });
        $('#header-title').click(e=>{
            e.preventDefault();
            $('#movie-list').empty();
            $('#wrapper').toggleClass('layer-dark');
            $('#wrapper').append(app.compUI.div('movie-list'));
            $('#movie-list').append(app.compUI.ul());
            app.ajaxList.movie();
            $('#movie-list').toggle();
            $('#header-title>i').toggleClass('fa-angle-double-down fa-angle-double-up');
            // $('#wrapper').toggleClass('layer-dark');
            $('#movie-list>ul>li').on('click',function (e) {
                e.preventDefault();
                var movie = $(this).attr('id');
                var  selectedMovie = $('#'+movie).text();
                app.session.init('movie', selectedMovie);
                onCreate();
                app.ajaxList.main(selectedMovie);
            });
            $('#rsrv-btn').addClass('movie-select');
        });
    };
    var setContentView = function () {
        $('body').html(app.compUI.div('wrapper'));
        app.template.header();
        $('#wrapper').append(app.compUI.divC('main-container'));
        $('.main-container').append(app.compUI.divC('main-content'));
        $('#header-left').addClass('menu-btn');
        $('.menu-btn').append(app.compUI.i('fa fa-bars'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('#header-title').addClass('select-btn');
        $('.select-btn').text('영화선택 ').append(app.compUI.i('fa fa-angle-double-down'));
         $('.main-content').html(app.compUI.div('img-box'));
         $('.main-content').append(app.compUI.div('movie-info'));
         $('#movie-info').append(app.compUI.div('title'));
         $('#movie-info').append(app.compUI.div('border'));
         $('#movie-info').append(app.compUI.div('details'));
         $('#details').append(app.compUI.div('rate'));
         $('#details').append(app.compUI.div('genre'));
         $('#title').text('토르:라그나로크');
         $('#rate').text('130분');
         $('#genre').text('SF, 액션, 판타지');
         $('#img-box').css('background-image','url(http://www.joblo.com/posters/images/full/Thor-Ragnarok-international-poster-1-large.jpg)')
         $('.main-content').append(app.compUI.div('rsrv-btn'));
         $('#rsrv-btn').text('예매하기');
    };
    return {onCreate:onCreate};
})();
app.reservation =(()=>{
    var onCreate =function () {
        setContentView();
        $('#category-box>ul>li:nth-child(2)').click(e=>{
            e.preventDefault();
            alert('구현되지 않은 기능입니다.');
        });
        var movieImg=app.session.getSessionData('img');
        $('#option-box>ul>li:first-child').css({'background-image':'url('+movieImg+')'});
        $('.go-main-btn1').click(e=>{
            app.main.onCreate();
        });
        $('.option-title.theater').click(e=>{
            e.preventDefault();
            $('.rsrv-header, .rsrv-content').hide();
            $('header').addClass('theater-header');
            $('#header-left').addClass('close-btn');
            $('.close-btn').append(app.compUI.i('fa fa-times'));
            $('#header-left>i').removeClass('fa-angle-left');
            $('#header-box>span>i').attr('aria-hidden','true');
            $('#header-title').addClass('header-title-txt2');
            $('.header-title-txt2').text('영화관 선택');
            $('#header-right').addClass('finish-btn');
            $('.finish-btn').text('선택완료');
            $('.theater-header,.theater-content').show();
            $('#region-town>ul>li').on('click',function (e) {
                e.preventDefault();
                var theater = $(this).attr('id');
                var theaterName = $('#'+theater).text();
                app.session.init('theater', theaterName);
                $(this).parent("ul").find("li").removeClass("active");
                $(this).addClass("active");
                if($('#region-town>ul>li').hasClass("active")){
                    $('.finish-btn').addClass('active');
                    $('.finish-btn').click(e=>{
                        e.preventDefault();
                        $('.theater-header, .theater-content').hide();
                        app.reservation.onCreate();
                        $('.option-title.date').addClass('date-select');
                        $('.option-title.theater').text(app.session.getSessionData('theater'));
                        var date = app.dateCalc.today();
                        //date =[년/월/일/요일] 순으로 들어있음요
                        var thisYear = app.session.init('thisYear',date[0]);
                        var thisMonth = app.session.init('thisMonth',date[1]);
                        $('.option-title.date').addClass('lheight-none');
                        $('.option-title.date.lheight-none').html(app.compUI.p('small-font'));
                        $('.small-font').text('오늘');
                        $('.option-title.date').append(app.compUI.p('big-font'));
                        $('.big-font').text(date[1]+'월 '+date[2]+'일('+date[3]+')');
                    });
                }else{
                    $('.finish-btn').click('false');
                }
            });
            $('.close-btn').click(e=>{
                e.preventDefault();
                app.reservation.onCreate();
            });
        });
        $('.option-title.date').on('click',function (e) {
                e.preventDefault();
                if($(this).hasClass('date-select')){
                    $('#header-left').removeClass('go-main-btn1').addClass('back-btn');
                    $('#datepicker,.layer-darker').show();
                    var date = app.dateCalc.today();
                    //date =[년/월/일/요일] 순으로 들어있음요
                    var thisYear = date[0];
                    app.session.init('thisYear',thisYear);
                    var tmrw = app.dateCalc.tomorrow();
                    //tmrw  =[일/요일/월] 순으로 들어있음요
                    var theDayAfterTmrw = app.dateCalc.theDayAfterTomorrow();
                    //theDayAfterTmrw=[일/요일/월] 순으로 들어있음요
                    var thisMonth = '';
                    $('.option-title.date').addClass('lheight-none');
                    $('.option-title.date.lheight-none').html(app.compUI.p('small-font'));
                    $('.small-font').text('오늘');
                    $('.option-title.date').append(app.compUI.p('big-font'));
                    $('.big-font').text(date[1]+'월 '+date[2]+'일('+date[3]+')');
                    $('.rsrv-content').append(app.compUI.div('date-notice'));
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
                    $('#option-box>ul>li:last-child,#datepicker>ul>li:first-child').click('false');
                    $('#datepicker>ul>li').on('click',function (e) {
                        e.preventDefault();
                        $('.back-btn').click(e=>{
                            e.preventDefault();
                            app.main.onCreate();
                        });
                        var selectedId = $(this).attr('id');
                        app.session.init('selectedDate',$('#'+selectedId+' .date-txt').text());
                        app.session.init('selectedDay',$('#'+selectedId+' .day-txt').text());
                        if(selectedId === 'date01'){
                           thisMonth = date[1];
                        }
                        else if(selectedId === 'date02'){
                            if($('#'+selectedId+' .date-txt').text()==='1'){
                                thisMonth = parseInt(date[1])+1;
                            }
                            else{
                                thisMonth = date[1];
                            }
                        }
                       else if(selectedId == 'date03'){
                            if($('#'+selectedId+' .date-txt').text()==='1' || $('#'+selectedId+' .date-txt').text()==='2' ){
                                thisMonth = parseInt(date[1])+1;
                            } else{
                                thisMonth = date[1];
                            }
                        }
                        app.session.init('thisMonth',thisMonth);
                        $('.layer-darker,#datepicker,#date-notice').remove();
                        $('#option-box>ul>li:last-child').html(app.compUI.divC('tag date'));
                        $('.tag.date').text('날짜');
                        $('#option-box>ul>li:last-child').append(app.compUI.divC('option-title date'));
                        $('.option-title.date').text(app.session.getSessionData('thisMonth')+'월 '+app.session.getSessionData('selectedDate')+'일 '+'('+app.session.getSessionData('selectedDay')+')');

                        $('.rsrv-content').append(app.compUI.div('selected-options'));
                        $('#selected-options').html(app.compUI.div('selected-theater'));
                        $('#selected-theater').text(app.session.getSessionData('theater'));
                        $('#selected-options').append(app.compUI.div('timetable-box'));
                        $('#timetable-box').append(app.compUI.divC('screen-box'));
                        $('.screen-box').append(app.compUI.spanC('screen-num'));
                        $('.screen-num').text('3관');
                        $('.screen-box').append(app.compUI.spanC('total-seats'));
                        $('.total-seats').text('30석');
                        $('#timetable-box').append(app.compUI.divC('schedule-box'));
                        $('.schedule-box').append(app.compUI.ul());
                        app.ajaxList.schedule();
                        $('.schedule-box>ul>li').on('click',function () {
                            var selectedTime = $(this).attr('class');
                            app.session.init('beginTime',$('.'+selectedTime+' .bTime').text());
                            app.session.init('endTime',$('.'+selectedTime+' .eTime').text());
                            app.seat.onCreate();
                        });
                    });
                    $('.back-btn').click(e=>{
                        e.preventDefault();
                        $('#datepicker,.layer-darker').hide();
                        app.reservation.onCreate();
                        $('.option-title.date').addClass('date-select');
                        $('.option-title.theater').text(app.session.getSessionData('theater'));
                        var date = app.dateCalc.today();
                        //date =[년/월/일/요일] 순으로 들어있음요
                        var thisYear = app.session.init('thisYear',date[0]);
                        var thisMonth = app.session.init('thisMonth',date[1]);
                        $('.option-title.date').addClass('lheight-none');
                        $('.option-title.date.lheight-none').html(app.compUI.p('small-font'));
                        $('.small-font').text('오늘');
                        $('.option-title.date').append(app.compUI.p('big-font'));
                        $('.big-font').text(date[1]+'월 '+date[2]+'일('+date[3]+')');
                    });
                }else{
                    alert('영화관 먼저 선택해주세요.');
                }
        });
    }
    var setContentView = function () {
        $('body').html(app.compUI.div('wrapper'));
        app.template.header();
        //예매창 헤더
        $('header').addClass('rsrv-header');
        $('#header-left').addClass('go-main-btn1');
        $('.go-main-btn1').append(app.compUI.i('fa fa-angle-left'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('#header-title').addClass('header-title-txt1');
        $('.header-title-txt1').text('영화별 예매');
        $('.rsrv-header').show();
        //영화관선택 헤더

        $('#wrapper').append(app.compUI.div('container'));
        //예매창 컨텐트
        app.template.reservation();
        $('.rsrv-content').show();

        //영화관선택 컨텐트
        app.template.theater();

        //날짜선택 컨텐트
        app.template.date();
    };
    return {onCreate:onCreate};
})();
app.seat=(()=>{
    var onCreate = function () {
        setContentView();
        var adultTotal = 0;
        var childTotal = 0;
        var total = 0;
        app.amount.onCreate(adultTotal,childTotal,total);
        if(total>4){
            $('.adult.plus').click(e=>{
                e.preventDefault();
                alert('최대선택인원 초과라능');
            });
            $('.child.plus').click(e=>{
                e.preventDefault();
                alert('최대선택인원 초과라능');
            });
        }
        $('.back-btn').click(e=>{
            e.preventDefault();
            alert('뒤로버튼');
            app.reservation.onCreate();
            $('.option-title.theater').text(app.session.getSessionData('theater'));
            $('.option-title.date').text(app.session.getSessionData('thisMonth')+'월 '+app.session.getSessionData('selectedDate')+'일 '+'('+app.session.getSessionData('selectedDay')+')');
            $('.option-title.date').addClass('date-select');
            $('.rsrv-content').append(app.compUI.div('selected-options'));
            $('#selected-options').append(app.compUI.div('selected-theater'));
            $('#selected-theater').text(app.session.getSessionData('theater'));
            $('#selected-options').append(app.compUI.div('timetable-box'));
            $('#timetable-box').append(app.compUI.divC('screen-box'));
            $('.screen-box').append(app.compUI.spanC('screen-num'));
            $('.screen-num').text('3관');
            $('.screen-box').append(app.compUI.spanC('total-seats'));
            $('.total-seats').text('총 30석');
            $('#timetable-box').append(app.compUI.divC('schedule-box'));
            $('.schedule-box').append(app.compUI.ul());
            app.ajaxList.schedule();
            $('.schedule-box>ul>li').on('click',function () {
                var selectedTime = $(this).attr('class');
                app.session.init('beginTime',$('.'+selectedTime+' .bTime').text());
                app.session.init('endTime',$('.'+selectedTime+' .eTime').text());
                app.seat.onCreate();
                adultTotal=0;
                childTotal=0;
            });
        });
        $('.close-btn').click(e=>{
            e.preventDefault();
            app.main.onCreate();
        });
        $('#seats>ul>li').on('click',function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            var total = app.session.getSessionData('amount');
            if($('#seats>ul>li.active').length>total) {
                alert('더 이상 좌석을 선택하실 수 없습니다.' +
                    '\n(현재 선택 인원 - 일반: ' + app.session.getSessionData('adult') + '명 / 청소년: ' + app.session.getSessionData('child') + '명)');
                $(this).removeClass('active');
            }
            else if($('#seats>ul>li.active').length==total){
                var adult = app.session.getSessionData('adult');
                var child = app.session.getSessionData('child');
                var totalPrice = adult * 11000 + child * 10000;
                $('.price-text2').text(totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","));
                $('#confirm-btn').addClass('active');
            }else{
                $('.price-text2').text('0');
                $('#confirm-btn').removeClass('active');
            }

        });
        $('#confirm-btn').click(e=>{
            e.preventDefault();
            var total = app.session.getSessionData('amount');
            if($('#seats>ul>li.active').length<total){
                alert('선택인원만큼 좌석을 지정해주세요.' +
                    '\n(현재 선택 인원 - 일반: ' + app.session.getSessionData('adult') + '명 / 청소년: ' + app.session.getSessionData('child') + '명)');
                return false;
            }
            var arr =$('#seats>ul>li.active').text();
            var selectedSeat = [];
            for(var i=0;i<$('#seats>ul>li.active').length;i++){
                selectedSeat[i]=arr.substring(2*i,2*i+2);
            }
            app.session.init('price',$('.price-text2').text());
            app.session.init('seat',selectedSeat);
            app.payment.onCreate();
        });
    }
    var setContentView=function () {
        $('body').html(app.compUI.div('wrapper'));
        app.template.header();
        //인원선택 헤더
        $('header').addClass('seat-header');
        $('#header-left').addClass('back-btn');
        $('.back-btn').append(app.compUI.i('fa fa-angle-left'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('#header-title').addClass('header-title-txt1');
        $('.header-title-txt1').text('인원선택');
        $('#header-right').addClass('close-btn');
        $('.close-btn').append(app.compUI.i('fa fa-times'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('.quantity-header').show();
        $('.quantity-header').show();
        $('#wrapper').addClass('layer-dark');
        $('#wrapper').append(app.compUI.div('container'));
        $('#container').addClass('quantity-list');
        $('.quantity-list').append(app.compUI.divC('quantity-content'));
        var quantityHTML = '';
        quantityHTML += '<ul>'
                    + '<li>'
                    +'<div class="quantity-txt adult">일반</div>'
                    +'<div class="amount adult">0</div>'
                    +'<div class="amount-btn adult minus">-</div>'
                    +'<div class="amount-btn adult plus">+</div>'
                    +'</li>'
                    + '<li>'
                    +'<div class="quantity-txt child">청소년</div>'
                    +'<div class="amount child">0</div>'
                    +'<div class="amount-btn child minus">-</div>'
                    +'<div class="amount-btn child plus">+</div>'
                    +'</li>'
                    +'<li>선택완료 <span style="font-size:12px"> (최대 4인)</span></li>'
                    +'</ul>';
        $('.quantity-content').html(quantityHTML);

        $('#container').addClass('seat-container');
        $('.seat-container').append(app.compUI.divC('seat-content'));
        $('.seat-content').html(app.compUI.div('seat-box'));
        $('#seat-box').append(app.compUI.div('screen'));
        $('#screen').text('SCREEN');
        $('#seat-box').append(app.compUI.div('seats'));
        var arr = ['A','B','C','D','E'];
        var seatHTML ='';
        var j;
        $.each(arr,(i,v)=>{
            seatHTML += '<ul id="row'+(i+1)+'">'
            for(j=1;j<7;j++){
                seatHTML += '<li class="'+(v+j)+'">'+arr[i]+j+'</li>';
            }
            seatHTML += '</ul>';
        });
        $('#seats').append(seatHTML);
        $('.seat-content').append(app.compUI.footer());
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
        $('.price-text2').text('0');
        $('.price-text3').text('원');
        $('#footer-box').append(app.compUI.div('confirm-btn'));
        $('#confirm-btn').append(app.compUI.i('fa fa-check'));
        $('#confirm-btn>i').attr('aria-hidden','true');
        $('#confirm-btn').append(app.compUI.spanC('confirm-text'));
        $('.confirm-text').text('선택완료');
        $('seat-container').hide();
    }
    return{onCreate:onCreate}
})();
app.amount =(()=>{
    var onCreate=(adultTotal,childTotal,total)=>{
        $('.adult.minus').click(e=>{
            e.preventDefault();
            if(adultTotal==0){
                $(this).click('false');
                alert('인원을 선택해주세요');
                return false;
            }
            adultTotal = adultTotal-1;
            $('.amount.adult').text(adultTotal);
        });
        $('.adult.plus').click(e=>{
            e.preventDefault();
            adultTotal = adultTotal+1;
            $('.amount.adult').text(adultTotal);
        });
        $('.child.minus').click(e=>{
            e.preventDefault();
            if(childTotal==0){
                $(this).click('false');
                alert('인원을 선택해주세요');
                return false;
            }
            childTotal = childTotal-1;
            $('.amount.child').text(childTotal);
        });
        $('.child.plus').click(e=>{
            e.preventDefault();
            childTotal = childTotal+1;
            $('.amount.child').text(childTotal);
        });
        $('.quantity-content>ul>li:last-child').click(e=>{
            total = adultTotal + childTotal;
            if(total==0){
                alert('인원을 선택해주세요.');
                return false;
            }
            if(total>4){
                alert('최대 4인까지 예매가능합니다.');
                $('.amount.child, .amount.adult').text('0');
                childTotal = 0;
                adultTotal =0;
                return false;
            }
            if(total=>1 && total <=4){
                app.session.init('adult',adultTotal);
                app.session.init('child',childTotal);
                app.session.init('amount',total);
                app.seat.onCreate();
                $('.header-title-txt1').text('좌석선택');
                $('#wrapper').removeClass('layer-dark');
                $('.quantity-content').hide();
                $('#container').removeClass('quantity-list');
                $('.seat-container, .seat-content').show();
                $('#content').removeClass('quantity-content');

            }
        });
    }
    return {onCreate:onCreate}
})();
app.payment =(()=>{
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
                var id=app.session.getSessionData('id');
                $.ajax({
                    async : false,
                    url:'json/member.json', // ctx + '/member/payment'
                    type: 'post',
                    data: {
                        id:id
                    },
                    dataType:'json',
                    success:d=>{
                        $.each(d,(i,o)=>{
                            d[i].id===id;
                            var list = d[i];
                            if(list.email===$('#pay-name').val()){
                                if(app.valid.isNumber($('#pay-price').val()*1)){
                                    if($('#pay-price').val().toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")===app.session.getSessionData('price')){
                                        app.complete.onCreate();
/*                                      var movieTitle = app.session.getSessionData('movie');
                                        $.ajax({
                                            async : false,
                                            url:'json/member.json', // ctx + '/make/reservation'
                                            type: 'post',
                                            data: {
                                                id:id
                                            },
                                            dataType:'json',
                                            success:d=>{},
                                            error:e=>{
                                                alert('error');
                                            }
                                        });*/
                                    }
                                    else{
                                        alert('결제금액이 다릅니다.');
                                    }
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
                        });
                    },
                    error:e=>{
                        alert('error');
                    }
                });
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
        $('#wrapper').append(app.compUI.divC('payment-container'));
        $('.payment-container').append(app.compUI.divC('payment-content'));
        $('.payment-content').append(app.compUI.div('selected-box'));
        $('#selected-box').append(app.compUI.div('movie-title'));
        $('#movie-title').text(app.session.getSessionData('movie'));
        $('#selected-box').append(app.compUI.div('movie-details'));
        $('#movie-details').append(app.compUI.div('movie-poster'));
        var movieImg =app.session.getSessionData('img');
        $('#movie-poster').css({'background-image':'url('+movieImg+')'});
        $('#movie-details').append(app.compUI.div('detail-info'));
        $('#detail-info').append(app.compUI.ul());
        var detailHTML = '';
        var timeInfo = app.session.getSessionData('thisYear')+'-'+app.session.getSessionData('thisMonth')
            +'-'+app.session.getSessionData('selectedDate')+'('+app.session.getSessionData('selectedDay')+') '+app.session.getSessionData('beginTime');
        var theaterInfo = app.session.getSessionData('theater');
        var tickets;
        if(app.session.getSessionData('adult')!=0){
            if(app.session.getSessionData('child')!=0){
                tickets = '일반'+app.session.getSessionData('adult')+'명 / 청소년'+app.session.getSessionData('child')+'명';
            }
            else{
                tickets = '일반'+app.session.getSessionData('adult')+'명';
            }
        }
        else{
            if(app.session.getSessionData('child')!=0){
                tickets = '청소년'+app.session.getSessionData('child')+'명';
            }
        }
        detailHTML += '<li>'+timeInfo+'</li>';
        detailHTML += '<li>'+theaterInfo+'</li>';
        detailHTML += '<li>'+tickets+'</li>';

        var seatInfo = app.session.getSessionData('seat');
        var arr = seatInfo.split(',');
        var row, seatNo;
        var seats ='';
        for(var i=0;i<arr.length;i++){
            row = arr[i].substr(0,1) + '열';
            seatNo= arr[i].substr(1,1) + '번';
            seats += row+seatNo +"  ";
        }
        detailHTML += '<li>'+seats+'</li>'
        $('#detail-info>ul').append(detailHTML);

        $('.payment-content').append(app.compUI.div('payment-form'));
        $('#payment-form').append(app.compUI.div('payment-title'));
        $('#payment-title').text('구매자메일 + 금액');
        $('#payment-form').append(app.compUI.div('payment-content'));
        $('#payment-content').append(app.compUI.div('input-box'));
        $('#input-box').append(app.compUI.div('name-box'));
        $('#name-box').append(app.compUI.spanC('payment-txt'));
        $('#name-box>span').text('구매자메일');
        $('#name-box').append(app.compUI.input('pay-name','text'));
        $('#pay-name').attr('placeholder','이메일을 입력해주세요').attr('data-role','none');
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
        $('#go-confirm-btn').click(e=>{
            e.preventDefault();
            app.confirm.onCreate();
        });
    };
    var setContentView =()=>{
        $('body').html(app.compUI.div('wrapper'));
        $('#wrapper').html(app.compUI.div('complete-container'));
        $('#complete-container').append(app.compUI.div('complete-content'));
        $('#complete-content').append(app.compUI.div('complete-msg'));
        $('#complete-msg').text('결제가 완료되었습니다.');
        $('#complete-content').append(app.compUI.div('go-main-btn'));
        $('#go-main-btn').text('메인으로');
        $('#complete-content').append(app.compUI.div('go-confirm-btn'));
        $('#go-confirm-btn').text('예매내역 확인');

    }
    return {onCreate:onCreate}
})();
app.confirm =(()=>{
    var onCreate=()=>{
        setContentView();
        $('.home-btn').click(e=>{
            e.preventDefault();
            app.main.onCreate();
        });
    };
    var setContentView =()=>{
        $('body').html(app.compUI.div('wrapper'));
        app.template.header();
        $('#header-left').addClass('home-btn');
        $('.home-btn').append(app.compUI.i('fa fa-home'));
        $('#header-box>span>i').attr('aria-hidden','true');
        $('#header-title').text('예매내역 확인');
        $('#wrapper').append(app.compUI.divC('confirm-container'));
        $('.confirm-container').append(app.compUI.divC('confirm-content'));
        $('.confirm-content').append(app.compUI.div('booking-list'));
        $('#confirm-content').append(app.compUI.ul());
        $('#confirm-content>ul>li').append(app.compUI.li());



    };
    return{onCreate:onCreate}
})();
app.appendList={
    main:x=>{
        $('#title').text(x.movieTitle);
        $('#rate').text(x.runningTime);
        $('#genre').text(x.genre);
        $('#img-box').css('background-image','url('+x.image +')')
    },
    movie:(x,i)=>{
        var movieListHTML='';
        movieListHTML+='<li id="movie0'+(i+1)+'">'+x.movieTitle+'</li>';
        $('#movie-list>ul').append(movieListHTML);
    },
    theater :(x,i)=>{
        var townListHTML='';
        townListHTML+='<li id="town0'+(i+1)+'">'+x.officeName+'</li>';
        $('#region-town>ul').append(townListHTML);
    },
    quantity :()=>{}

};
app.dateCalc={
    today:()=>{
       var week =new Array('일','월','화','수','목','금','토');
       var today=new Date();
       var year=today.getFullYear();
       var month=today.getMonth()+1;
       var day=today.getDate();
       var dayName = week[today.getDay()];
       var date=[year,month,day,dayName];
       return date;
    },
    tomorrow:()=>{
        var week =new Array('일','월','화','수','목','금','토');
        var today=new Date();
        var month=today.getMonth()+1;
        var day=today.getDate()+1;
        var dayName;
        var date=[day,dayName];
        if(today.getDay()==6){
            dayName = week[0];
        }
        else{
            dayName = week[today.getDay()+1];
        }
        if(month==1||month==3||month==5||month==7||month==8||month==9||month==10||month==12){
            if(day==32){
                date[0] = 1;
                date[1] = dayName;
            }
            else{
                date[0] = day;
                date[1] = dayName;
            }
        }
        if(month==4||month==6||month==9||month==11) {
            if(day==31){
                date[0] = 1;
                date[1] = dayName;
            }
            else{
                date[0] = day;
                date[1] = dayName;
            }
        }
        return date;
    },
    theDayAfterTomorrow:()=>{
        var week =new Array('일','월','화','수','목','금','토');
        var today=new Date();
        var month=today.getMonth()+1;
        var day=today.getDate()+2;
        var dayName;
        var date=[day,dayName];
        if(today.getDay()==5){
            dayName = week[0];
        }
        else if(today.getDay()==6){
            dayName = week[1];
        }
        else{
            dayName = week[today.getDay()+2];
        }
        if(month==1||month==3||month==5||month==7||month==8||month==9||month==10||month==12){
            if(day==32){
                date[0] = 1;
                date[1] = dayName;
            }
            else if(day==33){
                date[0] = 2;
                date[1] = dayName;
            }
            else{
                date[0] = day;
                date[1] = dayName;
            }
        }
        if(month==4||month==6||month==9||month==11) {
            if(day==31){
                date[0] = 1;
                date[1] = dayName;
            }
            else if(day==32){
                date[0] = 2;
                date[1] = dayName;
            }
            else{
                date[0] = day;
                date[1] = dayName;
            }
        }
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
    reservation:()=>{
        $('#container').append(app.compUI.divC('rsrv-content'));
        $('.rsrv-content').html(app.compUI.div('option-box'));
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
        var movieImg=app.session.getSessionData('img');
        $('#option-box>ul>li:first-child').css({'background-image':'url('+movieImg+')'});
    },
    theater:()=>{
        $('#container').append(app.compUI.divC('theater-content'));
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
        app.ajaxList.office();
    },
    date:()=>{
        $('.rsrv-content').append(app.compUI.div('datepicker'));
        $('.rsrv-content').append(app.compUI.divC('layer-darker'));
    },
    seat:()=>{

    }
};
app.ajaxList={
    main:x=>{
        $.ajax({
            async : false,
            url : 'json/movie.json',
            type: 'post',
            dataType:'json',
            success:d=>{
                $.each(d,(i,o)=>{
                    if(x === d[i].movieTitle){
                        var selectedMovie = d[i];
                        app.appendList.main(selectedMovie);
                        app.session.movie(selectedMovie);
                        app.session.movieSeq(selectedMovie);
                    }
                });
            },
            error:e=>{
                alert('error');
            }
        });
    },
    movie:()=>{
        $.ajax({
            async : false,
            url:'json/movie.json',
            type: 'post',
            dataType:'json',
            success:d=>{
                var list=d;
                $.each(list,(i,o)=>{
                    var movie = list[i];
                    app.appendList.movie(movie,i);
                });
            },
            error:e=>{
                alert('error');
            }
        });
    },
    office:()=>{
        $.ajax({
            async : false,
            url:'json/office.json',
            type: 'post',
            dataType:'json',
            success:d=>{
                var list=d;
                $.each(list,(i,o)=>{
                    var office = list[i];
                    if(i<14) {
                        app.appendList.theater(office,i);
                    }
                });
            },
            error:e=>{
                alert('error');
            }
        });
    },
    schedule:()=>{
        $.ajax({
            async : false,
            url : 'json/movietime.json',
            type: 'post',
            dataType:'json',
            success:d=>{
                var scheduleHTML='';
                var j;
                $.each(d,(i,o)=>{
                    scheduleHTML += '<li class="schedule0'+(i+1)+'">'
                    for(j=0;j<1;j++){
                        scheduleHTML +='<div class="bTime schedule0'+(i+1)+'">'+d[i].startTime+'</div>'
                        scheduleHTML +='<div class="eTime schedule0'+(i+1)+'">~'+d[i].endTime+'</div>'
                        scheduleHTML +='<div class="aSeat schedule0'+(i+1)+'">30석</div>'
                    }
                    scheduleHTML +='</li>'
                });
                $('.schedule-box>ul').append(scheduleHTML);
            },
            error:e=>{
                alert('error');
            }
        });
    }
};
app.valid ={
    isEmail : x=>{
        var email_regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return email_regex.test(x)?"yes":"no";
    },
    isNumber : x=>{
        return typeof x === 'number' && isFinite(x);
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
    //movie: 영화제목 , img: 영화이미지, theater: 극장,
    //amount:총인원 , adult: 어른인원 , child: 청소년인원
    init :(k,v)=>{
        sessionStorage.setItem(k,v);
    },
    getSessionData : k=>{
        return sessionStorage.getItem(k);
    },
    movie:x=>{
        app.session.init('img',x.image);
    },
    movieSeq:x=>{
        app.session.init('movieSeq',x.movieSeq);
    }
};

(function () {
   app.initialize();
});
app.initialize();