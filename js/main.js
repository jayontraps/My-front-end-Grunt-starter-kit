(function($,window){
  
  window.getActiveMQ = function()
	{
		$('<div id="getActiveMQ-watcher"></div>')
			.appendTo('body')
			.hide();
	
		var computed = window.getComputedStyle,
			watcher = document.getElementById('getActiveMQ-watcher');
			if ( 'currentStyle' in watcher )
			{
				window.getActiveMQ = function()
				{
					// return watcher.currentStyle['fontFamily'].replace(/['"]/g,'');
					return watcher.currentStyle.fontFamily.replace(/['"]/g,'');
				};
			}
			else if ( computed )
			{
				window.getActiveMQ = function()
				{
					return computed( watcher, null ).getPropertyValue( 'font-family' ).replace(/['"]/g,'');
				};
			}
			else
			{
				window.getActiveMQ = function()
				{
					return 'unknown';
				};
			}
			return window.getActiveMQ();
	};

}(jQuery, window));


// raw resize
// $(window).on('resize', function() {
// 	console.log('breakpoint is ' + getActiveMQ());
// });


// limit resize firing
// var resizeId;
// $(window).on('resize', function(e) {
//     clearTimeout(resizeId);
//     resizeId = setTimeout(doneResizing, 250);
    
// });

// function doneResizing(){
//   console.log('breakpoint is ' + getActiveMQ());  
// }


// 3rd time lucky...
// debulked onresize handler - https://github.com/louisremi/jquery-smartresize
function on_resize(c,t){
	onresize=function(){
		clearTimeout(t);
		t=setTimeout(c,100);
	};
	return c;
}

on_resize(function() {
  console.log('breakpoint is ' + getActiveMQ()); 
})(); // self executing on page load 


// just on resize
// on_resize(function() {
//   // handle the resize event here
//   console.log('breakpoint is ' + getActiveMQ());  
// });






















