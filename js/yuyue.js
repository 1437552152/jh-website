			    $("#news-main .applypop-common").hide();
				$("#news-main .applypopbox-common").hide();		
			function popBtn() {
				$("#news-main .applypop-common").fadeIn(800);
				$("#news-main .applypopbox-common").fadeIn(800);
			}
			$(function() {
				$("#news-main .applypopbox-common,.closebtn").click(function() {
					$("#news-main .applypopbox-common").fadeOut(800);
					$("#news-main .applypop-common").fadeOut(800);
				});
				$("#news-main .surebtn").click(function() {
					if($("#news-main .boxDesc").html() == '预约成功！稍后会有老师联系您，请保持手机畅通！') {
						$("#news-main .sucpop-common").fadeOut(800);
						$("#news-main .applypop-common").fadeOut(800);
						$("#news-main .applypopbox-common").fadeOut(800);
					} else {
						$("#news-main .sucpop-common").fadeOut(800);
					}
				});
				$("#news-main #subBtnCommon").click(function() {
					var userName = $("#news-main #userName-common").val();
					var userCity = $("#news-main #fromCity-common").val();
					var toPlace = $("#news-main #toPlace-common").val();
					var userTel = $("#news-main #usertel-common").val();
					if(userName == "" || userName == "请输入您的姓名") {
						alertBoxCommon("请输入您的姓名", '1000');
						$("#news-main #userName-common").val("");
						$("#news-main #userName-common").focus();
						return false;
					} else {
						var reg = /([\u4E00-\u9FA5\uf900-\ufa2d]{2,3})|([a-zA-Z]{3,20})/;
						if(!userName.match(reg)) {
							alertBoxCommon("请请核对你的姓名！", '1000');
							$("#news-main #userName-common").focus();
							return false;
						} else if(userName.length >= 5) {
							alertBoxCommon("请核对你的姓名！", '1000');
							$("#news-main #userName-common").focus();
							return false;
						}
					}
					var reg = /^0{0,1}(1)[0-9]{10}$/;
					if(userTel == "" || userTel == "请输入手机号码") {
						alertBoxCommon("请输入手机号码", '1000');
						$("#news-main #userTel").val('');
						$("#news-main #userTel").focus();
						return false;
					} else if(reg.test(userTel) != true) {
						alertBoxCommon("请核对你的手机号码！", '1000');
						$("#news-main #userTel").focus();
						return false;
					}
					var szData = {
						custName: userName,
						tel: userTel,
						city: userCity,
						country: toPlace,
						oper: "save",
						partId: $("#partId-common").val(),
						partName: $("#partName-common").val()
					};
					var ajaxUrl = "/php/freeTest.php";
					$.ajax({
						type: 'POST',
						url: ajaxUrl,
						data: szData,
						success: function(xml) {
							var rootNode = $(xml).find("root");
							var szCode = $(rootNode).find("code").text();
							if(szCode == '2') {
								alertBoxCommon("提交失败！", '3000');
							} else if(szCode == '5') {
								alertBoxCommon("您已经提交过预约信息。", '3000');
								cleanForm('#userName-common', '#usertel-common', '#toPlace-common', '#fromCity-common');
								$("#news-main .surebtn").click(function() {
									$("#news-main .applypopbox-common").fadeOut(800);
									$("#news-main .applypop-common").fadeOut(800);
								})
							} else {
								alertBoxCommon("预约成功,感谢你的参与", '3000');
								cleanForm('#userName-common', '#usertel-common', '#toPlace-common', '#fromCity-common');
								$("#news-main .surebtn").click(function() {
									$("#news-main .applypopbox-common").fadeOut(800);
									$("#news-main .applypop-common").fadeOut(800);
								})
							}
						}
					})
				})

				function alertBoxCommon(desc, time) {
					$("#news-main .boxDesc").html(desc);
					$("#news-main .sucpop-common").show();
				}

				function cleanForm() {
					for(var i = 0; i < arguments.length; i++) {
						$(arguments[i]).val('');
					}
				}
			})