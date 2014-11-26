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
var tag_bg_color    = "#eeeeee";                    //Background color of tags
var tag_margin_val  = "7px 3px 0 3px";              //margin of tags
var tag_pagging_val = "0 5px";                      //padding of tags
var tag_radius_val  = "5px";                        //radius of tags

//tag input boxes style
var tag_input_handler_bg_color = "#ffffff";         //background color of your tag input box
var tag_input_handler_border   = "1px solid #ccc";  //border of your tag input box 
var tag_input_handler_width    = "100%";            //width of your tag input box
var tag_input_handler_margin   = "5px 2px 0px 2px"; //margin of your tag input box
var tag_input_handler_padding  = "2px 5px";         //padding of your tag input box

//tags' mouseover icon
var cross_icon = " data:application/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJJJREFUeNpiZACCnp7e+UDKAIgdS0qKPzBAAVBcAEjtB+ILQPFERqjCBKj8BZgGJIUGULkFTEgcBih7P1ChAppCsBxIsSPURGQN99EUgm1kRHMbsgIGdKcxInlGAWoiOlAEKnwAYjAhmbyeATtYD5VnYCTgBBSnMGFRCJJQxOLp/UxogjDPPMASShcYSYlBgAADABQgQdJ6ze4GAAAAAElFTkSuQmCC"; //cursor icon when your mouse over the tag, in this case, it's a cross icon, you can use your image's url path.


jQuery(document).ready(function() {
    var li_style = 'style="float:left; background:'+tag_bg_color+'; margin:'+tag_margin_val+'; padding:'+tag_pagging_val+'; -webkit-border-radius:'+tag_radius_val+'; -moz-border-radius:'+tag_radius_val+'; border-radius:'+tag_radius_val+'; cursor: url('+cross_icon+'), pointer;"';
    
    //Apply effect to all tag_handler group
    var inputbox = '<li class="input"><input type="text" class="lth_input"></li>';
    var counter = '<span class="lth_removed">0</span><span class="lth_counter">0</span>';    
    var html = '<div class="lth_show"><ul>'+inputbox+'</ul>'+counter+'</div>';
    jQuery(".lth_group").append(html);
    
    //apply css style
    jQuery(".lth_show *").css({"margin":"0","padding":"0","border":"0","display":"inline-block"});
    jQuery(".lth_show").css({"border":tag_input_handler_border,"background":tag_input_handler_bg_color,"width":tag_input_handler_width});
    jQuery(".lth_show ul").css({"list-style-type":"none","background":tag_input_handler_bg_color});
    jQuery(".lth_show ul li.input").css({"float":"left","background":tag_input_handler_bg_color,"margin":tag_input_handler_margin,"padding":tag_input_handler_padding});
    jQuery(".lth_show .lth_counter, .lth_show .lth_removed").css({"display":"none"});
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
                li_list += '<li id="lth_'+i+'" class="tag" onclick="remove_lth_tag(this)" '+li_style+'>'+exist_items_array[i]+'</li>';
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
            var lth_hidden_handler     = jQuery(this).parent().parent().parent().parent().find('input[type="text"]').filter(':visible:first');
            var ul_lv                  = jQuery(this).parent().parent().parent().parent().find('ul');
            var tbl_counter_handler    = jQuery(this).parent().parent().parent().parent().find('.lth_counter');
            var tbl_counter_val        = tbl_counter_handler.text();
            var final_hidden_field_val = "";
            inputstr = inputstr.slice(0,-1).trim();
            if (inputstr!=""){
                //Tidy up hidden field list.
                if(lth_hidden_handler.val()!=""){ final_hidden_field_val = lth_hidden_handler.val()+','+inputstr; }
                else                            { final_hidden_field_val = lth_hidden_handler.val()    +inputstr; }
                jQuery('<li id="lth_'+tbl_counter_val+'" class="tag" onclick="remove_lth_tag(this)" '+li_style+'>'+inputstr+'</li>').insertBefore(jQuery(this).parent());
                lth_hidden_handler.val(final_hidden_field_val);//update hidden field value
                //Counter add value.
                tbl_counter_val++;
                tbl_counter_handler.text(tbl_counter_val);
            }//EOF if
            this.value ="";
        }//EOF if
    });//EOF onClick
});

function remove_lth_tag(obj){
    var id = obj.id;
    var index_no = obj.id.match(/\d+$/)[0];
    var lth_group_handler   = obj.parentNode.parentNode.parentNode;//div
    var lth_show_handler    = obj.parentNode.parentNode;//div
    var ul_handler          = obj.parentNode;
    var lth_hidden_handler  = lth_group_handler.firstChild;
    var lth_hidden_value    = lth_hidden_handler.value;
    var lth_counter_handler = lth_group_handler.lastChild.lastChild;
    var lth_removed_handler = lth_group_handler.lastChild.lastChild.previousSibling;
    var current_counter_val = parseInt(lth_counter_handler.innerHTML);
    var current_removed_val = parseInt(lth_removed_handler.innerHTML);
    var new_item_list = "";
    var items_count = current_counter_val - current_removed_val -1;
    var latest_counter_val = current_counter_val-1;
    var latest_removed_val = current_removed_val+1;
    
    lth_removed_handler.innerHTML = latest_removed_val;
    ulChildren = ul_handler.children;
    obj.parentNode.removeChild(obj); //Remove user selected tag
        for(var i = 0; i < items_count; i++){
            j = items_count-1;
            //if it's not the items who selected by user to remove.
            if( i!=j){ 
                new_item_list += ulChildren[i].innerHTML+',';
            }
            //if it's last item.
            if(i==j)        { new_item_list += ulChildren[i].innerHTML;}
        }    
    lth_hidden_handler.value = new_item_list;
}//EOF function
