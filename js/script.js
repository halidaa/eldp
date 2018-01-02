/*script.js*/
var currentPractice = 0;

$(function(){
	var windowWidth = $(window).width() / parseFloat($("body").css("font-size"));
	
	$(window).resize(function () {
		windowWidth = $(window).width() / parseFloat($("body").css("font-size"));
		if(windowWidth >= 63.236){
			$("aside nav").show();
		}
	});
	
	$("aside h3").click(function(){
		if(windowWidth < 63.236){
			$("aside nav").slideToggle();
		}
	})
	
	if($(".screen").length > 0)
		$(".screen").fluidbox();
	
	$(".option").click(function(){
		var optClass = $(this).data("feedback-type");
		var optFeedback = $(this).data("feedback-text");
		var $feedback = $(this).parents(".question").find(".feedback");
		$(this).parents(".question").find(".option").css({"font-weight":"400","color":"#575757"});
		$(this).css({"font-weight":"500","color":"#fec04f"});
		$feedback.removeClass("feed-false").removeClass("feed-true").addClass(optClass).html(optFeedback);
		if($feedback.css("display") == "none") $feedback.slideDown();
	})
	
	if($("#self-explain").length > 0){
		$("#self-explain li").eq(currentPractice).show();
		$(".practice-nav.prev").hide();
	}
	
	$(".practice-nav").click(function(e){
		e.preventDefault();
		$("#self-explain > li").eq(currentPractice).hide();
		if($(this).hasClass("next")){
			if (currentPractice < ($("#self-explain > li").length - 1)){
				currentPractice++;
				$(".practice-nav.prev").show();
			}
			if(currentPractice == ($("#self-explain > li").length - 1))
				$(this).text("Submit");
		}
		else{
			if (currentPractice > 0){
				currentPractice--;
				$(".practice-nav.next").html("Next &rarr;");
			}
			if(currentPractice == 0)
				$(this).hide();
		}
		$("#self-explain > li").eq(currentPractice).show();
	})
	
	$(".options li").click(function(){
		$(this).toggleClass("selected");
	})
	
	$(".options li .explain").click(function(e){
		e.stopPropagation();
	})
	
	if($(".gridster").length > 0){
		$(".toggle-instruction").click(function(){
			if($(this).text() == "Hide Instruction")
				$(this).text("Show Instruction");
			else $(this).text("Hide Instruction");
			$("#instruction").slideToggle();
		})
		$(".gridster ul").gridster({
			max_cols:6,
			min_rows:5,
			widget_margins: [5, 5],
			widget_base_dimensions: [60, 40],
			resize:{
				enabled:true,
				max_size:[6,6]
			},
			draggable:{
				stop: function (e, ui) {            
				  var obj = ui.$player[0];
				  var separator = parseInt($("#answer-separator").attr("data-row"));
				  console.log(obj.dataset.row, separator)
				  if(obj.dataset.row > separator) $(obj).removeClass("faded")
				}
			}
		});
	}
})