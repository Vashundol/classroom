require.config({
    baseUrl: '/js',
    paths:{
        config:'config',
        jquery:'lib/jquery',
        AV:'lib/av',
        AVpush:'lib/AV.push',
        request:'widget/request',
        checkin:'widget/checkin',
        amaze:'lib/amazeui'
    }
});

require(['jquery','checkin'],function($,Checkin){
    $(function(){
        Checkin.checkin()
    })
})

require(['jquery','config','amaze'],function($,conf){
    var push;
    
    $(function(){
        push = AV.push({
            appId: conf.leancloud.appId,
            appKey: conf.leancloud.appKey
        });

        AV.initialize(conf.leancloud.appId, conf.leancloud.appKey);

        var sendBtn = $('#sendBtn'),
            uname = $('#uname').val(),
            printWall = $('#printWall');

        const Answer = AV.Object.extend('Answer');
        const oAnswer = new Answer();
        

        push.open(function() {
            console.log('可以接收推送');
        });
        push.receive(function(data) {
            showLog(data,printWall);
        });
        push.on('reuse', function() {
            alert('网络中断正在重试');
        });

        push.subscribe(['open'], function(data) {
            console.log('已关注开放问题频道');
        });


    })
    function showLog(data,area,timestamp) {
        if (data) {
            if(data.type == 0){
                question = '<li class="am-g am-list-item-desced am-cf"><div class="am-fl"><p class="question-title am-list-item-hd">'+data.title+'</p><div class="question-content am-list-item-text">'+data.desc+'</div></div><div class="am-fr"><a href='+'"/open/answer/'+data.qid+'"'+'class="am-btn am-btn-primary">回答</a></div></li>';
            }else if(data.type == 10){
                $('#msgTitle')[0].innerText = data.title
                $('#msgContent')[0].innerText = data.content
                $('#msgModal').modal()
            }
        }

        time = '<p class="time">' + timestamp + '</p>';
        if(timestamp){
            area.prepend(time)
        }
        area.prepend(question)
    }
})
