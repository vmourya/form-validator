var defaults = {
	Form : '',
	Error : 'This field is required',
	InvalidError : 'Enter Valid value',
	InvalidEmail : 'Enter valid email Id',
	InvalidPhone : 'Enter valid phone number',
	FormProcessing : 'Processing...',
	KeyupValidate : false,
	errorShow : true,
	errorList : {}
}
var FormV = {};
$.fn.vf = function(options){
	FormV.setting=$.extend({}, defaults, options);	
}

$(document).ready(function(el){
	if(FormV.setting){
		$(FormV.setting.Form).submit(function(){
			ce='';
			v='';
			fe='';
			fv = $(this).attr("id");
			$("#" + fv + " .vf-error").remove();
			$("#" + fv + " .vf-required").each(function(){
				v=$(this).val(); // getting input value				
				ce=$(this); // getting current selector
				er=false;
				var mn = ce.attr('vf-min');
				if (typeof mn !== typeof undefined && mn !== false) {
					mn=parseInt(mn);
				}else{
					mn=0;
				}
				
				var mx = ce.attr('vf-max');
				if (typeof mx !== typeof undefined && mx !== false) {
					mx=parseInt(mx);
				}else{
					mx=0;
				}

				var mtw=ce.attr('vf-match');
				if (typeof mtw !== typeof undefined && mtw !== false && mtw != '' && ( $('.' + mtw).val()!= '')){
					mt=true;
					mter=ce.attr('vf-match-error');
					if ((typeof mter !== typeof undefined && mter !== false ) || mter == ''){
						mter=mter;
					}else{
						mter='Values should match.';
					}
				}else{
					mt=false;
				}
				
				if(!v){
					if(FormV.setting.errorShow){
						errKey=ce.attr('name');
						if(errKey in FormV.setting.errorList){
							addError(ce,FormV.setting.errorList[errKey]);
						}else{
							addError(ce,FormV.setting.Error);
						}
					}
					er=true; 
					if(!fe){fe= $(this);} // setting element to focus
				}else if(($(this).hasClass("vf-phone")) && (!pv(v,$(this)))){
					if(FormV.setting.errorShow){
						addError(ce,FormV.setting.InvalidPhone);
					}
					er=true;
					if(!fe){fe= $(this);} // setting element to focus
				}else if(($(this).hasClass("vf-email")) && (!ev(v))){
					if(FormV.setting.errorShow){
						addError(ce,FormV.setting.InvalidEmail);
					}
					er=true;
					if(!fe){fe= $(this);} // setting element to focus
				}else if(mt){
					if(v != $('.' + mtw).val()){
						if(FormV.setting.errorShow){
							addError(ce,mter);
						}
						er=true;
						if(!fe){fe= $(this);} // setting element to focus					
					}
				}else if(mn && mx){
					if(v.length < mn ||  v.length > mx ){
						if(FormV.setting.errorShow){
							addError(ce,FormV.setting.InvalidError + ' (' + mn + '-' + mx + ' charactors)');
						}
						er=true;
						if(!fe){fe= $(this);} // setting element to focus
					}
				}else if(mn){
					if(v.length < mn ){
						if(FormV.setting.errorShow){
							addError(ce,FormV.setting.InvalidError + ' (' + mn + ' charactors)');
						}
						er=true;
						if(!fe){fe= $(this);} // setting element to focus
					}				
				}else if(mx){
					if(v.length > mx ){
						if(FormV.setting.errorShow){
							addError(ce,FormV.setting.InvalidError + ' (0-' + mx + ' charactors)');
						}
						er=true;
						if(!fe){fe= $(this);} // setting element to focus
					}				
				}
				if(er){
					ce.addClass('invalid');
					ce.removeClass('valid');
					fe.focus();
				}else{
					ce.addClass('valid');
					ce.removeClass('invalid');
				}
			});
			if(er){
				return false;
			}else{
				$("#" + fv).append('<span class="vf-process">' + FormV.setting.FormProcessing + '</span>');
				return true;
			}
		});
		if(FormV.setting.KeyupValidate){
			fv = '';
			forms = FormV.setting.Form.split(",");
			for(var x=0; x < forms.length; x++ ){
				if(fv == ''){
					fv = fv + forms[x] + ' .vf-required';
				}else{
					fv = fv + " , " +  forms[x] + ' .vf-required';
				}
			}
			$(fv).keyup(function(){
				$(this).next('.vf-error').remove();
				v=$(this).val();// getting input value
				ce=$(this);// setting current selector
				er=false;// setting error satus as false
				fe='';// to get first element with error in value
				var mn = ce.attr('vf-min');
				if (typeof mn !== typeof undefined && mn !== false) {
					mn=parseInt(mn);
				}else{
					mn=0;
				}
				var mx = ce.attr('vf-max');
				if (typeof mx !== typeof undefined && mx !== false) {
					mx=parseInt(mx);
				}else{
					mx=0;
				}
				var mtw=ce.attr('vf-match');
				if (typeof mtw !== typeof undefined && mtw !== false && mtw != '' && ( $('.' + mtw).val()!= '')){
					mt=true;
					mter=ce.attr('vf-match-error');
					if (typeof mter !== typeof undefined && mter !== false && mter != ''){
						mter=mter;
					}else{
						mter='Values should match.';
					}
				}else{
					mt=false;
				}			
				if(!v){
					if(FormV.setting.errorShow){
						errKey=ce.attr('name');
						if(errKey in FormV.setting.errorList){
							addError(ce,FormV.setting.errorList[errKey]);
						}else{
							addError(ce,FormV.setting.Error);
						}
					}
					er=true; 
					if(!fe){fe= $(this);} // setting element to focus
				}else if(($(this).hasClass("vf-phone")) && (!pv(v,$(this)))){
					if(FormV.setting.errorShow){
						addError(ce,FormV.setting.InvalidPhone);
					}
					er=true;
					if(!fe){fe= $(this);} // setting element to focus
				}else if(($(this).hasClass("vf-email")) && (!ev(v))){
					if(FormV.setting.errorShow){
						addError(ce,FormV.setting.InvalidEmail);
					}
					er=true;
					if(!fe){fe= $(this);} // setting element to focus
				}else if(mt){
					if(v != $('.' + mtw).val()){
						if(FormV.setting.errorShow){
							addError(ce,mter);
						}
						er=true;
						if(!fe){fe= $(this);} // setting element to focus					
					}
				}else if(mn && mx){
					if(v.length < mn ||  v.length > mx ){
						if(FormV.setting.errorShow){
							addError(ce,FormV.setting.InvalidError + ' (' + mn + '-' + mx + ' charactors)');
						}
						er=true;
						if(!fe){fe= $(this);} // setting element to focus
					}
				}else if(mn){
					if(v.length < mn ){
						if(FormV.setting.errorShow){
							addError(ce,FormV.setting.InvalidError + ' (' + mn + ' charactors)');
						}
						er=true;
						if(!fe){fe= $(this);} // setting element to focus
					}				
				}else if(mx){
					if(v.length > mx ){
						if(FormV.setting.errorShow){
							addError(ce,FormV.setting.InvalidError + ' (0-' + mx + ' charactors)');
						}
						er=true;
						if(!fe){fe= $(this);} // setting element to focus
					}				
				}
				if(er){
					ce.removeClass('valid');
					ce.addClass('invalid');
					fe.focus();
				}else{
					ce.addClass('valid');
					ce.removeClass('invalid');
				}
			});
		}
	}
	/* Appends an error to document */
	function addError(cEl,err){
		cEl.after('<span class="vf-error">'+ err +'</span>');
	}
	/* EMAIL VALIDATOR START */
	function ev(em) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(em);
	}
	/* EMAIL VALIDATOR END */
	/* PHONE NUMBER VALIDATOR START */
	function pv(ph,obj){
		var pmn = obj.attr('vf-min');
		if (typeof pmn !== typeof undefined && pmn !== false) {
			pmn=parseInt(pmn);
		}else{
			pmn=0;
		}
		var pmx = obj.attr('vf-max');
		if (typeof pmx !== typeof undefined && pmx !== false) {
			pmx=parseInt(pmx);
		}else{
			pmx=999;
		}
		//alert(pmn + " " + pmx);
		if(($.isNumeric(ph)) && (ph.length >= pmn ) && (ph.length <= pmx) ) {return true;}
		else {return false;}
	}
	/* PHONE NUMBER VALIDATOR END */
});