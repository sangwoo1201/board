getLogs(1);

function getLogs(pageNum){
    $.ajax({
        url: 'http://192.168.0.63:8080/api/v1/logs?page='+pageNum,
        type : 'GET',
        dataType : 'json',
        success : function(response){
            $('#boardData').empty();
            $('.pagination').empty();
            //console.log(response);
            var html = '';
            for(var i=0; i<response.list.length; i++){
                //사원 목록에 사원 데이터 *바인딩 (== 사원 목록 HTML에 데이터 보여주기)
                //tbody태그 id : empData에 바인딩 하기!
                html += '<tr onclick="getPopup('+response.list[i].logId+')"><td>'+
                                                        response.list[i].logId+'</td><td>'+
                                                        response.list[i].ip+'</td><td>'+
                                                        response.list[i].url+'</td><td>'+
                                                        response.list[i].httpMethod+'</td><td>'+
                                                        response.list[i].createAt+'</td></tr>';
            }
            $('#boardData').append(html);//table 바인딩 작업!
            var paginationHtml = '';
            if(response.hasPreviousPage){ //이전 버튼 여부 확인
                paginationHtml += '<a onclick="getLogs('+(pageNum-1)+')">Previous</a>';
            }
            for(var i=0; i< response.navigatepageNums.length; i++){ //총 보여줄 페이지
                var page = response.navigatepageNums[i];
                paginationHtml += '<a id="pageNum'+page+'" onclick="getLogs('+page+')">'+page+'</a>'
            }
            if(response.hasNextPage){ //다음 버튼 여부 확인
                paginationHtml += '<a onclick="getLogs('+(pageNum+1)+')">Next</a>';
            }
            $('.pagination').append(paginationHtml); //페이징 바인딩 작업!
            //현재 페이지번호 CSS 적용
            $('#pageNum'+pageNum).css('backgroundColor','#287bff')
            $('#pageNum'+pageNum).css('color','#fff')
        }
    });
}
 
function getPopup(logId){
    $('.logs-popup').css('display', 'block');
    $('#map').empty();
    $.ajax({
        url: 'http://192.168.0.63:8080/api/v1/logs/'+logId,
        type : 'GET',
        dataType : 'json',
        success : function(response){
            //console.log(response);
            //ID가 ip, createAt인 input태그에 값을 set 함!
            $('#ip').val(response.ip);
            $('#createAt').val(response.createAt);
        }
    });
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(36.3286904, 127.4229992), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다 
    var markerPosition  = new kakao.maps.LatLng(36.3286904, 127.4229992); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
}