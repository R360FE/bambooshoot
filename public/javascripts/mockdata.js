$(function(){

	try{
        $(".formatted").JSONView( JSON.parse($(".unformat").val()) );
    }catch(e){

    }  

    // json数据格式化
    var json = "",
        $unformat = $(".unformat"),
        $name = $("input[name=name]"),
        $desc = $("input[name=desc]");
    $(".doformat").on("click",function(){
        json = $unformat.val();
        try{
            $(".formatted").JSONView( JSON.parse(json) );
            passed = true;
        }catch(e){
            passed = false;
            $(".formatted").text(e.message);
        }              
    });

    // 保存数据
    $(".save").on("click", function(){
    	var name = $name.val();
    	var desc = $desc.val();
    	var json = $unformat.val();

    	if(name == ""){
    		alert("接口名称不能为空！");
    		$name.focus();
    		return;
    	}

    	try{
    		if(JSON.parse(json)){
	    		$.ajax({
	    			url: "/api/mockdata/save",
	    			type: "POST",
	    			dataType: "json",
	    			data: {
	    				name: name,
	    				desc: desc,
	    				json: json
	    			},
	    			success: function(result){

	    				if(result.status == 1){
	    					alert(result.msg);
	    					//location.href = "/mockdata"
	    				}else{
	    					alert(result.msg);
	    				}

	    			},
	    			error: function(){
	    				alert("服务器偷懒了！")
	    			}
	    		})
	    	}
    	}catch(e){
    		alert("接口数据有误，请修改后进行保存！");
    	}
    });

    // 查询数据
    $(".search").on("click", function(){
    	var name = $name.val();

    	if(name == ""){
    		alert("接口名称不能为空！");
    		$name.focus();
    		return false;
    	}

    	$.ajax({
    		url: "/api/mockdata/search",
    		type: "POST",
    		dataType: "json",
    		data: {
    			name: name
    		},
    		success: function(result){
    			var html = [];

    			html.push('<table class="table table-hover table-striped">');
    			html.push('<tr>');
    			html.push('<th width="5%">ID</th>');
    			html.push('<th width="25%">名称</th>');
    			html.push('<th width="40%">描述</th>');
                html.push('<th width="20%">创建日期</th>');
    			html.push('<th width="10%">操作</th>');
    			html.push('</tr>');

    			$.each(result.data, function(index, item){

    				html.push('<tr>');
	    			html.push('<td>'+ item.id +'</td>');
	    			html.push('<td>'+ item.name +'</td>');
	    			html.push('<td>'+ item.desc +'</td>');
                    html.push('<td>'+ item.postTime + '</td>');
	    			html.push('<td><a href="/mockdata/edit?name='+ item.name +'">编辑</a> <a href="javascript:" class="delete" data-name="'+ item.name +'">删除</a></td>');
	    			html.push('</tr>');

    			});
    			
    			html.push('</table>');
    			
    			$(".search-result").html(html.join(""));
    		},
    		error: function(){
				alert("服务器偷懒了！")
			}
    	});

    	return false;
    });

    // 删除数据
    $(".delete").on("click", function(){
    	var name = $(this).data("name");

         var result = confirm("你确定要删除 " + name + " 接口吗？");

    	if(result){
            $.ajax({
                url: "/api/mockdata/delete",
                type: "POST",
                dataType: "json",
                data: {
                    name: name,
                },
                success: function(result){

                    if(result.status == 1){
                        alert(result.msg);
                        location.href = "/mockdata"
                    }else{
                        alert(result.msg);
                    }

                },
                error: function(){
                    alert("服务器偷懒了！")
                }
            });
        }

    });


});