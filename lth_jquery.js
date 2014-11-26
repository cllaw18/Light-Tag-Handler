/*!
 * Light Tag Handler v1.0
 * https://github.com/soyosolution/Light-Tag-Handler
 * http://tool.soyosolution.com/light-tag-handler 
 *
 * Includes jQuery Library
 * http://www.jquery.com/
 *
 * Copyright 2014 Soyo Solution Company. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-11-25
 */

//tags style
var tbg_c        = "#eee";                       //Background color of tags
var t_mar        = "7px 3px 0 3px";              //margin of tags
var t_pad        = "0 5px";                      //padding of tags
var t_radius     = "5px";                        //radius of tags

//tag input boxes style
var th_bg_c     = "#fff";                        //background color of your tag input box
var th_border   = "1px solid #ccc";              //border of your tag input box 
var th_width    = "100%";                        //width of your tag input box
var th_mar      = "5px 2px 0 2px";               //margin of your tag input box
var th_pad      = "2px 5px";                     //padding of your tag input box

//tags' mouseover icon
var icon = " data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJJJREFUeNpiZACCnp7e+UDKAIgdS0qKPzBAAVBcAEjtB+ILQPFERqjCBKj8BZgGJIUGULkFTEgcBih7P1ChAppCsBxIsSPURGQN99EUgm1kRHMbsgIGdKcxInlGAWoiOlAEKnwAYjAhmbyeATtYD5VnYCTgBBSnMGFRCJJQxOLp/UxogjDPPMASShcYSYlBgAADABQgQdJ6ze4GAAAAAElFTkSuQmCC"; //cursor icon when your mouse over the tag, in this case, it's a cross icon, you can use your image's url path.


jQuery(document).ready(function() {
    var li_style = 'style="float:left; background:'+tbg_c+'; margin:'+t_mar+'; padding:'+t_pad+'; -webkit-border-radius:'+t_radius+'; -moz-border-radius:'+t_radius+'; border-radius:'+t_radius+'; cursor: url('+icon+'), pointer;"';
    
    //Apply effect to all tag_handler group
    var inputbox = '<li class="input"><input type="text" class="lth_input"></li>';
    var counter = '<span class="lth_removed">0</span><span class="lth_counter">0</span>';    
    var html = '<div class="lth_show"><ul>'+inputbox+'</ul>'+counter+'</div>';
    jQuery(".lth_group").append(html);
    
    //apply css style
    jQuery(".lth_show *").css({"margin":"0","padding":"0","border":"0","display":"inline-block"});
    jQuery(".lth_show").css({"border":th_border,"background":th_bg_c,"width":th_width});
    jQuery(".lth_show ul").css({"list-style-type":"none","background":th_bg_c});
    jQuery(".lth_show ul li.input").css({"float":"left","background":th_bg_c,"margin":th_mar,"padding":th_pad});
    jQuery(".lth_counter,.lth_removed").css({"display":"none"});
    jQuery(".lth_hidden").css({"float":"left","width":"0","height":"0","margin":"0","border":"0"});
    
    
    //IF value existed, load the value shows tags
    jQuery('.lth_hidden').each( function (index, data) {
        var lth_hidden_exist_val = $(this).html( '1' ).val();
        //if value is existed
        if(lth_hidden_exist_val!=""){
            var li_list = "";
            var tbl_counter_handler = jQuery(this).html('1').parent().find('.lth_counter');
            var ul_lv            = jQuery(this).html('1').parent().find('ul');
            var exist_items_array = lth_hidden_exist_val.split(",");
            var exist_items_size  = exist_items_array.length;
            for(var i=0; i<exist_items_size; i++){
                li_list += '<li id="lth_'+i+'" onclick="rm_lth_tag(this)" '+li_style+'>'+exist_items_array[i]+'</li>';
            }
            ul_lv.prepend(li_list);
            tbl_counter_handler.text(exist_items_size);
        }//EOF if
    });
    
    //Sync user input field and hidden field
    jQuery('.lth_input').on('input propertychange paste', function() {
        var inputstr = jQuery(this).val().trim();//get user input str
        //if got a comma , prepare to make tag
        if (inputstr.substr(inputstr.length - 1) ==","){
            var lth_root               = jQuery(this).parent().parent().parent().parent();
            var lth_hidden_handler     = lth_root.find('input[type="text"]').filter(':visible:first');
            var ul_lv                  = lth_root.find('ul');
            var tbl_counter_handler    = lth_root.find('.lth_counter');            
            //var lth_hidden_handler     = jQuery(this).parent().parent().parent().parent().find('input[type="text"]').filter(':visible:first');
            //var ul_lv                  = jQuery(this).parent().parent().parent().parent().find('ul');
            //var tbl_counter_handler    = jQuery(this).parent().parent().parent().parent().find('.lth_counter');
            var tbl_counter_val        = tbl_counter_handler.text();
            var final_hidden_field_val = "";
            inputstr = inputstr.slice(0,-1).trim();
            if (inputstr!=""){
                //Tidy up hidden field list.
                if(lth_hidden_handler.val()!=""){ final_hidden_field_val = lth_hidden_handler.val()+','+inputstr; }
                else                            { final_hidden_field_val = lth_hidden_handler.val()    +inputstr; }
                jQuery('<li id="lth_'+tbl_counter_val+'" onclick="rm_lth_tag(this)" '+li_style+'>'+inputstr+'</li>').insertBefore(jQuery(this).parent());
                lth_hidden_handler.val(final_hidden_field_val);//update hidden field value
                //Counter add value.
                tbl_counter_val++;
                tbl_counter_handler.text(tbl_counter_val);
            }//EOF if
            this.value ="";
        }//EOF if
    });//EOF onClick
});

function rm_lth_tag(o){
    var id          = o.id;
    var index_no    = o.id.match(/\d+$/)[0];
    var gp_lv        = o.parentNode.parentNode.parentNode;        //.lth_group_handler level
    var show_lv      = o.parentNode.parentNode;                   //.lth_show_handler level
    var ul_lv       = o.parentNode;                               //.ul_handler level
    var hidden_lv   = gp_lv.firstChild;                           //.lth_hidden_handler level
    var sum_lv      = gp_lv.lastChild.lastChild;                  //lth_counter_handler
    var rm_lv       = gp_lv.lastChild.lastChild.previousSibling;  //lth_removed_handler
    var c_sum       = parseInt(sum_lv.innerHTML);                 //current_counter_val
    var c_rm        = parseInt(rm_lv.innerHTML);                  //current_removed_val
    var new_item_list   = "";                                     //new_item_list
    var items_sum       = c_sum - c_rm -1;                        //items_count
    var l_sum           = c_sum-1;                                //latest_counter_val
    var l_re            = c_rm+1;                                 //latest_removed_val
    
    rm_lv.innerHTML = l_re;
    ulChildren = ul_lv.children;
    o.parentNode.removeChild(o); //Remove user selected tag
        for(var i = 0; i < items_sum; i++){
            j = items_sum-1;
            //if it's not the items who selected by user to remove.
            if( i!=j){ 
                new_item_list += ulChildren[i].innerHTML+',';
            }
            //if it's last item.
            if(i==j)        { new_item_list += ulChildren[i].innerHTML;}
        }    
   hidden_lv.value = new_item_list;
}//EOF function


