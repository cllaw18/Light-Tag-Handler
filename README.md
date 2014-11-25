Light-Tag-Handler
=================

Introduction
------------
Input a list of words and separate by comma at the text input box. For example, you can input something like : `apply,mango,pear,` (<- type them, but not copy and paste) to type. if you input something wrong and what to remove the existing tags, you can simply click on the tag to remove it. 
For demo, you can visit this link for a try:

http://tool.soyosolution.com/light-tag-handler/

How to make it works ?
----------------------
1) Import Javascript file
Import the jQuery file and lth_jquery.js (or the modified javascript file lth_jquery.min.js) first

<pre><code>&lt;script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"&gt;&lt;/script&gt;
&lt;script type="text/javascript" src="lth_jquery.js"&gt;&lt;/script&gt;
</code></pre>

2) Import Javascript file
Add a text input with class "lth_hidden" placing in a div tag with lth_group class.

<pre><code>&lt;div class="lth_group"&gt;
    &lt;input type="text" name="demo_3" class="lth_hidden" /&gt;
&lt;/div&gt;
</code></pre>


If your page get more than one text input box with tag handler, you can just copy a few more set of the html shown above and edit the name attribute value (for example: demo_3) to make it works. The html code of the demonstration example in this page is shown below:

<pre><code>&lt;div class="lth_group"&gt;
    &lt;input type="text" <span class="user-mention">name="demo_1"</span> class="lth_hidden" value="1,2,3,4,5,6" /&gt;
&lt;/div&gt;
&lt;div class="lth_group"&gt;
    &lt;input type="text" <span class="user-mention">name="demo_2"</span> class="lth_hidden" value="x,y,z" /&gt;
&lt;/div&gt;
&lt;div class="lth_group"&gt;
    &lt;input type="text" <span class="user-mention">name="demo_3"</span> class="lth_hidden" /&gt;
&lt;/div&gt;
</code></pre>


Input string and output string example
--------------------------------------

| Input string   | Output string   | Description  |
| -------------- |:---------------:| ------------:|
|"aaa"           |""| Ouput nothing|
|"aaa,"          |"aaa"||
|"a,b,c"         |"a,b"||
|"a,b,c,"        |"a,b,c"||
|" ,"            |""	Enter space and comma, get nothing and won't make any tag|
|",a, ,b,,"      |"a,b"	Would remove all empty tag in output string.|
|"apply, mango, pear,"|"apply,mango,pear"|This plugin would remove all space next to commas.|

Update
--------
25th,Nov2014 - Add instruction and demonstration page.<br />
24th,Nov2014 - Ligth tag handler v1.0 release

Demo 
------
http://tool.soyosolution.com/light-tag-handler/

Reference
------------
[http://stackoverflow.com/questions/1481152/how-to-detect-a-textboxs-content-has-changed ]
[http://stackoverflow.com/questions/15013848/jquery-get-value-of-previous-input-text-field]
